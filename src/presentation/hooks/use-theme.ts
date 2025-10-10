import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "./use-local-storage";

export type Theme = "light" | "dark";

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = getLocalStorageItem("theme");
        return (savedTheme as Theme) || "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        setLocalStorageItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    const setLightTheme = () => {
        setTheme("light");
    };

    const setDarkTheme = () => {
        setTheme("dark");
    };

    return { theme, toggleTheme, setLightTheme, setDarkTheme };
};