import * as THREE from '/three/three.module.js';
import { FlakesTexture } from '/three_jsm/textures/FlakesTexture.js';
import { EXRLoader } from '/three_jsm/loaders/EXRLoader.js';
import { initPageTiltEffects } from '/scripts/tiltEffect.js';

let _heroVideo;
export function init(container) {

  console.log(`loading ${container.id}`)
  container.addEventListener('view_visible', ()=> {
    window.transitionAudio.play();
  })  

  //Section 1
  _heroVideo = container.querySelector("#hero-video");

  _heroVideo.src = `/views/landingPage/videos/output_anime.mp4?cacheBust=${Date.now()}`;
  _heroVideo.load();
  _heroVideo.muted = true;
  _heroVideo.loop = true;
  _heroVideo.currentTime = 0;

  _heroVideo.play().catch(err => console.log("Play error:", err));

  _heroVideo.addEventListener("loadeddata", () => {
    initPageTiltEffects();
    renderLogoSphere(); 
    loginButton();  
   });
}

function loginButton() {
  document.querySelector('.get-started-btn-hero').addEventListener('click', (e) => {
    e.preventDefault();
    //set the audio current time in the session store. we are about to kill
    // the DOM here.    
    window.location.href = '/login';
  })
}
function renderLogoSphere() {
  const logoCanvas = document.getElementById('logo-sphere');

  // Set fixed pixel dimensions
  const width = 150;
  const height = 150;

  // Scene & camera setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 3;

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({
    canvas: logoCanvas,
    antialias: true,
    alpha: true,
  });

  renderer.setSize(width, height, false);
  renderer.setPixelRatio(window.devicePixelRatio); // crisp edges on hi-dpi
  renderer.setClearColor(0x000000, 0); // transparent background

  const geometry = new THREE.SphereGeometry(1, 10, 8); // (radius, widthSegments, heightSegments)

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0.0 }
    },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
        uniform float time;
        varying vec2 vUv;

      void main() {
        // Generate a smooth color gradient based on UVs and time
        vec3 baseColor = vec3(0.263, 0.784, 1.0);   // Blue
        vec3 wave = vec3(1.0, 1.0, 1.0); // White waves
        vec3 color = baseColor + wave;

        gl_FragColor = vec4(color, 1.0);
      }
   `
  });


  const wireframe = new THREE.LineSegments(geometry, material);

  //wireframe.scale.set(1.01, 1.01, 1.01); // slightly larger so it sits cleanly above faces
  scene.add(wireframe);

  wireframe.rotation.z = THREE.MathUtils.degToRad(45);

  wireframe.scale.set(0.01, 0.01, 0.01);
  const targetScale = 1.1; // normal size
  const growSpeed = 0.01;
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    // Rotate wireframe independently
    wireframe.rotation.y -= 0.01;

    // Grow wireframe until it reaches target size
    if (wireframe.scale.x < targetScale) {
      wireframe.scale.x += growSpeed;
      wireframe.scale.y += growSpeed;
      wireframe.scale.z += growSpeed;

      // Clamp to targetScale so it doesn't overshoot
      if (wireframe.scale.x > targetScale) {
        wireframe.scale.set(targetScale, targetScale, targetScale);
        // Convert to PNG            
        // const pngURL = renderer.domElement.toDataURL('image/png');
        // document.getElementById("sphere-logo").src = pngURL; // returns a base64 PNG string
      }
    }
    renderer.render(scene, camera);
  }

  animate();

  //Optional: keep size consistent on resize
  window.addEventListener("resize", () => {
    const newWidth = 250;
    const newHeight = 250;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight, false);
  });
}


function initTransitions() {  
  
  let _tl = gsap.timeline({
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".section-one",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      pin: true,
      anticipatePin: 1
    },
   
  });
  // Shrink video clip-path
  _tl.to('.section-one', {
    filter: "blur(8px)",
    scale: 2.2,
    opacity:0,
    duration: 2.5
  });
 

}


function renderSplashLines() {
  const splash = document.getElementById("splash");
  const numLines = 16; // smoother, fuller circle
  const radius = 60;   // how long each line is
  splash.innerHTML = ""; // clear previous

  for (let i = 0; i < numLines; i++) {
    const angle = (360 / numLines) * i;
    const rad = angle * (Math.PI / 180);

    const x2 = Math.cos(rad) * radius;
    const y2 = Math.sin(rad) * radius;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", 0);
    line.setAttribute("y1", 0);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "#43C8FF");
    line.setAttribute("stroke-width", 4);
    line.setAttribute("stroke-linecap", "round");

    // 🔹 Add stroke-dash setup so it can animate
    const lineLength = Math.sqrt(x2 * x2 + y2 * y2);
    line.setAttribute("stroke-dasharray", lineLength);
    line.setAttribute("stroke-dashoffset", lineLength);

    splash.appendChild(line);
  }
}

function renderSphere() {
  const canvas = document.getElementById("three-canvas");

  // Set fixed pixel dimensions
  const width = window.innerWidth;
  const height = window.innerHeight;
  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    width / height,
    1,
    1000
  );
  camera.position.set(0, 0, 500);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  // PMREM Generator (for physically correct env lighting)
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  // Geometry
  const geometry = new THREE.SphereGeometry(100, 64, 64);

  // Load EXR Environment Map
  const loader = new EXRLoader();
  loader.load('/images/puresky_4k.exr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.encoding = THREE.LinearEncoding;

    // Convert HDR texture for PBR materials
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    scene.environment = envMap;
    //scene.background = envMap;

    texture.dispose();
    pmremGenerator.dispose();

    // Create Flakes texture
    const flakes = new THREE.CanvasTexture(new FlakesTexture());
    flakes.wrapS = THREE.RepeatWrapping;
    flakes.wrapT = THREE.RepeatWrapping;
    flakes.repeat.set(10, 6);

    // Material using the environment map
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x43c8ff,
      metalness: 0.9,
      roughness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      normalMap: flakes,
      normalScale: new THREE.Vector2(0.15, 0.15),
      envMap: envMap,
    });

    // Mesh
    const sphere = new THREE.Mesh(geometry, material);
    sphere.scale.set(0.2, 0.2, 0.2); // half the size
    scene.add(sphere);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pointLight = new THREE.PointLight(0xffffff, 1.0);
    pointLight.position.set(200, 200, 200);
    scene.add(pointLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-100, -100, 50);
    scene.add(backLight);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    //animate();

    console.log('EXR environment loaded.');
    console.log('Showing page.');
    document.getElementById("loading-page").style.display = "none";

  });
}

document.addEventListener("visibilitychange", () => {
  const video = document.getElementById("hero-video");
  if (document.hidden) {
    video.pause();
  } else {
    video.play();
  }
});
