import TextBlock from '/libs/TextBlock.js';
import SpeechBubble from '/libs/speechbubble.js';
export async function init(container) { 

    let videos = container.querySelectorAll('video[data-src]');
    enableMedia(videos);

     container.addEventListener('view_visible', () => {
        enableMedia(videos);
    })

    container.addEventListener('view_hidden', () => {
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
            console.log(`pausing video: ${video.src}`)
        });
    });
    console.log(`loading ${container.id}`)
    const page = document.querySelector('.page3');
}