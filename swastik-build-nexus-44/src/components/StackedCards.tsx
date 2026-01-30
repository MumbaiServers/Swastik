import React, { useEffect, useRef, useState } from 'react';
interface StackedCard {
  id: string;
  colors: [string, string];
  borderColor?: string;
  background?: string;
  content: React.ReactNode;
  customStyles?: React.CSSProperties;
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

  return (
    <>
      <div ref={containerRef} className={`relative max-w-6xl mx-auto py-16 ${containerClassName}`}>
        {cards.map((card, index) => (
          <div
            key={card.id || index}
            className={`stacked-card sticky w-full mb-8 p-0 flex items-center transition-all duration-700 ease-out shadow-2xl overflow-hidden ${cardClassName}`}
            style={{
              zIndex: 10 + index,
              // Calculate top offset for the "folder stack" effect
              top: `calc(100px + ${index * 60}px)`,
              background: card.background || `linear-gradient(135deg, ${card.colors[0]}, ${card.colors[1]})`,
              border: `1px solid ${card.borderColor || 'rgba(255, 255, 255, 0.5)'}`,
              borderRadius: '60px 20px 60px 20px',
              fontFamily: '"Outfit", sans-serif',
              ...card.customStyles
            }}
          >
            <div className="w-full h-full flex items-center">
              {card.content}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}


      {/* Mobile responsive styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .stacked-card {
              padding: 0 !important;
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
    </>
  );
};
export default StackedCards;