const toggelbutton = document.getElementById('themeToggle');

toggelbutton.addEventListener('click', () => {
console.log("Button clicked");
  document.body.classList.toggle("light-theme");
  localStorage.setItem("theme", document.body.classList.contains("light-theme") ? 'light' : 'dark');

  const isLight= document.body.classList.contains("light-theme");
    toggelbutton.textContent = isLight ?  "🌙":"🌞";
});

