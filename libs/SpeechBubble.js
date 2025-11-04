class SpeechBubble {
  constructor(page, options) {
    this.options = {
      text: '',
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2,
      tailPosition: 'bottom-left', // Default tail position
      top: null,
      bottom: null,
      left: null,
      right: null,
      className: null,
      ...options
    };

    // Use the provided page, or default to the document body
    this.page = page instanceof HTMLElement ? page : document.body;

    // Create the container element
    this.container = document.createElement('div');
    this.container.style.position = "absolute";
    this.container.classList.add('speech-bubble-container');
    if(this.options.className) {
      this.container.classList.add(this.options.className);
    }

    this.svgElement = null;
    this.textElement = null;
  }

  _generatePathD(width = 280, height = 80) {
    // This is a simplified path. For more complex tail positions, 
    // this method would need to dynamically generate the 'd' attribute.
    // For now, it's the original path.
    return `M30 10 h${width} a20,20 0 0 1 20,20 v${height} a20,20 0 0 1 -20,20 h-${width/2} l-10,20 v-20 h-${width/2-20} a20,20 0 0 1 -20,-20 v-${height} a20,20 0 0 1 20,-20 z`;
  }

  _getBubbleHtml() {
    const pathD = this._generatePathD();
    const tailPosition = this.options.tailPosition;
    let transform = '';

    switch (tailPosition) {
      case 'bottom-right':
        transform = 'scaleX(-1)';
        break;
      case 'top-left':
        transform = 'scaleY(-1)';
        break;
      case 'top-right':
        transform = 'scaleX(-1) scaleY(-1)';
        break;
    }

    return `
      <div class="speech">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="5" dy="5" stdDeviation="5" flood-color="#000000" flood-opacity="0.5" />
            </filter>
          </defs>
          <g style="transform: ${transform}; transform-origin: center;">
            <path class="bubble-shape"
              d="${pathD}"
              fill="${this.options.fill}" stroke="${this.options.stroke}" stroke-width="${this.options.strokeWidth}" filter="url(#drop-shadow)"/>
          </g>
          <foreignObject x="40" y="20" width="260" height="80">
            <div xmlns="http://www.w3.org/1999/xhtml" class="bubble-text" style="white-space: nowrap;">
              ${this.options.text}
            </div>
          </foreignObject>
        </svg>
      </div>
    `;
  }

  _fitBubbleToText() {
    if (!this.svgElement || !this.textElement) return;

    const newWidth = this.textElement.scrollWidth;
    const newHeight = this.textElement.scrollHeight;

    const paddingX = 70; // 20px left + 20px right
    const paddingY = 80; // 20px top + 40px bottom + 20px for tail area

    this.svgElement.setAttribute('width', newWidth + paddingX);
    this.svgElement.setAttribute('height', newHeight + paddingY);

    const pathElement = this.svgElement.querySelector('.bubble-shape');
    if (pathElement) {
      pathElement.setAttribute('d', this._generatePathD(newWidth, newHeight));
    }

    // Adjust foreignObject width/height if needed based on new SVG size
    const foreignObject = this.svgElement.querySelector('foreignObject');
    if (foreignObject) {
        foreignObject.setAttribute('width', newWidth);
        foreignObject.setAttribute('height', newHeight);

        const tailPosition = this.options.tailPosition;
        const innerPaddingX = (this.svgElement.getAttribute('width') - newWidth) / 2;
        const innerPaddingY = (this.svgElement.getAttribute('height') - newHeight) / 2;

        let textX = innerPaddingX;
        let textY = innerPaddingY;

        switch (tailPosition) {
          case 'bottom-right':
            textX = innerPaddingX;
            break;
          case 'top-left':
            textY = innerPaddingY;
            break;
          case 'top-right':
            textX = innerPaddingX;
            textY = innerPaddingY;
            break;
        }

        foreignObject.setAttribute('x', textX);
        foreignObject.setAttribute('y', textY);
    }
  }

  render() {
    // Append the container to the page
    if (this.page) {
      this.page.appendChild(this.container);
    } else {
      console.error('SpeechBubble: No valid page element to append to.');
      return;
    }

    // Apply the position styles
    if (this.options.top !== null) this.container.style.top = this.options.top;
    if (this.options.bottom !== null) this.container.style.bottom = this.options.bottom;
    if (this.options.left !== null) this.container.style.left = this.options.left;
    if (this.options.right !== null) this.container.style.right = this.options.right;

    this.container.innerHTML = this._getBubbleHtml();
    this.svgElement = this.container.querySelector('svg');
    this.textElement = this.container.querySelector('.bubble-text');
    this._fitBubbleToText();
  }

  updateText(newText) {
    this.options.text = newText;
    if (this.textElement) {
      this.textElement.innerHTML = newText;
      this._fitBubbleToText(); // Recalculate size after text change
    } else {
      this.render(); // If not rendered yet, render it
    }
  }
}

export default SpeechBubble;


  //   1 // First, import the class into the JavaScript file where you want to use it
  //   2 import SpeechBubble from '/views/partials/speechbubble.js';
  //   3
  //   4 // Then, when you want to create a speech bubble:
  //   5
  //   6 // 1. Get the container element where you want the bubble to appear
  //   7 const myBubbleContainer = document.getElementById('some-element-id'); // Or querySelector('.some-class')
  //   8
  //   9 // 2. Create a new instance of the SpeechBubble class
  //  10 const mySpeechBubble = new SpeechBubble(myBubbleContainer, {
  //  11   text: 'Hello, Neo-Kyoto!',
  //  12   fill: '#ADD8E6', // Light blue
  //  13   stroke: '#00008B', // Dark blue
  //  14   strokeWidth: 3,
  //  15   tailPosition: 'bottom-left' // You can expand _generatePathD to use this
  //  16 });
  //  17
  //  18 // 3. Render the bubble
  //  19 mySpeechBubble.render();
  //  20
  //  21 // If you want to update the text later:
  //  22 // mySpeechBubble.updateText('This is new dialogue!');
  //  23
  //  24 // If you want to change other options, you'd update the options object and re-render
  //  25 // mySpeechBubble.options.fill = 'lightgreen';
  //  26 // mySpeechBubble.render();