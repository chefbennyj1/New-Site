
    export async function loadSection(containerId, htmlPath) {
      try {

        // Load HTML
        const response = await fetch(htmlPath);
        const html = await response.text();
        const container = document.getElementById(containerId);
        container.innerHTML = html;

        // Derive matching JS and CSS paths
        const basePath = htmlPath.replace('.html', '');
        let jsPath = `${basePath}.js`;
        const cssPath = `${basePath}.css`;

        // Load CSS dynamically (if not already loaded)
        await loadCSS(cssPath);
        
        //fix file paths cant use "Windows" style "\" in web paths.
        jsPath = jsPath.replace(/\\/g, '/'); // replace backslashes
        // Dynamically import JS module
        const module = await import(jsPath);

        // Initialize section if it exports init()
        if (module.init) module.init(container);

        // Dispatch custom event for this section
        document.dispatchEvent(new CustomEvent('sectionLoaded', { detail: { id: containerId } }));

        console.log(`Loaded section: ${containerId}`);
        
      } catch (err) {
        console.error(`Error loading section ${containerId}:`, err);
      }
    }

    // Helper function to load CSS dynamically
    export async function loadCSS(href) {
      // Prevent duplicates if the same stylesheet was already added
      if ([...document.styleSheets].some(sheet => sheet.href && sheet.href.includes(href))) return;

      return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = resolve;
        link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
        document.head.appendChild(link);
      });
    }

    export function loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'module'; // use 'text/javascript' if not an ES module
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    }
