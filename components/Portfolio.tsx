import React, { useState, useEffect } from 'react';
import { PortfolioItem } from '../types';
import { X, ExternalLink, Play, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: "1",
    title: "Samsung Galaxy Global Campaign",
    category: "visual",
    client: "Samsung Electronics",
    year: "2023",
    imageUrl: "https://picsum.photos/800/600?random=1",
    description: "글로벌 런칭 캠페인을 위한 하이엔드 3D 모션 그래픽 및 제품 연출 영상."
  },
  {
    id: "2",
    title: "국립현대미술관 아카이브 프로젝트",
    category: "archive",
    client: "MMCA",
    year: "2022",
    imageUrl: "https://picsum.photos/800/600?random=2",
    description: "1980-90년대 전시 기록물 500여 점에 대한 4K 디지털 변환 및 메타데이터 작업."
  },
  {
    id: "3",
    title: "KIA EV9 Brand Film",
    category: "visual",
    client: "KIA",
    year: "2023",
    imageUrl: "https://picsum.photos/800/600?random=3",
    youtubeUrl: "https://www.youtube.com/watch?v=sI31yLq-P1E",
    description: "미래지향적인 모빌리티 경험을 표현한 브랜드 필름 제작."
  },
  {
    id: "4",
    title: "KBS 방송자료 디지털 복원",
    category: "archive",
    client: "KBS",
    year: "2023",
    imageUrl: "https://picsum.photos/800/600?random=4",
    description: "방송 초기 아날로그 테이프의 열화 복원 및 색보정, 디지털 라이브러리 구축."
  },
  {
    id: "5",
    title: "Seoul Tourism TVC",
    category: "visual",
    client: "Seoul City",
    year: "2024",
    imageUrl: "https://picsum.photos/800/600?random=5",
    description: "서울의 다채로운 매력을 담은 관광 홍보 영상 시리즈."
  },
  {
    id: "6",
    title: "독립기념관 역사자료 영구보존",
    category: "archive",
    client: "Independence Hall",
    year: "2021",
    imageUrl: "https://picsum.photos/800/600?random=6",
    description: "중요 역사 기록물의 초고해상도 스캐닝 및 디지털 아카이빙 시스템 설계."
  }
];

// Helper to extract YouTube Video ID (Duplicated for standalone component usage)
const getYoutubeId = (url: string) => {
  if (!url) return null;
  // Improved regex to handle standard watch URLs, short URLs (youtu.be), embed URLs, and Shorts
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2]) ? match[2] : null;
};

const Portfolio: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'visual' | 'archive'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolio"));
        if (!querySnapshot.empty) {
          const mappedData = querySnapshot.docs.map(doc => ({
            ...(doc.data() as any),
            id: doc.id
          })) as PortfolioItem[];
          setItems(mappedData);
        } else {
          // If Firestore is empty (e.g., fresh start), show empty or fallback
          // For now, let's keep it empty to encourage Admin to add items, 
          // or you could use INITIAL_PORTFOLIO as a visual fallback if preferred.
          // To strictly follow "use Firestore", we'll just set empty.
          setItems([]); 
        }
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
        // Fallback to initial data just so the site isn't broken on API error
        setItems(INITIAL_PORTFOLIO);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPortfolio();
  }, []);

  const filteredItems = items.filter(item => 
    filter === 'all' ? true : item.category === filter
  );

  return (
    <section id="portfolio" className="py-24 bg-innc-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
             <span className="text-innc-mint font-bold tracking-widest text-sm uppercase mb-2 block">Selected Works</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Our Portfolio</h2>
          </div>
          
          <div className="flex gap-2 mt-8 md:mt-0">
            {(['all', 'visual', 'archive'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat 
                    ? 'bg-innc-mint text-black' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                } capitalize`}
              >
                {cat === 'all' ? 'All Works' : cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-innc-mint" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.length > 0 ? filteredItems.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-900"
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-innc-mint text-xs font-bold uppercase tracking-wider mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.client}</p>
                </div>
                {item.youtubeUrl && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg z-10">
                    <Play size={12} className="text-white fill-white ml-0.5" />
                  </div>
                )}
              </div>
            )) : (
              <div className="col-span-3 text-center text-gray-500 py-12">
                No portfolio items found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div 
            className="bg-innc-dark w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-96 bg-black">
              {selectedItem.youtubeUrl ? (
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${getYoutubeId(selectedItem.youtubeUrl)}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              ) : (
                <>
                  <img 
                    src={selectedItem.imageUrl} 
                    alt={selectedItem.title} 
                    className="w-full h-full object-cover"
                  />
                  {selectedItem.category === 'visual' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <Play size={32} className="text-white fill-white ml-2" />
                      </div>
                    </div>
                  )}
                </>
              )}
              
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-innc-mint transition-colors z-20"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <span className="px-3 py-1 bg-white/5 rounded text-gray-300">Client: {selectedItem.client}</span>
                <span className="px-3 py-1 bg-white/5 rounded text-gray-300">Year: {selectedItem.year}</span>
                <span className="px-3 py-1 bg-innc-mint/20 text-innc-mint rounded border border-innc-mint/20 capitalize">{selectedItem.category}</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">{selectedItem.title}</h2>
              <div className="mb-8">
                <p className="text-gray-400 leading-relaxed text-lg mb-8">
                  {selectedItem.description}
                </p>
                {/* Replaced Text Slogan */}
                <div className="text-center px-4">
                  <p className="font-montserrat text-gray-400 text-sm md:text-base tracking-[0.1em] font-medium leading-relaxed">
                    "Beyond the surface, we capture the authentic story and the true essence within."
                  </p>
                </div>
              </div>

              {selectedItem.youtubeUrl && (
                 <a 
                   href={selectedItem.youtubeUrl} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 text-white hover:text-innc-mint transition-colors font-medium"
                 >
                  YouTube에서 보기 <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;