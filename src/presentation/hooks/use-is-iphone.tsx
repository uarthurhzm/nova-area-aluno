import { useEffect, useState } from "react";

export function useIsIphone() {
    const [isIphone, setIsIphone] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
        setIsIphone(/iPhone/i.test(ua));
    }, []);

    return isIphone;
}