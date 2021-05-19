import React, { useContext, useEffect } from "react";
import moon from "../../css/svg/moon.svg";
import sun from "../../css/svg/sun.svg";
import ThemeContext from "../context/ThemeContext";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useContext(ThemeContext);

    const switchTheme = () => {
        let root = document.getElementsByTagName("html")[0];
        if (theme === "dark") {
            root.classList.remove("dark");
            root.classList.add("light");
        } else {
            root.classList.remove("light");
            root.classList.add("dark");
        }
        setTheme(theme === "dark" ? "light" : "dark");
    };

    useEffect(() => {
        localStorage.sunflowerradio__theme = theme;
    });

    const getImageSwitcher = () => {
        return theme === "dark" ? moon : sun;
    };

    return (
        <img
            className="theme-switcher"
            src={getImageSwitcher()}
            alt="theme toggler"
            onClick={switchTheme}
        />
    );
}
