import React, { useEffect, useState } from 'react';
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";
import { vvmApi, getImageUrl } from '@/services/cmsApi';

interface CardData {
  type: string;
  title: string;
  content: string;
  image: string;
  bgColor: string;
}

const ValuesMissionVisionCards = () => {
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVVM = async () => {
      try {
        const response = await vvmApi.getAll();
        const items = response.items || [];

        const typeMap: Record<string, string> = {
          values: 'bg-values-bg',
          vision: 'bg-vision-bg',
          mission: 'bg-mission-bg'
        };

        if (items.length > 0) {
          const formatted = items.map((item: any) => ({
            type: item.type,
            title: item.title,
            content: item.content,
            image: item.image ? getImageUrl(item.image) : lifestyleInterior,
            bgColor: typeMap[item.type] || 'bg-values-bg'
          })).sort((a: any, b: any) => {
            const order = ['values', 'vision', 'mission'];
            return order.indexOf(a.type) - order.indexOf(b.type);
          });
          setCardsData(formatted as CardData[]);
        }
      } catch (error) {
        console.error('Failed to fetch VVM:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVVM();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  // Fallback if empty
  const displayCards = cardsData.length > 0 ? cardsData : [
    {
      type: 'values',
      title: "Our Values",
      content: "Integrity, transparency, and excellence form the foundation of everything we do.",
      image: lifestyleInterior,
      bgColor: "bg-values-bg"
    }, {
      type: 'vision',
      title: "Our Vision",
      content: "To be Mumbai's most trusted real estate developer, creating sustainable communities.",
      image: lifestyleInterior,
      bgColor: "bg-vision-bg"
    }, {
      type: 'mission',
      title: "Our Mission",
      content: "Building quality homes that blend contemporary design with innovation and sustainability.",
      image: lifestyleInterior,
      bgColor: "bg-mission-bg"
    }
  ];

  return (
    <div className="space-y-8">
      {displayCards.map((card, index) => {
        const isImageRight = index % 2 === 0;

        return (
          <div key={card.title} className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
            {/* Desktop Layout */}
            <div className="hidden md:flex min-h-[400px]">
              {/* Content Side */}
              <div className={`w-1/2 flex items-center p-10 lg:p-16 ${card.bgColor} ${!isImageRight ? 'order-2' : 'order-1'}`}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
                      {card.title}
                    </h3>
                    <div className="w-16 h-1.5 bg-brand-blue rounded-full mb-6"></div>
                  </div>
                  <p className="text-brand-gray text-lg lg:text-xl leading-relaxed whitespace-pre-wrap">
                    {card.content}
                  </p>
                </div>
              </div>

              {/* Image Side */}
              <div className={`w-1/2 relative overflow-hidden ${!isImageRight ? 'order-1' : 'order-2'}`}>
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col">
              {/* Image Section */}
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content Section */}
              <div className={`flex-1 ${card.bgColor} p-8`}>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-brand-navy mb-3">
                      {card.title}
                    </h3>
                    <div className="w-12 h-1 bg-brand-blue rounded-full mb-4"></div>
                  </div>
                  <p className="text-brand-gray text-base leading-relaxed whitespace-pre-wrap">
                    {card.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default ValuesMissionVisionCards;