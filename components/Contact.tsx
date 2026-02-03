import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

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

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-innc-black to-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <span className="text-innc-mint font-bold tracking-widest text-sm uppercase mb-2 block">Contact Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Let's Create Together</h2>
            <p className="text-gray-400 text-lg mb-12">
              새로운 프로젝트에 대해 논의하고 싶으신가요?<br/>
              INNC의 문은 언제나 열려있습니다.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 text-innc-mint">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Location</h4>
                  <p className="text-gray-400 mb-2">
                    <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Studio</span>
                    서울시 강남구 도산대로 37길 30 지하
                  </p>
                  <p className="text-gray-400">
                    <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Office</span>
                    서울시 금천구 가산디지털1로 1 더루벤스밸리 509-2
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                 <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 text-innc-mint">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Phone</h4>
                  <p className="text-gray-400">02-512-4430 , 010-8006-7812</p>
                </div>
              </div>

               <div className="flex gap-4">
                 <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 text-innc-mint">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">Email</h4>
                  <p className="text-gray-400">nakisys@naver.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">이름</label>
                  <input 
                    required
                    name="name"
                    type="text" 
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-innc-mint focus:ring-1 focus:ring-innc-mint transition-all"
                    placeholder="홍길동"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">연락처</label>
                  <input 
                    required
                    name="phone"
                    type="tel" 
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-innc-mint focus:ring-1 focus:ring-innc-mint transition-all"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-gray-400">의뢰 분야</label>
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
                <label className="text-sm text-gray-400">내용</label>
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