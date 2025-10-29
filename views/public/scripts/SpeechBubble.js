class SpeechBubble {
  constructor(container, options) {
    this.container = container;
    this.options = {
      text: '',
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2,
      tailPosition: 'bottom-left', // Default tail position
      // Add more options here as needed
      ...options
    };
    this.svgElement = null;
    this.textElement = null;

    if (!this.container) {
      console.error('SpeechBubble: Container element not provided.');
      return;
    }
  }

  _generatePathD() {
    // This is a simplified path. For more complex tail positions, 
    // this method would need to dynamically generate the 'd' attribute.
    // For now, it's the original path.
    return `M10 10 h280 a20,20 0 0 1 20,20 v60 a20,20 0 0 1 -20,20 h-140 l-10,20 v-20 h-130 a20,20 0 0 1 -20,-20 v-60 a20,20 0 0 1 20,-20 z`;
  }

  _getBubbleHtml() {
    const pathD = this._generatePathD();
    return `
      <div class="speech">
        <svg xmlns="http://www.w3.org/2000/svg">
          <path class="bubble-shape"
            d="${pathD}"
            fill="${this.options.fill}" stroke="${this.options.stroke}" stroke-width="${this.options.strokeWidth}"/>
          <foreignObject x="20" y="20" width="260" height="80">
            <div xmlns="http://www.w3.org/1999/xhtml" class="bubble-text">
              ${this.options.text}
            </div>
          </foreignObject>
        </svg>
      </div>
    `;
  }

  _fitBubbleToText() {
    if (!this.svgElement || !this.textElement) return;

    const textBBox = this.textElement.getBoundingClientRect();
    const paddingX = 40; // 20px left + 20px right
    const paddingY = 60; // 20px top + 20px bottom + 20px for tail area

    this.svgElement.setAttribute('width', textBBox.width + paddingX);
    this.svgElement.setAttribute('height', textBBox.height + paddingY);

    // Adjust foreignObject width/height if needed based on new SVG size
    const foreignObject = this.svgElement.querySelector('foreignObject');
    if (foreignObject) {
        foreignObject.setAttribute('width', textBBox.width);
        foreignObject.setAttribute('height', textBBox.height);
    }
  }

  render() {
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