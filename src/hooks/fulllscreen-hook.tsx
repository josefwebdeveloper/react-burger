import { useEffect, useRef, useState } from "react";

export function isFullScreenElement(el: Element | null): boolean {
    const d = document as any;
    return Boolean(
        el && (
            d.fullscreenElement === el ||
            d.mozFullScreenElement === el ||
            d.webkitFullscreenElement === el ||
            d.msFullscreenElement === el
        ) || (
            d.fullscreenElement ||
            d.mozFullScreenElement ||
            d.webkitFullscreenElement ||
            d.msFullscreenElement ||
            d.fullscreen ||
            d.mozFullScreen ||
            d.webkitIsFullScreen ||
            d.fullScreenMode
        )
    );
}

export const useFullScreen = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const openFullScreen = (): Promise<void> | undefined => {
        const el = ref.current || document.documentElement;
        const requestFullscreen =
            el.requestFullscreen ||
            (el as any).webkitRequestFullScreen ||
            (el as any).mozRequestFullScreen ||
            (el as any).msRequestFullscreen;

        return requestFullscreen?.call(el);
    };

    const closeFullScreen = (): Promise<void> | undefined => {
        const exitFullScreen =
            document.exitFullscreen ||
            (document as any).webkitExitFullscreen || // WebKit browsers
            (document as any).mozCancelFullScreen ||   // Firefox
            (document as any).msExitFullscreen;

        return exitFullScreen?.call(document);
    };

    const toggleFullScreen = () => {
        isFullScreen ? closeFullScreen() : openFullScreen();
    };

    useEffect(() => {
        setIsFullScreen(isFullScreenElement(ref.current));

        const handleChange = () => {
            setIsFullScreen(isFullScreenElement(ref.current));
        };

        document.addEventListener("fullscreenchange", handleChange, false);
        document.addEventListener("webkitfullscreenchange", handleChange, false);
        document.addEventListener("mozfullscreenchange", handleChange, false);
        document.addEventListener("MSFullscreenChange", handleChange, false);
        document.addEventListener("msfullscreenchange", handleChange, false);

        return () => {
            document.removeEventListener("fullscreenchange", handleChange);
            document.removeEventListener("webkitfullscreenchange", handleChange);
            document.removeEventListener("mozfullscreenchange", handleChange);
            document.removeEventListener("MSFullscreenChange", handleChange);
            document.removeEventListener("msfullscreenchange", handleChange);
        };
    }, []);

    return {
        ref,
        isFullScreen,
        toggleFullScreen,
        openFullScreen,
        closeFullScreen
    };
};
