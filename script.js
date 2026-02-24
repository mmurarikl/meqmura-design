//this is the start of the js for mequila murarik design









//event listeners
const toggleButton = document.getElementById('theme-toggle');
  
    toggleButton.addEventListener('click', () => {
      const body = document.body;
  
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
      } else if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.classList.add(prefersDark ? 'light-mode' : 'dark-mode');
      }
    });
