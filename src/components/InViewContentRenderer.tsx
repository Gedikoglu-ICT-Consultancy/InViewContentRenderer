import { ReactElement, ReactNode, createElement, useEffect, useRef, useState } from "react";

export interface InViewContentRendererProps {
    content?: ReactNode;
}

const isElementVisible = (element: HTMLElement): boolean => {
    const style = window.getComputedStyle(element);

    // Check if the element itself is hidden
    if (style.display === "none" || style.visibility === "hidden") {
        return false;
    }

    // Check if any parent elements are hidden
    let parent = element.parentElement;
    while (parent) {
        const parentStyle = window.getComputedStyle(parent);
        if (parentStyle.display === "none" || parentStyle.visibility === "hidden") {
            return false;
        }
        parent = parent.parentElement;
    }

    // Check if the element is within the viewport
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
            const currentlyVisible = isElementVisible(ref.current);
            if (currentlyVisible) {
                setIsVisible(true);
            }
        }
    };

    useEffect(() => {
        const checkInitialVisibility = () => {
            if (ref.current && isElementVisible(ref.current)) {
                setIsVisible(true);
            }
        };

        // Use setTimeout to delay the initial check until after the component has rendered
        setTimeout(checkInitialVisibility, 0);

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
