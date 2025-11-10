import TextBlock from '/libs/TextBlock.js';
import SpeechBubble from '/libs/speechbubble.js';
export async function init(container) {

    const textBlockStorylineIntroContianer1 = document.querySelector('.text-block-story-line-page2-1');
    const textBlockStorylineIntroContianer2 = document.querySelector('.text-block-story-line-page2-2');
    const textBlockStorylineIntroContianer3 = document.querySelector('.text-block-story-line-page2-3');
    const textBlockStorylineIntroContianer4 = document.querySelector('.text-block-story-line-page2-4');
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
    const page = document.querySelector('.page2');

    const storylineIntroTextBlock1 = new TextBlock(textBlockStorylineIntroContianer1, {
        text: 'Nova',
        textColor: 'white',
        background: 'rgba(0, 0, 0, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })
    const storylineIntroTextBlock2 = new TextBlock(textBlockStorylineIntroContianer2, {
        text: 'Lee',
        textColor: 'white',
        background: 'rgba(0, 0, 0, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })
    const storylineIntroTextBlock3 = new TextBlock(textBlockStorylineIntroContianer3, {
        text: 'Rin',
         textColor: 'white',
        background: 'rgba(0, 0, 0, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })
    const storylineIntroTextBlock4 = new TextBlock(textBlockStorylineIntroContianer4, {
        text: 'Jax',
         textColor: 'white',
        background: 'rgba(0, 0, 0, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

    storylineIntroTextBlock1.render();
    storylineIntroTextBlock2.render();
    storylineIntroTextBlock3.render();
    storylineIntroTextBlock4.render();

}

function enableMedia(videos) {

    if (window.audioEnabled) {
        window.transitionAudio.play();
    }

    videos.forEach(video => {

        
        const fadeDuration = 0.5; // The duration of the fade in seconds

        video.addEventListener('timeupdate', () => {
            if (video.duration - video.currentTime <= fadeDuration) {
                video.classList.add('fade-out');
                video.classList.remove('fade-in');
            }
        });

        video.addEventListener('seeked', () => {
            if (video.currentTime < fadeDuration) {
                video.classList.remove('fade-out');
                video.classList.add('fade-in');
            }
        });



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
