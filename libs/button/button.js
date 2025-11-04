

ensureButtonSVGFilter();
const btns = document.querySelectorAll(".btn");
btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);

        const text = btn.textContent.trim(); // Save the original button text

        // Clear the existing content
        btn.textContent = '';

        // Add the new structure inside
        btn.innerHTML = `
      <div class="glass-container">
        <div class="glass-filter"></div>
        <div class="glass-overlay"></div>
        <div class="glass-content">${text}</div>
      </div>
    `;
    });

})

function ensureButtonSVGFilter() {
  // Check if the SVG filter is already in the DOM
  if (!document.getElementById('lg-dist-2')) {
    const svgMarkup = `
      <svg style="display:none" viewBox="0 0 264 264" xmlns="http://www.w3.org/2000/svg">
        <filter id="lg-dist-2">
          <feTurbulence type="fractalNoise" baseFrequency="2.74" numOctaves="3" stitchTiles="stitch" />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap in="SourceGraphic" in2="blurred" scale="70" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    `;
    const temp = document.createElement('div');
    temp.innerHTML = svgMarkup;
    document.body.appendChild(temp.firstElementChild);
  }
}


