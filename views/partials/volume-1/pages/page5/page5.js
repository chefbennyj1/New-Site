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
    const panel1 = page.querySelector('.panel-1a');
    const panel2 = page.querySelector('.panel-1b');
    const panel3 = page.querySelector('.panel-1c');
    const panel4 = page.querySelector('.panel-2a');
    const panel5 = page.querySelector('.panel-2b');
    const panel6 = page.querySelector('.panel-2c');
    const storylineBubbleSpeechBubble1 = new SpeechBubble(panel1, {
            text: 'After all, we wouldn\'t want to <br/>get all the way there to find out <br/>we were chasing ghosts.',
            fill: 'rgba(255,255,255,0.6)',
            stroke: '#000',
            strokeWidth: 3,
            tailPosition: 'top-right', // You can expand _generatePathD to use this
            paddingX: "5px",
            paddingY: "5px",
            top: "50%",
            left: "2%",
            className: "speech-bubble-page5-1"
        })
//

        const storylineBubbleSpeechBubble2 = new SpeechBubble(panel2, {
            text: 'I didn\'t just find this, Jax.<br/> I got bored and hack the city electrical grid.',
            fill: 'rgba(255,255,255,0.6)',
            stroke: '#000',
            strokeWidth: 3,
            tailPosition: 'top-right', // You can expand _generatePathD to use this
            paddingX: "5px",
            paddingY: "5px",
            bottom: "2%",
            left: "1%",
            className: "speech-bubble-page5-2"
        })

        const storylineBubbleSpeechBubble3 = new SpeechBubble(panel3, {
            text: 'Oh, there is something there alright. <br/>I\'ve seen the power <br/>draw on the grid.',
            fill: 'rgba(255,255,255,0.6)',
            stroke: '#000',
            strokeWidth: 3,
            tailPosition: 'top-right', // You can expand _generatePathD to use this
            paddingX: "5px",
            paddingY: "5px",
            bottom: "10%",
            left: "5%",
            className: "speech-bubble-page5-3"
        })

        const storylineBubbleSpeechBubble4 = new SpeechBubble(panel5, {
            text: 'defunct servers? <br/> If they are there, <br />can you set up a hash farm, Lee?',
            fill: 'rgba(255,255,255,0.6)',
            stroke: '#000',
            strokeWidth: 3,
            tailPosition: 'top-right', // You can expand _generatePathD to use this
            paddingX: "5px",
            paddingY: "5px",
            bottom: "5%",
            right: "5%",
            className: "speech-bubble-page5-4"
        })
//,
        const storylineBubbleSpeechBubble5 = new SpeechBubble(panel6, {
            text: "I can hack anything...",
            fill: 'rgba(255,255,255,0.6)',
            stroke: '#000',
            strokeWidth: 3,
            tailPosition: 'top-left', // You can expand _generatePathD to use this
            paddingX: "5px",
            paddingY: "5px",
            bottom: "5%",
            right: "5%",
            className: "speech-bubble-page5-5"
        })

        const storylineBubbleSpeechBubble6 = new SpeechBubble(panel4, {
            text: 'This is our chance!<br />A fresh start.',
            fill: 'rgba(255,255,255,0.6)',
            stroke: '#000',
            strokeWidth: 3,
            tailPosition: 'top-left', // You can expand _generatePathD to use this
            bottom: "1%",
            left: "-15%",
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