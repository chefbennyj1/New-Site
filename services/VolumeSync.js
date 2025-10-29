const fs = require('fs');
const path = require('path');
const Volume = require('../models/Volume');
const VolumeManager = require("../services/VolumeManager.js");

async function updateVolumesFromFS() {
  const volumes = await Volume.find();

  for (const vol of volumes) {  
    // Populate pages from filesystem
    const updatedVol = await VolumeManager.populatePagesFromFS(vol);

    // Save changes to MongoDB
    await vol.save();

    console.log(`Updated volume ${vol.title} with ${vol.pages.length} pages`);
  }
}

module.exports = { updateVolumesFromFS };
