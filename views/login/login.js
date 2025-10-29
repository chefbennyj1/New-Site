
const form = document.querySelector("form");
export function init(container) {
  let enableAudio = localStorage.getItem('audioEnabled');
  console.log(enableAudio);
  let transitionAudio, bgAudio;
  if(enableAudio) {
    transitionAudio = new Audio("/audio/transition_audio.mp3");
    bgAudio = new Audio('/audio/background.mp3');    
    bgAudio.loop = true;
    bgAudio.play();
  }

  document.querySelector('.back-btn').addEventListener('click', () => {
    window.location.href = "/";
  })
  document.querySelector('.img__btn').addEventListener('click', function () {
    if (enableAudio) transitionAudio.play();
    document.querySelector('.cont').classList.toggle('s--signup');

  });
}

function validateField(field) {
  const errorElement = field.parentElement.querySelector(".error-message");
  if (!field.validity.valid) {
    errorElement.textContent = field.dataset.error || "This field is required";
    return false;
  }
  return true;
}

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   let isValid = true;
//   const fields = form.querySelectorAll("input")
//   fields.forEach(field => {
//     const fieldValid = validateField(field);
//     if(!fieldValid) isValid = false;

//   })
// })



