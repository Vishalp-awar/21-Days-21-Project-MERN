const toggelbutton = document.getElementById('themeToggle');

toggelbutton.addEventListener('click', () => {
console.log("Button clicked");
  document.body.classList.toggle("light-theme");
  localStorage.setItem("theme", document.body.classList.contains("light-theme") ? 'light' : 'dark');

  const isLight= document.body.classList.contains("light-theme");
    toggelbutton.textContent = isLight ?  "🌙":"🌞";
});

const typedText = document.getElementsByClassName('typed-text');
const textArray = ["Frontend Developer","Backend Developer", "Full Stack Developer","MERN Stack Developer"];
let textArrayIndex = 0;
let charIndex = 0;
let currentText = '';   
let isDeleting = false;
let typingSpeed = 80; 
let deletingSpeed = 30; 
let pauseBetweenWords = 2000;
function type() {
  if (textArrayIndex >= textArray.length) {
    textArrayIndex = 0;
  }
    currentText = textArray[textArrayIndex];
    if (!isDeleting) {
        typedText[0].textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, pauseBetweenWords);
            return;
        }
    } else {
        typedText[0].textContent = currentText.substring(0, charIndex - 1);
        charIndex--;    
        if (charIndex === 0) {
            isDeleting = false;
            textArrayIndex++;
        }   
    }
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, speed);
}

document.addEventListener("DOMContentLoaded", function() {
    type();
});

