import TextBlock from '/libs/TextBlock.js';
import SpeechBubble from '/libs/speechbubble.js';
const pageindex = "3"
export async function init(container) {

    const textBlockStorylineIntroContianer1 = document.querySelector('.text-block-story-line-page3-1');
    const textBlockStorylineIntroContianer2 = document.querySelector('.text-block-story-line-page3-2');
    const textBlockStorylineIntroContianer3 = document.querySelector('.text-block-story-line-page3-3');
    const textBlockStorylineIntroContianer4 = document.querySelector('.text-block-story-line-page3-4');
    const textBlockStorylineIntroContianer5 = document.querySelector('.text-block-story-line-page3-5');
    const textBlockStorylineIntroContianer6 = document.querySelector('.text-block-story-line-page3-6');
    const textBlockStorylineIntroContianer7 = document.querySelector('.text-block-story-line-page3-7');
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
    const page = document.querySelector('.page3');

    const panel1 = page.querySelector('.panel-1a');
    const panel2 = page.querySelector('.panel-1b');
    const panel3 = page.querySelector('.panel-1c');
    const panel4 = page.querySelector('.panel-2a');
    const panel5 = page.querySelector('.panel-2b');
    const panel6 = page.querySelector('.panel-2c');
    const panel7 = page.querySelector('.panel-2d');

    const storylineBubbleSpeechBubble1 = new SpeechBubble(panel3, {
        text: 'But, not for long. <br/>This slum\'s seen the last of me.',
        fill: 'rgba(255,255,255,0.6)',
        stroke: '#000',
        strokeWidth: 3,
        tailPosition: 'top-left', // You can expand _generatePathD to use this
        paddingX: "5px",
        paddingY: "5px",
        top: "50%",
        right: "5%",
        className: "speech-bubble-page3-1"
    })

    // const storylineNovaBubbleSpeechBubble1 = new SpeechBubble({
    //     text: 'Yeah, sure.',
    //     fill: 'rgba(255,255,255,0.6)',
    //     stroke: '#000',
    //     strokeWidth: 3,
    //     tailPosition: 'top-left', // You can expand _generatePathD to use this
    //     paddingX: "5px",
    //     paddingY: "5px"
    // })

    const storylineIntroTextBlock1 = new TextBlock(textBlockStorylineIntroContianer1, {
        text: 'The building stinks...',
        textColor: '#000',
       background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent black background
        borderColor: '#000',
        borderwidth: 2,
        padding: 15
    })

    const storylineIntroTextBlock2 = new TextBlock(textBlockStorylineIntroContianer2, {
        text: "..it's a mess...",
        textColor: '#000',
        background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent black background
        borderColor: '#000',
        borderwidth: 2,
        padding: 15
    })

    const storylineIntroTextBlock3 = new TextBlock(textBlockStorylineIntroContianer3, {
        text: "...and the neighbours?",
        textColor: '#000',
        background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent black background
        borderColor: '#000',
        borderwidth: 2,
        padding: 15
    })

    const storylineIntroTextBlock4 = new TextBlock(textBlockStorylineIntroContianer4, {
        text: 'just another reminder that survival\'s a full-time gig down here.',
        textColor: '#000',
        background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent black background
        borderColor: '#000',
        borderwidth: 2,
        padding: 15
    })

    const storylineIntroTextBlock5 = new TextBlock(textBlockStorylineIntroContianer5, {
        text: 'When you’ve been stepped on long enough...',
        textColor: '#000',
        background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent black background
        borderColor: '#000',
        borderwidth: 2,
        padding: 15
    })
    const storylineIntroTextBlock6 = new TextBlock(textBlockStorylineIntroContianer6, {
        text: '...you forget what standing up looks like.',
        textColor: '#000',
        background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent black background
        borderColor: '#000',
        borderwidth: 2,
        padding: 15
    })

    //  const storylineIntroTextBlock7 = new TextBlock(textBlockStorylineIntroContianer7, {
    //     text: 'Nova',
    //     textColor: 'white',
    //     background: 'rgba(0, 0,0, 0.9)', // Semi-transparent black background
    //     borderColor: 'white',
    //     borderwidth: 2,
    //     padding: 15
    // })


    await storylineBubbleSpeechBubble1.render();
    storylineIntroTextBlock1.render();
    storylineIntroTextBlock2.render();
    storylineIntroTextBlock3.render();
    storylineIntroTextBlock4.render();
    storylineIntroTextBlock5.render();
    storylineIntroTextBlock6.render();
    //storylineIntroTextBlock7.render();

    //Timeline
   
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
