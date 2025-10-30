class TextBlock {
  constructor(container, options) {
    this.container = container;
    this.options = {
      text: '',
      textColor: 'white',
      fill: 'white',      
      stroke: 'black',
      strokeWidth: 2,
      paddingX: 20, // Padding around text
      paddingY: 20, // Padding around text
      // Add more options here as needed
      ...options
    };
    this.svgElement = null;
    this.textElement = null;

    if (!this.container) {
      console.error('TextBlock: Container element not provided.');
      return;
    }
  }

  _generatePathD(width, height) {
    // Simple rectangle path
    return `M0 0 H${width} V${height} H0 Z`;
  }

  _getBubbleHtml(width, height) {
    const pathD = this._generatePathD(width, height);
    return `
      <div class="text-block">
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <rect class="text-block-shape"
            x="0" y="0" width="${width}" height="${height}"
            fill="${this.options.fill}" stroke="${this.options.stroke}" stroke-width="${this.options.strokeWidth}"/>
          <foreignObject x="${this.options.paddingX}" y="${this.options.paddingY}" width="${width - (2 * this.options.paddingX)}" height="${height - (2 * this.options.paddingY)}">
            <div xmlns="http://www.w3.org/1999/xhtml" class="text-block-text">
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
   
    const contentWidth = textBBox.width;
    const contentHeight = textBBox.height;

    const svgWidth = contentWidth + (2 * this.options.paddingX);
    const svgHeight = contentHeight + (2 * this.options.paddingY);

    this.svgElement.setAttribute('width', svgWidth);
    this.svgElement.setAttribute('height', svgHeight);

    const rectElement = this.svgElement.querySelector('rect');
    if (rectElement) {
      rectElement.setAttribute('width', svgWidth);
      rectElement.setAttribute('height', svgHeight);
    }

    const foreignObject = this.svgElement.querySelector('foreignObject');
    if (foreignObject) {
        foreignObject.setAttribute('width', contentWidth);
        foreignObject.setAttribute('height', contentHeight);
    }
  }

  render() {
    // Initial render with placeholder dimensions, then fit to text
    this.container.innerHTML = this._getBubbleHtml(100, 1000); // Placeholder size
    this.svgElement = this.container.querySelector('svg');
    
    this.textElement = this.container.querySelector('.text-block-text');
    this.textElement.style.display = "inline-block";
    this.textElement.style.whiteSpace = "nowrap";
    this.textElement.style.color = this.options.textColor;
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

export default TextBlock;



//  1 // First, import the class into the JavaScript file where you want to use it
//     2 import TextBlock from '/views/partials/textblock.js';
//     3
//     4 // Then, when you want to create a text block:
//     5
//     6 // 1. Get the container element where you want the text block to appear
//     7 const myTextBlockContainer = document.getElementById('some-other-element-id'); // Or querySelector('.some-class')
//     8
//     9 // 2. Create a new instance of the TextBlock class
//    10 const myTextBlock = new TextBlock(myTextBlockContainer, {
//    11   text: 'This is a narrative caption or thought bubble.',
//    12   fill: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
//    13   stroke: 'cyan',
//    14   strokeWidth: 1,
//    15   paddingX: 15,
//    16   paddingY: 10
//    17 });
//    18
//    19 // 3. Render the text block
//    20 myTextBlock.render();
//    21
//    22 // If you want to update the text later:
//    23 // myTextBlock.updateText('The plot thickens...');
//    24
//    25 // If you want to change other options, you'd update the options object and re-render
//    26 // myTextBlock.options.fill = 'darkblue';
//    27 // myTextBlock.render();