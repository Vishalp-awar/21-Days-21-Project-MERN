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

// --- Hamburger / Mobile navigation ---
(function(){
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if(!hamburger || !navLinks) return;

  let lastFocused = null;

  function openMenu(){
    lastFocused = document.activeElement;
    hamburger.classList.add('active');
    navLinks.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    // lock background scroll
    document.body.style.overflow = 'hidden';
    // focus first link for keyboard users
    const firstLink = navLinks.querySelector('a');
    if(firstLink) firstLink.focus();
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClickOutside);
  }

  function closeMenu(){
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // restore focus
    if(lastFocused) lastFocused.focus();
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('click', onClickOutside);
  }

  function toggleMenu(){
    if(navLinks.classList.contains('active')) closeMenu(); else openMenu();
  }

  function onKeyDown(e){
    if(e.key === 'Escape'){
      closeMenu();
    }
    if(e.key === 'Tab'){
      // basic focus trap inside nav when open
      const focusable = Array.from(navLinks.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])'))
        .filter(el => !el.hasAttribute('disabled'));
      if(focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if(e.shiftKey && document.activeElement === first){
        e.preventDefault();
        last.focus();
      } else if(!e.shiftKey && document.activeElement === last){
        e.preventDefault();
        first.focus();
      }
    }
  }

  function onClickOutside(e){
    if(!navLinks.contains(e.target) && !hamburger.contains(e.target)){
      closeMenu();
    }
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // close when a nav link is clicked (mobile)
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => closeMenu()));

  // reflect initial state
  hamburger.setAttribute('aria-expanded', 'false');
})();

