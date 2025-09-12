import React, { useEffect, useRef, useState } from 'react';
interface StackedCard {
  id: string;
  colors: [string, string];
  borderColor?: string;
  background?: string;
  content: React.ReactNode;
}
interface StackedCardsProps {
  cards: StackedCard[];
  containerClassName?: string;
  cardClassName?: string;
}
const StackedCards: React.FC<StackedCardsProps> = ({
  cards,
  containerClassName = '',
  cardClassName = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  useEffect(() => {
    const updateCards = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const cardElements = containerRef.current?.querySelectorAll('.stacked-card');
      cardElements?.forEach((card, index) => {
        const htmlCard = card as HTMLElement;
        const cardTop = htmlCard.offsetTop;
        const cardHeight = htmlCard.offsetHeight;

        // Calculate if card should be stacked
        const distanceFromTop = scrollY - cardTop + windowHeight * 0.2;
        const progress = Math.max(0, Math.min(1, distanceFromTop / (cardHeight * 0.5)));
        if (scrollY > cardTop - windowHeight * 0.8) {
          // Scale down the PREVIOUS cards as new ones come over them
          const scale = 1 - progress * 0.05 * (index + 1);
          const translateY = progress * -10 * (index + 1);
          htmlCard.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        } else {
          htmlCard.style.transform = 'scale(1) translateY(0px)';
        }

        // Update active card indicator
        if (scrollY >= cardTop - windowHeight * 0.5 && scrollY < cardTop + cardHeight - windowHeight * 0.5) {
          setActiveCard(index);
        }
      });
    };

    // Smooth scroll behavior
    let ticking = false;
    const smoothScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateCards();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', smoothScroll);
    window.addEventListener('resize', updateCards);

    // Initialize
    updateCards();
    return () => {
      window.removeEventListener('scroll', smoothScroll);
      window.removeEventListener('resize', updateCards);
    };
  }, []);
  const scrollToCard = (index: number) => {
    const cardElements = containerRef.current?.querySelectorAll('.stacked-card');
    const targetCard = cardElements?.[index] as HTMLElement;
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };
  return <>
      <div ref={containerRef} className={`relative max-w-6xl mx-auto py-16 ${containerClassName}`}>
        {cards.map((card, index) => <div key={card.id || index} className={`stacked-card sticky top-8 w-full min-h-[80vh] mb-8 p-12 flex items-center transition-all duration-700 ease-out shadow-2xl ${cardClassName}`} style={{
        zIndex: 1001 + index,
        background: card.background || `linear-gradient(135deg, ${card.colors[0]}, ${card.colors[1]})`,
        border: `1px solid ${card.borderColor || 'rgba(255, 255, 255, 0.5)'}`,
        borderRadius: '60px 20px 60px 20px',
        // top-left (curvy), top-right (pointy), bottom-right (curvy), bottom-left (pointy)
        transformOrigin: 'center bottom',
        opacity: 1
      }}>
            <div className="w-full h-full flex items-center">
              {card.content}
            </div>
          </div>)}
      </div>

      {/* Scroll Indicator */}
      

      {/* Mobile responsive styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .stacked-card {
              padding: 2rem !important;
              min-height: 70vh !important;
              margin-bottom: 1rem !important;
            }
            
            .fixed.right-8 {
              right: 1rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .stacked-card {
              padding: 1.5rem !important;
              min-height: 60vh !important;
              top: 1rem !important;
            }
          }
        `}
      </style>
    </>;
};
export default StackedCards;