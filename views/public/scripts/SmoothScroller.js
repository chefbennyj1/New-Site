class SmoothScroller {
  constructor(options) {
    this.options = options || {};
    this.sectionSelector = this.options.sectionSelector || 'section';
    this.sections = document.querySelectorAll(this.sectionSelector);
    this.lenis = null;
    this.totalHeight = 0;

    this.init();
  }

  init() {
    this.lenis = new Lenis({
      smooth: true,
      lerp: 0.5,
      wheelMultiplier: 1.2,
    });

    this.lenis.on('scroll', this.onScroll.bind(this));

    this.calculateTotalHeight();
    this.raf();
  }

  calculateTotalHeight() {
    this.totalHeight = 0;
    this.sections.forEach(section => {
      this.totalHeight += section.offsetHeight;
    });
    document.documentElement.style.height = `${this.totalHeight}px`;
  }

  onScroll({ scroll }) {
    let accumulatedHeight = 0;
    let sectionIndex = 0;

    for (let i = 0; i < this.sections.length; i++) {
      accumulatedHeight += this.sections[i].offsetHeight;
      if (scroll < accumulatedHeight) {
        sectionIndex = i;
        break;
      }
    }

    this.sections.forEach((s, i) => {
      const isActive = i === sectionIndex;
      const wasActive = s.classList.contains('active');

      s.classList.toggle('active', isActive);

      if (isActive && !wasActive) {
        const event = new CustomEvent('view_visible', { detail: { index: i, section: s } });
        s.dispatchEvent(event);
      }

      if (!isActive && wasActive) {
        const event = new CustomEvent('view_hidden', { detail: { index: i, section: s } });
        s.dispatchEvent(event);
      }
    });
  }

  raf(time) {
    this.lenis.raf(time);
    requestAnimationFrame(this.raf.bind(this));
  }
}

export default SmoothScroller;