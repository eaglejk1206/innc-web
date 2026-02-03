import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Studio Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-innc-black via-innc-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Badge */}
        <div className="mb-8 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
          <span className="px-4 py-1 border border-white/20 rounded-full text-gray-300 text-xs font-bold tracking-[0.3em] uppercase bg-black/30 backdrop-blur-sm">
            Est. 2003
          </span>
        </div>
        
        {/* Main Title - Redesigned for Luxury Look */}
        <div className="mb-10 opacity-0 animate-[fadeIn_1s_ease-out_0.3s_forwards] translate-y-4">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-medium text-white tracking-widest leading-none uppercase flex flex-col md:block items-center gap-4 md:gap-0">
            <span className="block md:inline">Insight</span>
            <span className="md:mx-6 text-innc-mint font-serif italic font-light text-4xl md:text-7xl lg:text-8xl align-middle">&</span>
            <span className="block md:inline">Creation</span>
          </h1>
        </div>
        
        {/* Decorative Divider */}
        <div className="w-[1px] h-12 bg-gradient-to-b from-innc-mint to-transparent mb-10 opacity-0 animate-[fadeIn_1s_ease-out_0.6s_forwards]"></div>

        {/* Subtitles - Improved Typography */}
        <div className="space-y-4 mb-14 max-w-3xl opacity-0 animate-[fadeIn_1s_ease-out_0.9s_forwards] translate-y-4">
          <p className="text-2xl md:text-3xl text-white font-light tracking-tight break-keep leading-snug">
            20년 이상의 경험과 기술력으로 가치를 만듭니다.
          </p>
          <p className="text-base md:text-lg text-gray-400 font-light tracking-wider break-keep">
            비주얼 크리에이티브와 디지털 아카이브의 완벽한 조화
          </p>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 opacity-0 animate-[fadeIn_1s_ease-out_1.2s_forwards]">
          <a 
            href="#portfolio"
            onClick={(e) => handleScroll(e, 'portfolio')}
            className="group px-10 py-4 bg-innc-mint text-black font-bold rounded-full transition-all hover:bg-white hover:text-black flex items-center gap-2 shadow-[0_0_20px_rgba(0,194,203,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] cursor-pointer"
          >
            포트폴리오 보기
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#contact"
            onClick={(e) => handleScroll(e, 'contact')}
            className="px-10 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all backdrop-blur-sm cursor-pointer"
          >
            프로젝트 문의하기
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-innc-mint rounded-full"></div>
        </div>
      </div>
      
      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;