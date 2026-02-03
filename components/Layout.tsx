import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Youtube, Monitor, Database, Lock } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const InncLogo = () => (
  <svg width="100" height="32" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 md:h-10 w-auto">
    <text x="0" y="24" fontFamily="Noto Sans KR" fontWeight="900" fontSize="24" fill="white" letterSpacing="-1">INNC</text>
    <circle cx="65" cy="8" r="4" fill="#00C2CB" />
  </svg>
);

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', hash: '#about' },
    { name: 'Services', hash: '#services' },
    { name: 'Portfolio', hash: '#portfolio' },
    { name: 'Contact', hash: '#contact' },
  ];

  const handleNavClick = (hash: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      // Delay to allow navigation before scrolling
      setTimeout(() => {
        const element = document.querySelector(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(hash);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavHover = (hash: string) => {
    // Only scroll on hover if we are already on the home page
    if (location.pathname === '/') {
      const element = document.querySelector(hash);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled ? 'bg-innc-black/90 backdrop-blur-md border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('#hero')} 
          className="cursor-pointer flex items-center"
        >
          <InncLogo />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.hash)}
              onMouseEnter={() => handleNavHover(link.hash)}
              className="text-gray-300 hover:text-innc-mint text-sm font-medium tracking-wide transition-colors uppercase font-sans"
            >
              {link.name}
            </button>
          ))}
          <Link 
            to="/admin" 
            className="ml-4 px-4 py-2 border border-white/20 rounded-full text-xs text-gray-400 hover:border-innc-mint hover:text-white transition-all flex items-center gap-2"
          >
            <Lock size={12} /> ADMIN
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-innc-dark border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.hash)}
              className="text-left text-gray-300 hover:text-innc-mint text-lg font-medium"
            >
              {link.name}
            </button>
          ))}
          <Link 
             to="/admin"
             onClick={() => setMobileMenuOpen(false)}
             className="text-left text-innc-mint font-bold text-lg mt-4"
          >
            ADMIN LOGIN
          </Link>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-innc-dark border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-2">
              <span className="text-white tracking-widest font-display">INNC</span>
            </h2>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              Insight & Creation.<br/>
              20년 이상의 노하우로 과거의 가치를 보존하고,<br/>
              미래의 크리에이티브를 창조합니다.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-innc-mint transition-colors">
                <Instagram size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-innc-mint transition-colors">
                <Facebook size={20} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-innc-mint transition-colors">
                <Youtube size={20} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Services</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-center gap-2"><Monitor size={14} /> 광고/홍보 영상 제작</li>
              <li className="flex items-center gap-2"><Monitor size={14} /> 모션 그래픽</li>
              <li className="flex items-center gap-2"><Database size={14} /> 아날로그 매체 복원</li>
              <li className="flex items-center gap-2"><Database size={14} /> 디지털 아카이빙 구축</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6">Contact Info</h3>
            <address className="not-italic text-gray-400 text-sm space-y-4">
              <p>
                <strong className="text-white block mb-1">Studio</strong>
                서울시 강남구 도산대로 37길 30 지하
              </p>
              <p>
                <strong className="text-white block mb-1">Office</strong>
                서울시 금천구 가산디지털1로 1<br/>더루벤스밸리 509-2
              </p>
              <p>
                <strong className="text-white block mb-1">Email</strong>
                nakisys@naver.com
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">© 2024 INNC. All rights reserved.</p>
          <div className="flex gap-6 text-gray-600 text-sm">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-innc-black text-white font-sans selection:bg-innc-mint selection:text-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};