export function init(container) {
    let videos = container.querySelectorAll('video[data-src]');
    container.addEventListener('view_visible',() => {        
       enableMedia(videos);
    })
    container.addEventListener('view_hidden',() => {        
        videos.forEach(video => {
            video.pause();           
            video.currentTime = 0;
            console.log(`pausing video: ${video.src}`)
        });
    });
    console.log(`loading ${container.id}`)
 }

 function enableMedia(videos) {
    if (window.audioEnabled) {
        window.transitionAudio.play();
    }

    videos.forEach(video => {
        if (video.paused) {
            video.src = video.dataset.src;
            video.play().catch(err => console.log("Play error:", err));
            console.log(`playing video: ${video.src}`)
        }
    })
}

document.addEventListener("visibilitychange", () => {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    if (document.hidden) {
      video.pause();
    } else {
      video.play();
    }
  });
});