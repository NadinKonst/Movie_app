const radioButtons = document.querySelectorAll('.nav__theme-radio');

function switchTheme(elem) {
    const themeValue = elem.target.value;
  
    if (elem.target.checked) {
      if (themeValue === 'dark') {
        document.documentElement.classList.remove('light', 'third');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else if (themeValue === 'light') {
        document.documentElement.classList.remove('dark', 'third');
        document.documentElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      } else if (themeValue === 'third') {
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add('third');
        localStorage.setItem('theme', 'third');
      }
    }
  }

  radioButtons.forEach(button => {
    button.addEventListener('click', switchTheme);
  });