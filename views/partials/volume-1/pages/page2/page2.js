import TextBlock from '/scripts/TextBlock.js';
import SpeechBubble from '/scripts/speechbubble.js';
export function init(container) {

    const speechBubbleStorylineIntroContianer1 = document.querySelector('.speech-bubble-story-line-page2-1');
    const textBlockStorylineIntroContianer1 = document.querySelector('.text-block-story-line-page2-1');
    const textBlockStorylineIntroContianer2 = document.querySelector('.text-block-story-line-page2-2');
    const textBlockStorylineIntroContianer3 = document.querySelector('.text-block-story-line-page2-3');
    const textBlockStorylineIntroContianer4 = document.querySelector('.text-block-story-line-page2-4');
    let videos = container.querySelectorAll('video[data-src]');

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


    const storylineIntroSpeechBubble1 = new SpeechBubble(speechBubbleStorylineIntroContianer1, {
        text: 'Lila! I\'m back...',
        fill: 'rgba(255,255,255,0.6)',
        stroke: '#000',
        strokeWidth: 3,
        tailPosition: 'top-left', // You can expand _generatePathD to use this
        paddingX: "5px",
        paddingY: "5px"
    })

    const storylineIntroTextBlock1 = new TextBlock(textBlockStorylineIntroContianer1, {
        text: 'The building is a mess..',
        textColor: '#000',
        background: 'rgba(232, 185, 49, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

    const storylineIntroTextBlock2 = new TextBlock(textBlockStorylineIntroContianer2, {
        text: '...but it\'s home.',
        textColor: '#000',
        background: 'rgba(232, 185, 49, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

    storylineIntroSpeechBubble1.render();
    storylineIntroTextBlock1.render();
    storylineIntroTextBlock2.render()
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
    enableMedia(videos);
});