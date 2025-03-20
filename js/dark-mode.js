document.addEventListener('DOMContentLoaded', loadTheme);

let darkModeOn = false;

function loadTheme() {
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        
        if (currentTheme === 'dark-mode') {
            darkModeOn = true;
        }
    }
}

function switchTheme(element) {
    if (!darkModeOn) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
        darkModeOn = true;
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', '');
        darkModeOn = false;
    }    
}