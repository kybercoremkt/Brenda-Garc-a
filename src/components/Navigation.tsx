import { useState, useEffect } from 'react';
import { ShieldCheck, Menu, X, Landmark, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  onScrollToForm: () => void;
  onScrollToFaq: () => void;
}

export default function Navigation({ onScrollToForm, onScrollToFaq }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-4'
          : 'bg-white/50 backdrop-blur-md border-b border-slate-100/30 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand */}
          <div className="flex items-center space-x-2.5">
            <img 
              src="https://i.ibb.co/kVnQXs3b/Union-1.png" 
              alt="Logo Brenda García" 
              className="h-10 w-auto object-contain" 
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={onScrollToForm}
              className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue-600 font-display font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200 shadow-sm border border-brand-yellow-hover/30 hover:-translate-y-0.5 cursor-pointer"
            >
              Agendar Asesoría
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-1.5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200"
          >
            <div className="px-4 pt-3 pb-6 space-y-4 shadow-inner">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToForm();
                }}
                className="w-full bg-brand-yellow hover:bg-brand-yellow-hover text-brand-blue-600 border border-brand-yellow-hover/35 font-display font-bold px-4 py-3 rounded-full text-center text-sm transition-all shadow-md block cursor-pointer"
              >
                Agendar Asesoría
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
