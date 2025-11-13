import TextBlock from '/libs/TextBlock.js';
import SpeechBubble from '/libs/speechbubble.js';
export async function init(container) {

    //const speechBubbleStorylineIntroContianer1 = document.querySelector('.speech-bubble-story-line-page2-1');
    const textBlockStorylinePage3Contianer1 = document.querySelector('.text-block-story-line-page4-1');
    const textBlockStorylinePage3Contianer2 = document.querySelector('.text-block-story-line-page4-2');
    // const textBlockStorylineIntroContianer3 = document.querySelector('.text-block-story-line-page3-3');
    // const textBlockStorylineIntroContianer4 = document.querySelector('.text-block-story-line-page3-4');
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


    const page = document.querySelector('.page4');

    const panel1 = page.querySelector('.panel-1a');
    const panel2 = page.querySelector('.panel-1b');
    const panel3 = page.querySelector('.panel-1c');
    const panel4 = page.querySelector('.panel-2a');
    const panel5 = page.querySelector('.panel-2b');
    const panel6 = page.querySelector('.panel-2c');
    

    const storylineBubbleSpeechBubble1 = new SpeechBubble(panel1, {
        text: 'Lee! Tell me some good news! <br/> Uh...Lee! are you hearing me?!',
        fill: 'rgba(255,255,255,0.6)',
        stroke: '#000',
        strokeWidth: 3,
        tailPosition: 'top-left', // You can expand _generatePathD to use this
        paddingX: "15px",
        paddingY: "15px",
        bottom: "5%",
        right: "5%",
        className: "speech-bubble-page4-1"
    })

    // const storylineBubbleSpeechBubble2 = new SpeechBubble(page, {
    //     text: '',
    //     fill: 'rgba(255,255,255,0.6)',
    //     stroke: '#000',
    //     strokeWidth: 3,
    //     tailPosition: 'top-left', // You can expand _generatePathD to use this
    //     paddingX: "5px",
    //     paddingY: "5px",
    //     top: "35dvh",
    //     left: "15dvw",
    //     className: "speech-bubble-page3-2"
    // })

    const storylineBubbleSpeechBubble3 = new SpeechBubble(panel3, {
        text: 'Lee!!',
        fill: 'rgba(255,255,255,0.6)',
        stroke: '#000',
        strokeWidth: 3,
        tailPosition: 'top-right', // You can expand _generatePathD to use this
        paddingX: "0px",
        paddingY: "0px",
        fontSize: "4rem",
        bottom: "2%",
        left: "5%",
        className: "speech-bubble-page4-3"
    })

    const storylineBubbleSpeechBubble4 = new SpeechBubble(panel4, {
        text: 'She\'s in the zone, Nova...<br/> She\s not hearing you.',
        fill: 'rgba(255,255,255,0.6)',
        stroke: '#000',
        strokeWidth: 3,
        tailPosition: 'top-left', // You can expand _generatePathD to use this
        paddingX: "5px",
        paddingY: "5px",
        bottom: "10%",
        right: "15%",
        className: "speech-bubble-page4-4"
    })

    const storylineBubbleSpeechBubble5 = new SpeechBubble(panel5, {
        text: 'You we\'re right nova. <br/>there are power fluctuations <br/>in that entire block.<br/> there is something there.<br/> but what is it?',
        fill: 'rgba(255,255,255,0.6)',
        stroke: '#000',
        strokeWidth: 3,
        tailPosition: 'top-right', // You can expand _generatePathD to use this
        paddingX: "5px",
        paddingY: "5px",
        bottom: "5%",
        left: "10%",
        className: "speech-bubble-page4-5"
    })

    const storylineBubbleSpeechBubble6 = new SpeechBubble(panel2, {
        text: 'Hello...what do we have here?',
        fill: 'rgba(255,255,255,0.6)',
        stroke: '#000',
        strokeWidth: 3,
        tailPosition: 'top-left', // You can expand _generatePathD to use this
        paddingX: "5px",
        paddingY: "5px",
        bottom: "5%",
        right: "10%",
        className: "speech-bubble-page4-6"
    })

    const storylineBubbleSpeechBubble7 = new SpeechBubble(page, {
        text: 'And where exactly did you find this<br/> life changing information again...Nova?',
        fill: 'rgba(255,255,255,0.6)',
        stroke: '#000',
        strokeWidth: 3,
        tailPosition: 'bottom-right', // You can expand _generatePathD to use this
        paddingX: "5px",
        paddingY: "5px",
        bottom: "5dvh",
        right: "5dvw",
        className: "speech-bubble-page4-7"
    })

    const storylinePage3TextBlock1 = new TextBlock(textBlockStorylinePage3Contianer1, {
        text: 'Because... <br/>if everything goes <br/>according to plan, <br/>we may find <br/>outselves a way out <br/>of this hell hole.',
        textColor: '#000',
        background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent black background
        borderColor: '#000',
        borderwidth: 2,
        padding: 15
    })

    const storylinePage3TextBlock2 = new TextBlock(textBlockStorylinePage3Contianer2, {
        text: 'huh?...',
        textColor: '#000',
        background: 'rgba(214, 236, 11, 0.9)', // Semi-transparent black background
        borderColor: '#000',
        borderwidth: 2,
        padding: 15
    })

   

    await storylineBubbleSpeechBubble1.render();
    //await storylineBubbleSpeechBubble2.render();
    await storylineBubbleSpeechBubble3.render();
    await storylineBubbleSpeechBubble4.render();
    await storylineBubbleSpeechBubble5.render();
    await storylineBubbleSpeechBubble6.render();
    await storylineBubbleSpeechBubble7.render();
    storylinePage3TextBlock1.render();
    storylinePage3TextBlock2.render();
    
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
