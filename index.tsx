import React, { useState, useEffect, useRef, ReactNode, memo } from 'react';
import { createRoot } from 'react-dom/client';

// --- Icons (SVGs) - Memoized for performance ---
const ArrowRight = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
));
const Instagram = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
  </svg>
));
const Linkedin = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
));
const WhatsApp = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
));
const TrendingUp = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
));
const Users = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
));
const Menu = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
));
const XIcon = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
));
const Plus = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
));
const Play = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
));
const Target = memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
));
const Book = memo(() => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
));
const Zap = memo(() => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
));
const Rocket = memo(() => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1S10 8 9 12z"></path><path d="M12 9v4c.6 1.5 2 4 1 5 1.5 1 4 .5 4 .5s-1-2.4-2-4z"></path></svg>
));
const BarChart3 = memo(() => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
));
const BrainCircuit = memo(() => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 2.68 2.5 2.5 0 0 0 2.77 3.29 2.5 2.5 0 0 0 4.18 1.48 2.5 2.5 0 0 0 4.93.4 2.5 2.5 0 0 0 2.39-4.85 2.5 2.5 0 0 0-.25-4.57 2.5 2.5 0 0 0-2.1-3.6z"/><path d="M12 8v4"/><path d="M12 16v4"/><path d="M8 12h8"/><path d="M16 8v4"/><path d="M8 8v4"/></svg>
));
const Quote = memo(({ size = 24 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z"></path></svg>
));

// --- Parallax Hook ---
const useParallax = (speed = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const offset = window.scrollY * speed;
        // Use translate3d for hardware acceleration
        ref.current.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
};

// --- Scroll Logic ---
const smoothScrollTo = (e: React.MouseEvent, href: string) => {
  e.preventDefault();
  const targetId = href.replace('#', '');
  const element = document.getElementById(targetId);
  if (element) {
    const headerOffset = 80; // Compensates for the fixed navbar height
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// --- Animation Hook ---
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible] as const;
};

interface FadeInProps {
  children?: ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = memo(({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref as any}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
});

// --- Components ---

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Visão Geral', href: '#home' },
    { name: 'Quem Sou', href: '#about' },
    { name: 'Trajetória', href: '#timeline' },
    { name: 'Projetos', href: '#work' },
    { name: 'Expertise', href: '#services' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tighter hover:text-gray-300 transition-colors" onClick={(e) => smoothScrollTo(e, '#home')}>
          caio<span className="text-yellow-500">mull</span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              onClick={(e) => smoothScrollTo(e, link.href)}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="http://wa.me/73981488186" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-sm font-bold text-black bg-white rounded-full hover:bg-yellow-500 transition-all"
          >
            Contato
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <button aria-label="Menu" className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <XIcon /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-neutral-900 border-b border-neutral-800 p-6 flex flex-col space-y-4 md:hidden animate-fade-in">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-lg font-medium text-gray-300" 
              onClick={(e) => {
                setIsOpen(false);
                smoothScrollTo(e, link.href);
              }}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => {
              setIsOpen(false);
              smoothScrollTo(e, '#contact');
            }}
            className="text-lg font-medium text-yellow-500"
          >
            Contato
          </a>
        </div>
      )}
    </nav>
  );
});

const Hero = memo(() => {
  const parallaxRef1 = useParallax(0.2); // Slower
  const parallaxRef2 = useParallax(0.1); // Even slower

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Abstract Background with Parallax */}
      <div className="absolute inset-0 bg-neutral-950">
        <div ref={parallaxRef1} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-900/10 rounded-full blur-[120px] animate-pulse"></div>
        <div ref={parallaxRef2} className="absolute top-0 right-0 w-[400px] h-[400px] bg-neutral-800/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <FadeIn>
          <span className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider text-yellow-500 border border-yellow-500/30 rounded-full bg-yellow-500/10 uppercase">
            Marketing & Performance
          </span>
        </FadeIn>
        
        <FadeIn delay={200}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight mb-8">
            <span className="block text-white">Crescimento com</span>
            <span className="gradient-text bg-gradient-to-r from-yellow-200 to-yellow-600">Estratégia.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={400}>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Uno análise de dados, criatividade visual e execução técnica para escalar negócios digitais. Não apenas design, mas resultado.
          </p>
        </FadeIn>

        <FadeIn delay={600}>
          <a 
            href="#work" 
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-gray-200 transition-all hover:scale-105 cursor-pointer"
            onClick={(e) => smoothScrollTo(e, '#work')}
          >
            Ver Casos Reais <ArrowRight />
          </a>
        </FadeIn>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        onClick={(e) => smoothScrollTo(e, '#about')}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-600 cursor-pointer hover:text-white transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
      </div>
    </section>
  );
});

const Stats = memo(() => {
  const stats = [
    { label: 'Crescimento de Seguidores', value: '+637%', icon: <Users /> },
    { label: 'Alcance / Impressões', value: '+124.7k', icon: <Instagram /> },
    { label: 'Aumento de Visitas', value: '+740%', icon: <TrendingUp /> },
  ];

  return (
    <section className="py-20 border-y border-neutral-900 bg-neutral-950/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-yellow-600 mb-2">Track Record</h3>
            <p className="text-neutral-400">Métricas reais de projetos que gerenciei.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 100} className="flex flex-col items-center text-center">
              <div className="text-yellow-500 mb-4 opacity-80 scale-125">{stat.icon}</div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-500 font-medium uppercase tracking-widest text-xs">{stat.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
});

const About = memo(() => {
  // Adding parallax to a background element in About
  const bgParallaxRef = useParallax(0.15);

  return (
    <section id="about" className="py-32 bg-neutral-950 relative overflow-hidden">
        {/* Subtle Background Parallax Blob for Depth */}
        <div 
          ref={bgParallaxRef}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none z-0 translate-y-[-100px]"
        ></div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">
            <div className="w-full md:w-1/2">
               <FadeIn>
                <div className="relative aspect-square rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                     <img loading="lazy" decoding="async" src="https://i.imgur.com/easBeXW.jpeg" alt="Caio" className="object-cover w-full h-full" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                     <div className="absolute bottom-6 left-6">
                         <p className="text-yellow-500 font-bold">@caiomull</p>
                     </div>
                </div>
               </FadeIn>
            </div>
            <div className="w-full md:w-1/2">
                <FadeIn delay={200}>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Olá, eu sou o <span className="text-yellow-500">Caio.</span></h2>
                    
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        Profissional de marketing com <strong className="text-white">visão 360°</strong>, conecto <strong className="text-white">estratégia, branding e execução</strong>. Atuo entre social media, design, vídeo, web design, IA e análise de dados, sempre focado no que gera valor real para a marca e para o negócio.
                    </p>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        Minha experiência vem da <strong className="text-white">prática empreendedora</strong>, do trabalho como freelancer, da mentoria a empresas e da formação como trainee de marketing na <strong className="text-white">Cia Júnior</strong>, unindo análise, criatividade e estratégia. Minha paixão é gerar valor para o cliente.
                    </p>

                    {/* Mindset Block */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                            <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Zap size={16} className="text-yellow-500"/> Execução Rápida</h4>
                            <p className="text-xs text-gray-500">Testar, validar e escalar. O mercado não espera a perfeição, ele premia a consistência.</p>
                        </div>
                        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg">
                            <h4 className="text-white font-bold mb-2 flex items-center gap-2"><Target size={16} className="text-yellow-500"/> Foco em Resultado</h4>
                            <p className="text-xs text-gray-500">Likes são métricas de vaidade. Vendas e leads são métricas de negócio.</p>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    </section>
  )
});

const Timeline = memo(() => {
  const milestones = [
    {
      year: '2022',
      title: 'Imersão Staage',
      description: 'Participação no evento de formação social media Staage. Networking e conexão com as principais tendências do mercado.',
      image: 'https://i.imgur.com/9tG7nsM.png'
    },
    {
      year: '2022',
      title: 'Recorde de Vendas',
      description: '36 camisas da seleção vendidas em um único dia. Validação estratégica de tráfego orgânico e oferta na CR Bonés.',
      image: 'https://i.imgur.com/m7YCUhm.jpeg'
    },
    {
      year: '2023',
      title: 'Intercâmbio EUA',
      description: 'Intercâmbio na University of La Verne com foco em marketing e estratégia, fortalecendo uma visão global aplicada ao crescimento de negócios.',
      image: 'https://i.imgur.com/izenMyc.jpeg'
    },
    {
      year: '2023',
      title: 'Collab Estratégica',
      description: 'CR Bonés + Brega Light. Parceria oficial com um dos maiores eventos da região, elevando a autoridade da marca.',
      image: 'https://i.imgur.com/WdFr3gp.jpeg'
    },
    {
      year: '2024',
      title: 'Marketing Político',
      description: 'Social Media em campanha para prefeito. Foco em engajar os eleitores e fornecer comunicações relevantes através de conteúdo.',
      image: 'https://i.imgur.com/7htiEC8.jpeg'
    },
    {
      year: '2025',
      title: 'Graduação UESC',
      description: 'Conclusão da segunda faculdade. Unindo a solidez acadêmica com a prática de mercado.',
      image: 'https://i.imgur.com/tmb4iT4.png'
    },
    {
      year: '2026',
      title: 'Loading...',
      description: 'Meu foco é atuar em uma agência de marketing, ajudando negócios a crescer por meio de estratégia e execução.',
      image: 'https://i.imgur.com/ZGXd3b5.png',
      isFuture: true
    }
  ];

  return (
    <section id="timeline" className="py-20 bg-neutral-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <FadeIn className="mb-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Minha Trajetória</h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto rounded-full"></div>
        </FadeIn>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line - Centered on desktop, left aligned on mobile */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-800 md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {milestones.map((item, index) => (
              <FadeIn key={index} delay={index * 100}>
                <div className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-10 h-10 bg-black border-4 border-yellow-500 rounded-full z-10 md:-translate-x-1/2 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                     <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>

                  {/* Content - 50% width on desktop */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                      <span className="text-yellow-500 font-bold text-2xl block mb-2">{item.year}</span>
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">{item.description}</p>
                      
                      {/* Image Card */}
                      <div className={`relative h-48 w-full md:w-4/5 rounded-xl overflow-hidden border border-neutral-800 shadow-lg group ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                          <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                          <img 
                            loading="lazy"
                            decoding="async"
                            src={item.image} 
                            alt={item.title} 
                            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter ${item.isFuture ? 'blur-[3px] grayscale' : 'grayscale group-hover:grayscale-0'}`} 
                          />
                          {item.isFuture && (
                              <div className="absolute inset-0 flex items-center justify-center z-20">
                                  <div className="bg-black/50 p-3 rounded-full border border-yellow-500 text-yellow-500 animate-pulse">
                                      <Rocket />
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>

                  {/* Empty Spacer for the other side on desktop */}
                  <div className="hidden md:block w-1/2"></div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const isVideo = (url) => typeof url === 'string' && (url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.webm'));

  const MediaItem = ({ src, alt }) => {
      if (isVideo(src)) {
          return (
              <video 
                key={src} // IMPORTANT: Forces React to re-mount the video element when src changes
                controls 
                playsInline 
                className="w-full h-auto block rounded-xl bg-black" 
                preload="metadata"
                src={src} 
              >
                  Your browser does not support the video tag.
              </video>
          );
      }
      return <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" decoding="async" />;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Content */}
      <div className="relative w-full max-w-6xl h-[90vh] bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col md:flex-row animate-[fadeIn_0.3s_ease-out]">
        
        {/* Left Col: Text & Context */}
        <div className="w-full md:w-1/3 bg-neutral-900 p-8 overflow-y-auto border-r border-neutral-800 relative z-20">
             <div className="flex justify-between items-center mb-6 md:hidden">
                <span className="text-yellow-500 text-xs font-bold uppercase">{project.category}</span>
                <button aria-label="Close" onClick={onClose}><XIcon /></button>
             </div>
             
             <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
             <p className="text-yellow-500 text-xs font-bold uppercase tracking-wider mb-8 hidden md:block">{project.category}</p>

             <div className="space-y-6">
                 <div>
                     <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide">O Desafio</h4>
                     <p className="text-gray-400 text-sm leading-relaxed">{project.challenge}</p>
                 </div>
                 <div>
                     <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide">A Solução</h4>
                     <p className="text-gray-400 text-sm leading-relaxed">{project.solution}</p>
                 </div>
                 {project.results && (
                     <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-800">
                         <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide flex items-center gap-2"><TrendingUp size={14}/> Impacto</h4>
                         <p className="text-gray-300 text-sm font-medium">{project.results}</p>
                     </div>
                 )}
             </div>

             <button onClick={onClose} className="hidden md:flex items-center gap-2 mt-12 text-sm text-gray-500 hover:text-white transition-colors">
                <ArrowRight /> Fechar Projeto
             </button>
        </div>

        {/* Right Col: Gallery */}
        <div className="w-full md:w-2/3 overflow-y-auto p-6 bg-black relative">
             <button 
                aria-label="Close"
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/50 text-white hover:bg-neutral-800 transition-colors z-30 hidden md:block border border-neutral-700"
              >
                <XIcon />
              </button>

           <div className="space-y-6">
              {/* Gallery Logic: Supports strings (full width) or arrays of strings (2 columns) */}
              {project.gallery && project.gallery.map((item, idx) => {
                if (Array.isArray(item)) {
                   // Grid Layout for paired images/videos
                   return (
                     <div key={idx} className="grid grid-cols-2 gap-4">
                        {item.map((subImg, subIdx) => (
                          <div key={subIdx} className="rounded-xl overflow-hidden shadow-xl border border-neutral-800">
                             <MediaItem src={subImg} alt={`${project.title} detail ${idx}.${subIdx}`} />
                          </div>
                        ))}
                     </div>
                   );
                } else {
                   // Standard Single Item
                   return (
                    <div key={idx} className="rounded-xl overflow-hidden shadow-xl border border-neutral-800">
                      <MediaItem src={item} alt={`${project.title} detail ${idx + 1}`} />
                    </div>
                   );
                }
              })}
           </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = memo(({ title, category, image, size, onClick }: any) => {
  return (
    <div 
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer h-full w-full`}
    >
      <div className="absolute inset-0 bg-neutral-800 animate-pulse"></div> 
      <img 
        src={image} 
        alt={title} 
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* View Icon - REPLACED WITH TEXT */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <span className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-medium tracking-wider uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
          Ver Detalhes
        </span>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
        <span className="text-yellow-500 text-xs font-bold tracking-wider uppercase mb-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          {category}
        </span>
        <h3 className="text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {title}
        </h3>
      </div>
    </div>
  );
});

const Work = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { 
      title: 'CR Trends', 
      category: 'E-commerce & Growth', 
      image: 'https://i.imgur.com/ptoEgpb.jpeg', 
      size: 'large',
      challenge: 'Escalar as vendas de um e-commerce de acessórios em um mercado saturado, aumentando o LTV (Lifetime Value) e o reconhecimento de marca.',
      solution: 'Desenvolvimento de uma identidade visual proprietária e campanhas de tráfego pago focadas em conversão. Criação de conteúdo que misturava lifestyle com prova social.',
      results: '+637% de crescimento em base de seguidores qualificados e aumento consistente na taxa de conversão.',
      gallery: [
        'https://i.imgur.com/baBXj6H.png',
        'https://i.imgur.com/RMKhGws.png',
        'https://i.imgur.com/hbpg0wI.png',
        'https://i.imgur.com/mQKYg92.png'
      ]
    },
    { 
      title: 'Myrian Advogada', 
      category: 'Branding & Autoridade', 
      image: 'https://i.imgur.com/8NrFwfh.jpeg', 
      size: 'small',
      challenge: 'Transformar a linguagem jurídica complexa em conteúdo acessível para atrair clientes digitais sem ferir o código de ética.',
      solution: 'Estratégia de conteúdo educacional (topo de funil) com design sóbrio mas moderno, posicionando a advogada como autoridade acessível.',
      results: 'Posicionamento claro de marca e aumento na procura via direct/WhatsApp.',
      gallery: [
        'https://i.imgur.com/l3WHIjS.png',
        'https://i.imgur.com/IF5W0Vj.png',
        'https://i.imgur.com/bCNKFHV.png',
        'https://i.imgur.com/xYL5ifn.png',
        'https://i.imgur.com/8304SGb.png'
      ]
    },
    { 
      title: 'CR Tech', 
      category: 'Product & Visual', 
      image: 'https://i.imgur.com/FO37ANW.jpeg', 
      size: 'small',
      challenge: 'Destacar produtos eletrônicos commoditizados através de uma percepção de valor superior.',
      solution: 'Fotografia de produto e design de posts focados em "feature benefit" (benefício do recurso), criando desejo através de visuais high-end.',
      results: 'Melhoria na percepção de valor e ticket médio.',
      gallery: [
         'https://i.imgur.com/5lWDxI9.png',
         'https://i.imgur.com/91jKGs7.png',
         'https://i.imgur.com/uvQsveO.png',
         'https://i.imgur.com/C79xqMP.png',
         'https://i.imgur.com/DPrnSJw.png'
      ]
    },
    { 
      title: 'Campanhas Sazonais', 
      category: 'Campanhas & Lançamentos', 
      image: 'https://i.imgur.com/GZDxo4O.jpeg', 
      size: 'small',
      challenge: 'Maximizar vendas em datas críticas (Dia da Mulher, Outubro Rosa) fugindo do lugar comum.',
      solution: 'Campanhas humanizadas que conectam valores da marca com a causa, gerando compartilhamento orgânico e engajamento.',
      results: 'Recorde de engajamento em datas comemorativas.',
      gallery: [
        'https://i.imgur.com/2rtHRYE.png',
        ['https://i.imgur.com/owsos8j.png', 'https://i.imgur.com/trgMCej.png'],
        ['https://i.imgur.com/iketFVz.png', 'https://i.imgur.com/4eqCcq9.png']
      ]
    },
    { 
      title: 'Video Maker', 
      category: 'Retenção & Formatos', 
      image: 'https://i.imgur.com/BebV9QY.jpeg', 
      size: 'small',
      challenge: 'Aumentar o tempo de retenção nos conteúdos de vídeo (Reels/TikTok).',
      solution: 'Implementação de legendas dinâmicas, ganchos (hooks) nos primeiros 3 segundos e roteiros focados em gatilhos mentais.',
      results: 'Aumento significativo no alcance orgânico via algoritmo.',
      gallery: [
        'https://res.cloudinary.com/dybjzud8t/video/upload/f_auto,q_auto/v1768620768/IMG_1183_i3wzzd.mp4',
        'https://res.cloudinary.com/dybjzud8t/video/upload/f_auto,q_auto/v1768620938/84F32662-4262-464D-854E-DE0EED0FB958_m6on9x.mp4',
        'https://res.cloudinary.com/dybjzud8t/video/upload/f_auto,q_auto/v1768620957/8541FCE6-FF33-4A4D-9CC0-679F9B0714E4_1_gkiczv.mp4',
        'https://res.cloudinary.com/dybjzud8t/video/upload/f_auto,q_auto/v1768621008/09410AF8-8C3B-453D-8F1D-43809EED89F7_bavlys.mp4',
        'https://res.cloudinary.com/dybjzud8t/video/upload/f_auto,q_auto/v1768620933/3A4553DD-7AAF-4DDE-9497-846B5FDB2F46_rwt7yx.mp4'
      ]
    },
  ];

  return (
    <section id="work" className="py-32 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Projetos <span className="text-yellow-500">Selecionados</span></h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              Uma seleção de trabalhos onde estratégia e execução se encontram para gerar valor real.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[300px]">
          {projects.map((project, index) => (
            <FadeIn key={index} delay={index * 100} className={`w-full ${project.size === 'large' ? 'md:col-span-2 md:row-span-2 h-[300px] md:h-full' : 'h-[300px] md:h-full'}`}>
              <ProjectCard 
                {...project} 
                onClick={() => setSelectedProject(project)}
              />
            </FadeIn>
          ))}
        </div>
      </div>
      
      {/* Render Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
});

const Services = memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const services = [
    { 
      title: 'Estratégia & Branding', 
      description: 'Posicionamento de marca, definição de tom de voz e planejamento estratégico para crescimento.', 
      icon: <Target />,
      tools: ['Miro', 'SEMrush']
    },
    { 
      title: 'Social Media & Conteúdo', 
      description: 'Gestão completa de ecossistema digital com foco em retenção e construção de comunidade.', 
      icon: <Instagram />,
      tools: ['Notion', 'Meta Business Suite']
    },
    { 
      title: 'Performance (Tráfego)', 
      description: 'Gestão de anúncios (Facebook/Instagram Ads) orientada a ROI e aquisição de leads.', 
      icon: <TrendingUp />,
      tools: ['Meta Ads', 'Tiktok Ads']
    },
    { 
      title: 'Criação Visual', 
      description: 'Design e edição de vídeo como ferramentas de conversão, não apenas estética.', 
      icon: <Play />,
      tools: ['Capcut', 'Veo 3']
    },
    { 
      title: 'Análise de Dados + Automação', 
      description: 'Implementação de dashboards e processos automatizados para ganho de escala.', 
      icon: <BarChart3 />,
      tools: ['Power BI', 'Looker Studio', 'Make']
    },
    { 
      title: 'Inteligência Artificial', 
      description: 'Integração de soluções de IA para otimização de copy, atendimento e insights criativos.', 
      icon: <BrainCircuit />,
      tools: ['Google Studio', 'Gamma', 'ElevenLabs']
    },
  ];

  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-900/10 rounded-full blur-[120px]"></div>

      <div className="container mx-auto px-6 mb-12 relative z-20">
        <FadeIn className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Minha Expertise</h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto rounded-full"></div>
        </FadeIn>
      </div>

      <FadeIn delay={200} className="w-full relative z-10">
        
        {/* DESKTOP VIEW - Infinite Scroll */}
        <div className="hidden md:block relative overflow-hidden w-full">
           {/* Fade Edges for smooth infinite look */}
           <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
           <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>

           {/* Infinite Track */}
           <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
              {/* Duplicate the array to ensure seamless looping */}
              {[...services, ...services, ...services].map((service, i) => (
                <div key={i} className="w-[340px] mx-3 flex-shrink-0">
                  <div className="group p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-yellow-500/50 hover:bg-neutral-900 transition-all duration-300 h-[280px] flex flex-col justify-start relative">
                      <div className="text-yellow-500 mb-4 group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 leading-tight">{service.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-auto">{service.description}</p>
                      
                      {/* Tools List */}
                      <div className="mt-4 pt-4 border-t border-neutral-800 flex flex-wrap gap-2">
                        {service.tools.map((tool, idx) => (
                           <span key={idx} className="text-xs text-neutral-500 flex items-center gap-1.5 font-medium">
                             <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> {tool}
                           </span>
                        ))}
                      </div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* MOBILE VIEW - Accordion */}
        <div className="md:hidden flex flex-col gap-3 px-2">
            {services.map((service, index) => (
                <div 
                  key={index} 
                  className={`border rounded-2xl bg-neutral-900/50 overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-yellow-500/50 bg-neutral-900' : 'border-neutral-800'}`}
                >
                   <button
                     onClick={() => toggleAccordion(index)}
                     className="flex justify-between items-center w-full p-5 text-left focus:outline-none"
                   >
                      <div className="flex items-center gap-3">
                         <div className={`text-yellow-500 transition-transform duration-300 ${openIndex === index ? 'scale-110' : 'scale-100 opacity-70'}`}>
                             {/* Cloning element to adjust size if needed, or render directly */}
                             {React.cloneElement(service.icon as any, { width: 20, height: 20 })}
                         </div>
                         <span className={`font-bold text-lg transition-colors duration-300 ${openIndex === index ? 'text-white' : 'text-gray-300'}`}>
                            {service.title}
                         </span>
                      </div>
                      <div className={`text-neutral-500 bg-neutral-800 rounded-full p-1 transition-all duration-300 transform ${openIndex === index ? 'rotate-45 bg-yellow-500 text-black' : 'rotate-0'}`}>
                         <Plus />
                      </div>
                   </button>
                   
                   <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="p-5 pt-0">
                          <p className="text-gray-400 text-sm leading-relaxed border-t border-neutral-800 pt-4 mb-4">
                              {service.description}
                          </p>
                          {/* Tools List Mobile */}
                          <div className="flex flex-wrap gap-2">
                            {service.tools.map((tool, idx) => (
                               <span key={idx} className="text-xs text-neutral-400 bg-neutral-800 px-2 py-1 rounded border border-neutral-700 flex items-center gap-1.5">
                                 <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> {tool}
                               </span>
                            ))}
                          </div>
                      </div>
                   </div>
                </div>
            ))}
        </div>

      </FadeIn>
    </section>
  );
});

const Education = memo(() => {
    const courses = [
        { name: "Gestão de Tráfego Avançado", school: "Especialização em Ads" },
        { name: "Branding e Posicionamento", school: "Estratégia de Marca" },
        { name: "Copywriting para Vendas", school: "Marketing Direto" },
        { name: "Edição e Video Mobile", school: "Produção Visual" }
    ];

    return (
        <section className="py-20 bg-neutral-950 border-t border-neutral-900">
            <div className="container mx-auto px-6">
                 <div className="flex flex-col md:flex-row gap-12 items-start">
                     <div className="md:w-1/3">
                        <FadeIn>
                             <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Book className="text-yellow-500" /> Formação Contínua
                             </h3>
                             <p className="text-gray-400 text-sm">
                                O mercado digital muda todo dia. Minha formação é baseada em quem está no campo de batalha.
                             </p>
                        </FadeIn>
                     </div>
                     <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {courses.map((course, i) => (
                            <FadeIn key={i} delay={i * 50}>
                                <div className="p-4 border border-neutral-800 rounded bg-neutral-900/30 flex justify-between items-center">
                                    <span className="font-medium text-white">{course.name}</span>
                                    <span className="text-xs text-gray-500 uppercase">{course.school}</span>
                                </div>
                            </FadeIn>
                        ))}
                     </div>
                 </div>
            </div>
        </section>
    );
});

const Testimonials = memo(() => {
  const testimonials = [
    {
      handle: "@myriianmartins.adv",
      name: "Myrian Martins",
      role: "Freelancer / Entregas Pontuais",
      text: "O Caio foi muito cuidadoso nas entregas e atento aos detalhes. Mesmo sendo um trabalho pontual, conseguiu alinhar design e comunicação ao posicionamento da marca, trazendo mais clareza e profissionalismo para o digital."
    },
    {
      handle: "@emporio.dovinho",
      name: "Empório do Vinho",
      role: "Branding + Resultado",
      text: "O Caio teve sensibilidade para entender o negócio e transformar isso em comunicação estratégica. Cada entrega conversava com o branding e com o objetivo comercial. É raro encontrar alguém que una visão criativa com entendimento real de negócio."
    },
    {
      handle: "@nandamodabr",
      name: "Nanda Moda",
      role: "Mentoria + Design",
      text: "O Caio não só entregou design, ele mudou minha forma de enxergar o marketing do negócio. A mentoria trouxe clareza estratégica, organização e visão de longo prazo. Passei a entender o porquê de cada decisão, o que impactou diretamente na forma como a marca se posiciona hoje."
    }
  ];

  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden border-t border-neutral-900">
       {/* Background Decor */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-900/5 rounded-full blur-[120px] pointer-events-none"></div>

       <div className="container mx-auto px-6 relative z-10">
         <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Feedback & <span className="text-yellow-500">Resultados</span></h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto rounded-full"></div>
         </FadeIn>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {testimonials.map((item, i) => (
             <FadeIn key={i} delay={i * 100} className="h-full">
               <div className="h-full p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-yellow-500/30 transition-all duration-300 flex flex-col relative group">
                  <div className="absolute top-6 right-8 text-neutral-800 group-hover:text-yellow-500/20 transition-colors">
                     <Quote size={40} />
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6 flex-grow relative z-10">"{item.text}"</p>
                  <div className="border-t border-neutral-800 pt-6 mt-auto">
                     <p className="text-yellow-500 font-bold text-sm mb-1">{item.handle}</p>
                     <p className="text-white font-medium text-xs">{item.name}</p>
                     <p className="text-neutral-500 text-[10px] uppercase tracking-wider mt-1">{item.role}</p>
                  </div>
               </div>
             </FadeIn>
           ))}
         </div>
       </div>
    </section>
  );
});

const Contact = memo(() => {
  return (
    <section id="contact" className="py-32 bg-black border-t border-neutral-900">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
            Crescimento não <br/> <span className="gradient-text bg-gradient-to-r from-yellow-200 to-yellow-600">acontece por acaso.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Venho da vivência real de negócios. Foi ali que aprendi a fazer o marketing acontecer de verdade — unindo estratégia, social media, criação e testes com foco em crescimento.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="http://wa.me/73981488186" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-yellow-500 transition-colors w-full md:w-auto shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Vamos conversar?
            </a>
          </div>
        </FadeIn>

        <div className="mt-20 flex justify-center gap-6">
          <a 
            href="https://www.instagram.com/caiomull/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-gray-400 hover:text-black hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300"
          >
            <Instagram />
          </a>
          <a 
            href="https://www.linkedin.com/in/caiomull/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-gray-400 hover:text-black hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300"
          >
            <Linkedin />
          </a>
          <a 
            href="https://wa.me/73981488186" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-gray-400 hover:text-black hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300"
          >
            <WhatsApp />
          </a>
        </div>
      </div>
    </section>
  );
});

const Footer = memo(() => {
  return (
    <footer className="py-8 bg-black border-t border-neutral-900 text-center text-neutral-600 text-xs flex flex-col items-center gap-2">
      <p>&copy; 2026 caiomull. Growth & Marketing.</p>
      <p>Performance através do design.</p>
    </footer>
  );
});

const App = () => {
  return (
    <div className="antialiased bg-black text-white selection:bg-yellow-500 selection:text-black">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Timeline />
      <Work />
      <Services />
      <Education />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);