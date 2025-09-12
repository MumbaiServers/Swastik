import { useEffect, useRef, useState } from 'react';

interface StackedCard {
  id: string;
  content: React.ReactNode;
}

interface UseStackedCardsProps {
  cards: StackedCard[];
  cardHeight?: number;
}

export const useStackedCards = ({ cards, cardHeight = 600 }: UseStackedCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerTop = rect.top;
      const containerHeight = rect.height;
      
      // More gradual start and end zones for smoother transitions
      const startOffset = windowHeight * 0.6;
      const endOffset = windowHeight * 0.2;
      
      if (containerTop > startOffset) {
        setActiveIndex(0);
        setScrollProgress(0);
        return;
      }
      
      if (containerTop < -containerHeight + endOffset) {
        setActiveIndex(cards.length - 1);
        setScrollProgress(1);
        return;
      }
      
      // Smoother progress calculation with easing
      const scrollableDistance = containerHeight + startOffset - endOffset;
      const scrolled = startOffset - containerTop;
      let progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      
      // Apply easing for smoother transitions
      progress = easeInOutCubic(progress);
      
      // More gradual card transitions
      const cardProgress = progress * (cards.length - 1);
      const newActiveIndex = Math.floor(cardProgress);
      const cardTransitionProgress = cardProgress - newActiveIndex;
      
      // Smooth the transition progress
      const smoothTransitionProgress = easeInOutQuart(cardTransitionProgress);
      
      setActiveIndex(newActiveIndex);
      setScrollProgress(smoothTransitionProgress);
    };

    // Smooth scroll handling with requestAnimationFrame
    let ticking = false;
    const smoothHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', smoothHandleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', smoothHandleScroll);
  }, [cards.length]);

  // Easing functions for smoother animations
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  const easeInOutQuart = (t: number): number => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  };

  const getCardStyle = (index: number) => {
    const isActive = index === activeIndex;
    const isNext = index === activeIndex + 1;
    const isPrevious = index < activeIndex;
    
    let transform = '';
    let opacity = 1;
    let zIndex = cards.length - index; // Higher index = lower z-index
    
    if (isPrevious) {
      // Cards that have already been passed
      transform = 'translateY(-100vh) scale(0.95)';
      opacity = 0;
      zIndex = cards.length + index; // Keep them on top but invisible
    } else if (isActive) {
      // Currently active card with smoother exit
      const translateY = scrollProgress * -80; // Less aggressive movement
      const scale = 1 - (scrollProgress * 0.03); // Subtle scale change
      transform = `translateY(${translateY}vh) scale(${scale})`;
      opacity = 1 - (scrollProgress * 0.2); // More gradual fade
      zIndex = cards.length - index + 10;
    } else if (isNext) {
      // Next card sliding up from behind with smoother entry
      const translateY = 15 - (scrollProgress * 15); // Gentler start position
      const scale = 0.97 + (scrollProgress * 0.03); // Smoother scale transition
      transform = `translateY(${translateY}px) scale(${scale})`;
      opacity = 0.8 + (scrollProgress * 0.2); // Smoother opacity transition
      zIndex = cards.length - index - 1;
    } else {
      // Future cards - subtle stacking
      const stackOffset = (index - activeIndex) * 8; // Tighter stacking
      const stackScale = 0.97 - ((index - activeIndex) * 0.01); // Gradual scale reduction
      transform = `translateY(${stackOffset}px) scale(${stackScale})`;
      opacity = Math.max(0.5, 0.8 - ((index - activeIndex) * 0.1)); // Gradual opacity reduction
      zIndex = cards.length - index - 2;
    }
    
    return {
      transform,
      opacity,
      zIndex,
      transition: 'none', // We handle transitions with scroll
    };
  };

  return {
    containerRef,
    activeIndex,
    scrollProgress,
    getCardStyle,
  };
};