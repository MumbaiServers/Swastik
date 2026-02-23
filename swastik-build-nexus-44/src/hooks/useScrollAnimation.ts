import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver.
 * Returns a ref to attach to the element and a boolean indicating visibility.
 */
export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
    const { threshold = 0.15, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Use a callback ref to handle conditional rendering correctly
    const ref = useCallback((node: HTMLDivElement | null) => {
        if (node !== null) {
            setElement(node);
        }
    }, []);

    useEffect(() => {
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [element, threshold, rootMargin, triggerOnce]);

    return { ref, isVisible };
};

/**
 * Utility hook for staggered children animations.
 * Returns a ref and generates className based on visibility + delay.
 */
export const useStaggerAnimation = (
    itemCount: number,
    options: ScrollAnimationOptions & { staggerDelay?: number } = {}
) => {
    const { staggerDelay = 100, ...scrollOptions } = options;
    const { ref, isVisible } = useScrollAnimation(scrollOptions);

    const getItemStyle = useCallback(
        (index: number) => ({
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}ms`,
        }),
        [isVisible, staggerDelay]
    );

    const getItemClassName = useCallback(
        (index: number) =>
            `transition-all duration-600 ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`,
        [isVisible]
    );

    return { ref, isVisible, getItemStyle, getItemClassName };
};

export default useScrollAnimation;
