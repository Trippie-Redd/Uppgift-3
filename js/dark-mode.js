let darkModeOn = false;

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