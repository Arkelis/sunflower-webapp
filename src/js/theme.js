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
