import React from 'react';
import { Film, Database, Award, Zap, Users, ShieldCheck } from 'lucide-react';

const AboutAndServices: React.FC = () => {
  const clients = [
    "국립중앙박물관", "국립현대미술관", "한국영상자료원", "아르코예술기록원", "라움미술관", "갤러리현대"
  ];

  return (
    <>
      {/* About Section */}
      <section id="about" className="py-24 bg-innc-black relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                History of <span className="text-innc-mint">Excellence</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                INNC는 2003년 설립 이래, 아날로그의 가치를 디지털로 보존하고 
                새로운 시각적 경험을 창조하는 크리에이티브 에이전시입니다.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                단순한 영상 제작을 넘어, 기업과 기관의 소중한 자산을 
                미래 세대에게 전달하는 디지털 아카이빙 솔루션을 제공합니다.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="text-3xl font-bold text-white mb-1">20+</div>
                  <div className="text-sm text-gray-500">Years Experience</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-sm text-gray-500">Projects Completed</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-innc-mint/20 blur-3xl rounded-full opacity-20"></div>
              <div className="relative grid grid-cols-2 gap-4">
                 {/* Decorative Grid of Client Logos (Placeholders) */}
                 {clients.map((client, i) => (
                   <div key={i} className="bg-innc-gray h-24 flex items-center justify-center rounded border border-white/5 hover:border-innc-mint/50 transition-colors group">
                     <span className="text-gray-500 font-bold group-hover:text-white transition-colors">{client}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-0 bg-innc-black">
        <div className="flex flex-col md:flex-row w-full">
          {/* Visual Creative Column */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-[#111] to-black p-12 md:p-24 border-b md:border-b-0 md:border-r border-white/5 group hover:bg-[#151515] transition-all duration-500">
            <div className="mb-6 w-16 h-16 rounded-2xl bg-innc-mint/10 flex items-center justify-center text-innc-mint group-hover:bg-innc-mint group-hover:text-black transition-all">
              <Film size={32} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Visual Creative</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              브랜드의 아이덴티티를 명확하게 전달하는 고감도 영상 콘텐츠를 제작합니다.
              기획부터 촬영, 편집, 모션그래픽까지 원스톱 솔루션을 제공합니다.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300">
                <Zap size={18} className="text-innc-mint" /> TVC / 바이럴 광고
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Zap size={18} className="text-innc-mint" /> 기업 홍보 영상
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Zap size={18} className="text-innc-mint" /> 2D/3D 모션 그래픽
              </li>
            </ul>
          </div>

          {/* Digital Archive Column */}
          <div className="w-full md:w-1/2 bg-black p-12 md:p-24 group hover:bg-[#0a0a0a] transition-all duration-500">
             <div className="mb-6 w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Database size={32} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Digital Archive</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              8mm, 6mm, Beta 테이프 등 아날로그 자산을 초고화질 디지털 포맷으로 변환하고
              체계적인 메타데이터를 구축하여 영구 보존합니다.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300">
                <ShieldCheck size={18} className="text-blue-500" /> 특수 세척 및 곰팡이 제거
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <ShieldCheck size={18} className="text-blue-500" /> AI 기반 화질 개선 (Upscaling)
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <ShieldCheck size={18} className="text-blue-500" /> CMS 메타데이터 구축
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutAndServices;