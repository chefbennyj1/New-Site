function waitForVideos(videos) {
  return new Promise((resolve) => {
    let loadedCount = 0;

    videos.forEach(video => {
      // Use 'canplaythrough' to ensure enough data is loaded to play
      video.addEventListener('canplaythrough', () => {
        loadedCount++;
        if (loadedCount === videos.length) {
          resolve();
        }
      }, { once: true });

      // Trigger load if not already started
      if (video.readyState >= 4) { // HAVE_ENOUGH_DATA
        loadedCount++;
        if (loadedCount === videos.length) {
          resolve();
        }
      }
    });
  });
}