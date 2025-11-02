import TextBlock from '/scripts/TextBlock.js';
import SpeechBubble from '/scripts/speechbubble.js';
export function init(container) {

    const speechBubbleStorylineIntroContianer1 = document.querySelector('.speech-bubble-nova-line-page2-1');
    const textBlockStorylineIntroContianer1 = document.querySelector('.text-block-story-line-page2-1');
    const textBlockStorylineIntroContianer2 = document.querySelector('.text-block-story-line-page2-2');
    const textBlockStorylineIntroContianer3 = document.querySelector('.text-block-story-line-page2-3');
    const textBlockStorylineIntroContianer4 = document.querySelector('.text-block-story-line-page2-4');
    const textBlockStorylineIntroContianer5 = document.querySelector('.text-block-story-line-page2-5');
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

    //animateBottomPanel();

    const storylineIntroSpeechBubble1 = new SpeechBubble(speechBubbleStorylineIntroContianer1, {
        text: 'Hey! Lee! I\'m back...',
        fill: 'rgba(255,255,255,0.6)',
        stroke: '#000',
        strokeWidth: 3,
        tailPosition: 'top-left', // You can expand _generatePathD to use this
        paddingX: "5px",
        paddingY: "5px"
    })

    const storylineIntroTextBlock1 = new TextBlock(textBlockStorylineIntroContianer1, {
        text: 'The building is a mess...',
        textColor: '#000',
        background: 'rgba(232, 185, 49, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

    const storylineIntroTextBlock2 = new TextBlock(textBlockStorylineIntroContianer2, {
        text: "..it stinks, and the neighbours are...",
        textColor: '#000',
        background: 'rgba(232, 185, 49, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })
    const storylineIntroTextBlock3 = new TextBlock(textBlockStorylineIntroContianer3, {
        text: '...proof that civilization is optional.',
        textColor: '#000',
        background: 'rgba(232, 185, 49, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

    const storylineIntroTextBlock4 = new TextBlock(textBlockStorylineIntroContianer4, {
        text: 'Can’t blame them — <br /> when you’ve been stepped on long enough, <br />you forget what standing up looks like.',
        textColor: '#000',
        background: 'rgba(232, 185, 49, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

     const storylineIntroTextBlock5 = new TextBlock(textBlockStorylineIntroContianer5, {
        text: 'Nova',
        textColor: 'white',
        background: 'rgba(0, 0,0, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

    storylineIntroSpeechBubble1.render();
    storylineIntroTextBlock1.render();
    storylineIntroTextBlock2.render();
    storylineIntroTextBlock3.render();
    storylineIntroTextBlock4.render();
    storylineIntroTextBlock5.render();
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
//Switch bottom panel from video to image.


document.addEventListener("visibilitychange", () => {
    const videos = document.querySelectorAll('video');
    enableMedia(videos);
    
});