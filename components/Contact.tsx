import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, ExternalLink, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xlglvjya", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        // Reset button state after 3 seconds
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        alert("메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
        setFormStatus('idle');
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("전송 중 오류가 발생했습니다.");
      setFormStatus('idle');
    }
  };

  const locations = [
    {
      title: "Studio",
      address: "서울시 강남구 도산대로 37길 30 지하",
      detail: "High-end visual production space",
      // Google Map Embed URL for the address
      mapUrl: "https://maps.google.com/maps?q=Seoul+Gangnam-gu+Dosan-daero+37-gil+30&t=&z=16&ie=UTF8&iwloc=&output=embed",
      // Direct Link to Naver Map
      naverMapLink: "https://map.naver.com/v5/search/서울시%20강남구%20도산대로%2037길%2030"
    },
    {
      title: "Office",
      address: "서울시 금천구 가산디지털1로 1 더루벤스밸리 509-2",
      detail: "Digital archiving & Restoration center",
      // Google Map Embed URL for the address
      mapUrl: "https://maps.google.com/maps?q=Seoul+Geumcheon-gu+Gasan+Digital+1-ro+1+The+Rubens+Valley&t=&z=16&ie=UTF8&iwloc=&output=embed",
      // Direct Link to Naver Map - Updated to search by company name
      naverMapLink: "https://map.naver.com/v5/search/아이엔엔씨"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-innc-black to-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-innc-mint font-bold tracking-widest text-sm uppercase mb-3 block">Contact Us</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Create Together</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            INNC는 비주얼 크리에이티브와 디지털 아카이빙의 전문성을 바탕으로<br className="hidden md:block"/>
            고객의 소중한 가치를 보존하고 확장합니다.
          </p>
        </div>

        {/* Maps Section - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {locations.map((loc, index) => (
            <div key={index} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col group hover:border-innc-mint/30 transition-colors">
              {/* Map Frame - Removed grayscale filter to show color */}
              <div className="h-64 md:h-80 w-full relative overflow-hidden bg-[#222]">
                <iframe 
                  src={loc.mapUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${loc.title} Map`}
                  className="absolute inset-0 opacity-100 transition-opacity duration-500"
                ></iframe>
                
                {/* Overlay Button */}
                <div className="absolute bottom-4 right-4 z-10">
                   <a 
                    href={loc.naverMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg transition-all transform group-hover:scale-105"
                  >
                    네이버 지도에서 보기 <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{loc.title}</h3>
                    <p className="text-innc-mint text-sm">{loc.detail}</p>
                  </div>
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-400">
                    <MapPin size={20} />
                  </div>
                </div>
                <p className="text-gray-300 mb-6">{loc.address}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Common Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-innc-dark rounded-3xl p-8 md:p-12 border border-white/5">
          {/* Left: General Info */}
          <div className="lg:col-span-1 space-y-8 border-b lg:border-b-0 lg:border-r border-white/5 pb-8 lg:pb-0 lg:pr-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-6">General Inquiries</h3>
              <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                프로젝트 의뢰, 견적 상담, 기술 자문 등 궁금하신 점을 남겨주시면 담당자가 24시간 이내에 답변드립니다.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                 <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 text-innc-mint">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-1">Phone</h4>
                  <p className="text-gray-400 text-sm">02-512-4430</p>
                  <p className="text-gray-400 text-sm">010-8006-7812</p>
                </div>
              </div>

               <div className="flex gap-4">
                 <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 text-innc-mint">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-1">Email</h4>
                  <p className="text-gray-400 text-sm">nakisys@naver.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Name</label>
                  <input 
                    required
                    name="name"
                    type="text" 
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-innc-mint focus:ring-1 focus:ring-innc-mint transition-all"
                    placeholder="이름 / 기업명"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Contact</label>
                  <input 
                    required
                    name="phone"
                    type="tel" 
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-innc-mint focus:ring-1 focus:ring-innc-mint transition-all"
                    placeholder="연락처"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider">Category</label>
                <select 
                  name="category" 
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-innc-mint focus:ring-1 focus:ring-innc-mint transition-all appearance-none cursor-pointer"
                >
                  <option value="Visual Creative">Visual Creative (영상 제작)</option>
                  <option value="Digital Archive">Digital Archive (아카이빙)</option>
                  <option value="Other">기타 문의</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider">Message</label>
                <textarea 
                  required
                  name="message"
                  rows={4}
                  className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-innc-mint focus:ring-1 focus:ring-innc-mint transition-all resize-none"
                  placeholder="프로젝트 내용을 간단히 설명해주세요."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                  formStatus === 'success' 
                    ? 'bg-green-600 text-white'
                    : 'bg-innc-mint text-black hover:bg-innc-mintHover disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {formStatus === 'submitting' ? (
                  '전송 중...'
                ) : formStatus === 'success' ? (
                  '문의가 접수되었습니다'
                ) : (
                  <>문의하기 <Send size={18} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;