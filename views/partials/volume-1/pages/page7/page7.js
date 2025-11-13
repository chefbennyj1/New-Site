
export async function init(container) {


 const crossfadeContainer = document.querySelector('.crossfade-container');
 const images = crossfadeContainer.querySelectorAll('.crossfade-image');
 let currentIndex = 0;

 function crossfadeImages() {
   // Remove 'active' from current image
   images[currentIndex].classList.remove('active');

   // Calculate next index
      currentIndex = (currentIndex + 1) % images.length;
   
      // Add 'active' to next image
      images[currentIndex].classList.add('active');
    }
   
    // To start the crossfade automatically every few seconds:
    setInterval(crossfadeImages, 4000); // Switches every 3 seconds

}