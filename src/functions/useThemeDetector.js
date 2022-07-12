import { useEffect, useState } from 'react';

const useThemeDetector = () => {
    const getMatchMedia = () => window.matchMedia("(prefers-color-scheme: light)");

    const [isLightTheme, setIsLightTheme] = useState(getMatchMedia().matches)

    const themeListiner = (e) => {
        setIsLightTheme(e.matches);
    }

    useEffect(() => {

        const matchMed = getMatchMedia();
        matchMed.addEventListener('change', themeListiner);

        return () => matchMed.removeEventListener('change', themeListiner);
    }, [])

    return isLightTheme;
}

export default useThemeDetector