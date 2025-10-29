let lenis;
const sectionHeight = window.innerHeight;

document.addEventListener("DOMContentLoaded", () => {   

    // Create Lenis only once
    lenis = new Lenis({
        smooth: true,
        lerp: 0.5,
        wheelMultiplier: 1.2,
    });


    // Once sections are loaded, start smooth scroll logic
    window.addEventListener('sectionsloadedcomplete', () => {
        initSmoothScrollTransition();
        console.log("Loading sweet scroll transition...");
        lenis.scrollTo(0, { immediate: true });
    });
});

// function handleAnimationTiming() {
//     const containers = document.querySelectorAll('.section-container');
//     containers.forEach(container => {
//         container.addEventListener('animationend', () => {
//             // find the nearest <section> ancestor and hide it
//             const section = container.closest('section');
//             if (!section.classList.contains('active')) {
//                 section.style.visibility = 'hidden';
//             } else {
//                 section.style.visibility = 'visible';
//             }
//         });
//     })

// }

function initSmoothScrollTransition() {
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const sections = document.querySelectorAll('section');
    const totalHeight = window.innerHeight * sections.length;

    // extend scrollable height
    document.documentElement.style.height = `${totalHeight}px`;

    const sectionHeight = window.innerHeight;

    lenis.on("scroll", ({ scroll }) => {
        
        const sectionIndex = Math.floor(scroll / sectionHeight);

        sections.forEach((s, i) => {
            const isActive = i === sectionIndex;
            const wasActive = s.classList.contains("active");

            // Toggle class
            s.classList.toggle("active", isActive);

            // Fire custom event only when section becomes active
            if (isActive && !wasActive) {
                const event = new CustomEvent("view_visible", { detail: { index: i, section: s } });
                s.dispatchEvent(event);
            }

            // Fire event when section stops being active
            if (!isActive && wasActive) {
                const event = new CustomEvent("view_hidden", { detail: { index: i, section: s } });
                s.dispatchEvent(event);
            }
        });
    });



}

