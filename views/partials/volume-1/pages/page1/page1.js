//import LiquidBackground from './liquidBackground.js'
import { initPageTiltEffects } from '/scripts/tiltEffect.js';
import { initParallaxEffects } from '/scripts/parallax.js';
import TextBlock from '/scripts/TextBlock.js';

export function init(container) { 

    const textBlockCityNameContainer = document.querySelector('.text-block-city-name');
    const textBlockNovaNameContainer = document.querySelector('.text-block-nova-name');
    const textBlockNovaProfessionContainer = document.querySelector('.text-block-nova-profession');
    const textBlockStorylineNovaIntroContianer1 = document.querySelector('.text-block-story-line-intro-nova-1');
    const textBlockStorylineNovaIntroContianer2 = document.querySelector('.text-block-story-line-intro-nova-2');
    const textBlockStorylineNovaIntroContainer3 = document.querySelector('.text-block-story-line-intro-nova-3');

    const cityNameTextBlock = new TextBlock(textBlockCityNameContainer, {
        text: 'New Kyoto City',
        textColor: "white",
        background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    });

    const novaNameTextBlock = new TextBlock(textBlockNovaNameContainer, {
        text: 'Nova',
        textColor: "white",
        background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    });

    const novaProfessionTextBlock = new TextBlock(textBlockNovaProfessionContainer, {
        text: 'Programmer by trade, problem by nature',
        textColor: "white",
        background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    });

    const storylineNoveIntroTextBlock1 = new TextBlock(textBlockStorylineNovaIntroContianer1, {
        text: 'In the part of the city everyone forgets to look — ',
        textColor:'#000',
        background: 'rgba(232, 185, 49, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

    const storylineNoveIntroTextBlock2 = new TextBlock(textBlockStorylineNovaIntroContianer2, {
        text: '— the cracked edges between the neon towers and the subway dust,',
        textColor:'#000',
        background: 'rgba(232, 185, 49, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

    const storylineNoveIntroTextBlock3 = new TextBlock(textBlockStorylineNovaIntroContainer3, {
        text: 'above a noodle shop that never closes, lives Nova...',
        textColor:'#000',
        background: 'rgba(232, 185, 49, 0.9)', // Semi-transparent black background
        borderColor: 'white',
        borderwidth: 2,
        padding: 15
    })

    let videos = container.querySelectorAll('video[data-src]');
    enableMedia(videos);

    cityNameTextBlock.render();
    novaNameTextBlock.render();
    novaProfessionTextBlock.render();
    storylineNoveIntroTextBlock1.render();
    storylineNoveIntroTextBlock2.render();
    storylineNoveIntroTextBlock3.render();
    container.addEventListener('view_visible',() => {

        enableMedia(videos);
        cityNameTextBlock.render();
        novaNameTextBlock.render();
        storylineNoveIntroTextBlock1.render();
        storylineNoveIntroTextBlock2.render();

    })
    container.addEventListener('view_hidden',() => {
        
        videos.forEach(video => {
            video.pause();           
            video.currentTime = 0;
            console.log(`pausing video: ${video.src}`)
        });

    });
    
    console.log(`loading ${container.id}`)
    const character_1 = container.querySelector('.parallax-scene-character-1');
    //renderLiquidBackground();
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


