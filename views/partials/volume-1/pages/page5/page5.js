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
    const page = document.querySelector('.page5');
    const storylineBubbleSpeechBubble1 = new SpeechBubble(page, {
            text: 'After all, we wouldn\'t want to <br/>get all the way there to find out <br/>we were chasing ghosts.',
            fill: 'rgba(255,255,255,0.6)',
            stroke: '#000',
            strokeWidth: 3,
            tailPosition: 'top-right', // You can expand _generatePathD to use this
            paddingX: "5px",
            paddingY: "5px",
            top: "50dvh",
            left: "5dvw",
            className: "speech-bubble-page5-1"
        })
//

        const storylineBubbleSpeechBubble2 = new SpeechBubble(page, {
            text: 'I didn\'t ask anyone, Jax.<br/> I asked the system.',
            fill: 'rgba(255,255,255,0.6)',
            stroke: '#000',
            strokeWidth: 3,
            tailPosition: 'top-right', // You can expand _generatePathD to use this
            paddingX: "5px",
            paddingY: "5px",
            top: "30dvh",
            left: "30dvw",
            className: "speech-bubble-page5-2"
        })

        const storylineBubbleSpeechBubble3 = new SpeechBubble(page, {
            text: 'Oh, there is something there alright. <br/>I\'ve seen the power <br/>draw on the grid.',
            fill: 'rgba(255,255,255,0.6)',
            stroke: '#000',
            strokeWidth: 3,
            tailPosition: 'top-right', // You can expand _generatePathD to use this
            paddingX: "5px",
            paddingY: "5px",
            top: "25dvh",
            right: "20dvw",
            className: "speech-bubble-page5-3"
        })

        const storylineBubbleSpeechBubble4 = new SpeechBubble(page, {
            text: 'If there are <br /> defunct servers there that we can hijack<br/> Lee can set up a hash farm in minutes<br/> probably worth it.',
            fill: 'rgba(255,255,255,0.6)',
            stroke: '#000',
            strokeWidth: 3,
            tailPosition: 'top-right', // You can expand _generatePathD to use this
            paddingX: "5px",
            paddingY: "5px",
            bottom: "15dvh",
            left: "30dvw",
            className: "speech-bubble-page5-4"
        })

        const storylineBubbleSpeechBubble5 = new SpeechBubble(page, {
            text: 'I\'m done living in this <br/>shit-hole Jax! <br/> I want out!',
            fill: 'rgba(255,255,255,0.6)',
            stroke: '#000',
            strokeWidth: 3,
            tailPosition: 'top-left', // You can expand _generatePathD to use this
            paddingX: "5px",
            paddingY: "5px",
            bottom: "5dvh",
            right: "30dvw",
            className: "speech-bubble-page5-5"
        })

        const storylineBubbleSpeechBubble6 = new SpeechBubble(page, {
            text: 'We can do this, <br/> and no one will be the wiser.',
            fill: 'rgba(255,255,255,0.6)',
            stroke: '#000',
            strokeWidth: 3,
            tailPosition: 'top-left', // You can expand _generatePathD to use this
            paddingX: "5px",
            paddingY: "5px",
            bottom: "5dvh",
            right: "10dvw",
            className: "speech-bubble-page5-6"
        })

        await storylineBubbleSpeechBubble1.render();
        await storylineBubbleSpeechBubble2.render();
        await storylineBubbleSpeechBubble3.render();
        await storylineBubbleSpeechBubble4.render();
        await storylineBubbleSpeechBubble5.render();
        await storylineBubbleSpeechBubble6.render();

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