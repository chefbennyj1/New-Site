//import LiquidBackground from './liquidBackground.js'
import { initPageTiltEffects } from '/libs/tiltEffect.js';
import { initParallaxEffects } from '/libs/parallax.js';
import TextBlock from '/libs/TextBlock.js';


export function init(container) {
    // const root = document.documentElement;
    // const rootComputedStyle = getComputedStyle(root);

    const textBlockCityNameContainer = document.querySelector('.text-block-city-name');
    // const textBlockNovaNameContainer = document.querySelector('.text-block-nova-name');
    // const textBlockNovaProfessionContainer = document.querySelector('.text-block-nova-profession');
    const textBlockStorylineIntroContianer1 = document.querySelector('.text-block-story-line-intro-1');
    const textBlockStorylineIntroContianer2 = document.querySelector('.text-block-story-line-intro-2');
    const textBlockStorylineIntroContainer3 = document.querySelector('.text-block-story-line-intro-3');
    const textBlockStorylineIntroContainer4 = document.querySelector('.text-block-story-line-intro-4');

    const cityNameTextBlock = new TextBlock(textBlockCityNameContainer, {
        text: 'New Kyoto City',
        textColor: "white",
        background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    });

    const storylineIntroTextBlock1 = new TextBlock(textBlockStorylineIntroContianer1, {
        text: 'In the part of the city everyone forgets to look — ',
        textColor: "white",
        background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

    const storylineIntroTextBlock2 = new TextBlock(textBlockStorylineIntroContianer2, {
        text: '— above a noodle shop that never closes — ',
        textColor: "white",
        background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

    const storylineIntroTextBlock3 = new TextBlock(textBlockStorylineIntroContainer3, {
        text: ' — lives a group of outsiders, unlikely heros...',
        textColor: "white",
        background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

    const storylineIntroTextBlock4 = new TextBlock(textBlockStorylineIntroContainer4, {
        text: 'standing on the edge of something far bigger than they can imagine. <br/> Not destiny. Not fate. Just bad timing… and worse luck.',
        textColor: "white",
        background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

    let videos = container.querySelectorAll('video[data-src]');
    enableMedia(videos); 


    cityNameTextBlock.render();
    storylineIntroTextBlock1.render();
    //storylineIntroTextBlock2.render();
    storylineIntroTextBlock3.render();
    storylineIntroTextBlock4.render();

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
    
}


function renderLiquidBackground(container) {
    const app = LiquidBackground(document.getElementById('liquid-canvas'))

    app.loadImage('/images/bg.png');

    app.liquidPlane.material.metalness = 0.75
    app.liquidPlane.material.roughness = 0.25
    app.liquidPlane.uniforms.displacementScale.value = 5
    app.setRain(true)
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






