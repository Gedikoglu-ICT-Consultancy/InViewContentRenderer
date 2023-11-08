import { ReactElement, ReactNode, createElement, useEffect, useRef, useState } from "react";

export interface InViewContentRendererProps {
    content?: ReactNode;
}

const isElementInViewport = (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

export function InViewContentRenderer({ content }: InViewContentRendererProps): ReactElement {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement | null>(null);

    const handleVisibilityChange = () => {
        if (!document.hidden && ref.current) {
            const currentlyVisible = isElementInViewport(ref.current);
            if (currentlyVisible) {
                setIsVisible(true);
            }
        }
    };

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange);

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.1
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [ref]);

    return isVisible ? (
        <div ref={ref as React.RefObject<HTMLDivElement>}>{content}</div>
    ) : (
        <div ref={ref as React.RefObject<HTMLDivElement>}></div>
    );
}
