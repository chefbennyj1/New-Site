//import LiquidBackground from './liquidBackground.js'
import { initPageTiltEffects } from '/scripts/tiltEffect.js';
import { initParallaxEffects } from '/scripts/parallax.js';

export function init(container) {  
    
    let videos = container.querySelectorAll('video[data-src]');
    enableMedia(videos);

    container.addEventListener('view_visible',() => {

        enableMedia(videos);

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
