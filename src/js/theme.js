/**
 * get the user color theme preference (dark or light)
 * per default use built-in theme from user's system
 */
function getLocalTheme() {
    const userTheme = localStorage.theme;
    if (userTheme) {
        return userTheme
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return 'dark'
    }

    return 'light'
}

export default {
    getLocalTheme,
}

