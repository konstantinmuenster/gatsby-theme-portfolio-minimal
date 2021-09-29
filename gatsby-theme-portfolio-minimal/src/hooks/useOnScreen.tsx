import { useState, useEffect, MutableRefObject } from 'react';

// https://usehooks.com/useOnScreen/

export function useOnScreen<T>(ref: MutableRefObject<T | undefined>, threshold = 0.25): boolean {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const element = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold,
            },
        );

        if (element && element instanceof Element) observer.observe(element);

        return () => {
            if (element && element instanceof Element) observer.unobserve(element);
        };
    }, [ref, threshold]);

    return isIntersecting;
}
