import React, { useState, useEffect } from 'react';
import { PortfolioItem } from '../types';
import { X, ExternalLink, Play } from 'lucide-react';

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 1,
    title: "Samsung Galaxy Global Campaign",
    category: "visual",
    client: "Samsung Electronics",
    year: "2023",
    imageUrl: "https://picsum.photos/800/600?random=1",
    description: "글로벌 런칭 캠페인을 위한 하이엔드 3D 모션 그래픽 및 제품 연출 영상."
  },
  {
    id: 2,
    title: "국립현대미술관 아카이브 프로젝트",
    category: "archive",
    client: "MMCA",
    year: "2022",
    imageUrl: "https://picsum.photos/800/600?random=2",
    description: "1980-90년대 전시 기록물 500여 점에 대한 4K 디지털 변환 및 메타데이터 작업."
  },
  {
    id: 3,
    title: "KIA EV9 Brand Film",
    category: "visual",
    client: "KIA",
    year: "2023",
    imageUrl: "https://picsum.photos/800/600?random=3",
    description: "미래지향적인 모빌리티 경험을 표현한 브랜드 필름 제작."
  },
  {
    id: 4,
    title: "KBS 방송자료 디지털 복원",
    category: "archive",
    client: "KBS",
    year: "2023",
    imageUrl: "https://picsum.photos/800/600?random=4",
    description: "방송 초기 아날로그 테이프의 열화 복원 및 색보정, 디지털 라이브러리 구축."
  },
  {
    id: 5,
    title: "Seoul Tourism TVC",
    category: "visual",
    client: "Seoul City",
    year: "2024",
    imageUrl: "https://picsum.photos/800/600?random=5",
    description: "서울의 다채로운 매력을 담은 관광 홍보 영상 시리즈."
  },
  {
    id: 6,
    title: "독립기념관 역사자료 영구보존",
    category: "archive",
    client: "Independence Hall",
    year: "2021",
    imageUrl: "https://picsum.photos/800/600?random=6",
    description: "중요 역사 기록물의 초고해상도 스캐닝 및 디지털 아카이빙 시스템 설계."
  }
];

const Portfolio: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'visual' | 'archive'>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    const loadItems = () => {
      const stored = localStorage.getItem('innc_portfolio');
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        setItems(INITIAL_PORTFOLIO);
        localStorage.setItem('innc_portfolio', JSON.stringify(INITIAL_PORTFOLIO));
      }
    };
    
    loadItems();
    
    // Listen for storage events (in case admin updates in another tab)
    window.addEventListener('storage', loadItems);
    return () => window.removeEventListener('storage', loadItems);
  }, []);

  const filteredItems = items.filter(item => 
    filter === 'all' ? true : item.category === filter
  );

  return (
    <section id="portfolio" className="py-24 bg-innc-black">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
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
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div 
            className="bg-innc-dark w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 md:h-96">
              <img 
                src={selectedItem.imageUrl} 
                alt={selectedItem.title} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-innc-mint transition-colors"
              >
                <X size={20} />
              </button>
              {selectedItem.category === 'visual' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Play size={32} className="text-white fill-white ml-2" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <span className="px-3 py-1 bg-white/5 rounded text-gray-300">Client: {selectedItem.client}</span>
                <span className="px-3 py-1 bg-white/5 rounded text-gray-300">Year: {selectedItem.year}</span>
                <span className="px-3 py-1 bg-innc-mint/20 text-innc-mint rounded border border-innc-mint/20 capitalize">{selectedItem.category}</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">{selectedItem.title}</h2>
              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                {selectedItem.description}
                <br /><br />
                {selectedItem.category === 'archive' 
                  ? '본 프로젝트는 원본 매체의 물리적 손상을 정밀 진단한 후, 당사 고유의 클리닝 프로세스를 거쳐 4K 60fps 포맷으로 디지털 변환되었습니다.' 
                  : '브랜드의 핵심 가치를 시각적으로 극대화하기 위해 기획 단계부터 참여하여, 혁신적인 촬영 기법과 VFX 기술을 도입했습니다.'}
              </p>

              <button className="flex items-center gap-2 text-white hover:text-innc-mint transition-colors font-medium">
                프로젝트 자세히 보기 <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;