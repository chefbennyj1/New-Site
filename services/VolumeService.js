const fs = require('fs');
const path = require('path');
const VolumeModel = require('../models/Volume');

async function createVolume({ index, title, volumePath, pages }) {
  // check if volume already exists
  const existing = await VolumeModel.findOne({ index });
  if (existing) {
    console.log(`Volume ${index} already exists, skipping.`);
    throw Error("Existing Volume");
  }

  // create minimal document
  const newVolume = new VolumeModel({
    index,
    title,
    volumePath,
    pages: pages || []
  });

  await newVolume.save();
  console.log(`📘 Created volume: ${title}`);

  // after saving, auto-scan its folder for pages
  let volumeWithPages = await populatePagesFromFS(newVolume);
  await volumeWithPages.save();

  return true;

}

// helper: read pages from file system
async function populatePagesFromFS(volume) {
  try {
    const pagesBaseDir = path.join(__dirname, '..', volume.volumePath, 'pages');
    console.log(`Looking for pages in path ${pagesBaseDir}...`);

    if (!fs.existsSync(pagesBaseDir)) {
      console.log(`No pages directory found for Volume ${volume.index}`);
      return;
    }

    const pageFolders = fs.readdirSync(pagesBaseDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    const pages = [];

    for (const folder of pageFolders) {
      const folderPath = path.join(pagesBaseDir, folder);
      const htmlFiles = fs.readdirSync(folderPath).filter(f => f.endsWith('.html'));

      htmlFiles.forEach(file => {
        pages.push({
          index: parseInt(folder.replace(/\D/g, '')) || 0, // optional: use folder number as index
          path: path.join(volume.volumePath, 'pages', folder, file)
        });
      });
    }

    console.log(pages);
    volume.pages = pages;
    console.log(`Added ${pages.length} pages to Volume ${volume.index}`);

    return volume;

  } catch (err) {
    console.error(`Error populating pages for volume ${volume.index}:`, err);
  }
}


module.exports = { createVolume, populatePagesFromFS };
