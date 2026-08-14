import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { categories } from '@/data/mockData';

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-charcoal-900 text-ivory-200">
      <div className="container-lux py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-serif text-3xl text-ivory-100">VK</span>
              <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-ivory-300/60">Jewellers</span>
            </div>
            <p className="text-sm font-light text-ivory-300/70 leading-relaxed max-w-xs">
              A private jewellery catalogue of finely crafted pieces, composed for the discerning collector.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="eyebrow text-ivory-300/50 mb-5">Explore</p>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigate({ name: 'category', slug: cat.slug })}
                    className="text-sm font-light text-ivory-300/80 hover:text-champagne-200 transition-colors duration-300"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="eyebrow text-ivory-300/50 mb-5">Maison</p>
            <ul className="space-y-3">
              <li><button onClick={() => navigate({ name: 'about' })} className="text-sm font-light text-ivory-300/80 hover:text-champagne-200 transition-colors duration-300">About</button></li>
              <li><button onClick={() => navigate({ name: 'contact' })} className="text-sm font-light text-ivory-300/80 hover:text-champagne-200 transition-colors duration-300">Contact</button></li>
              <li><button onClick={() => navigate({ name: 'privacy' })} className="text-sm font-light text-ivory-300/80 hover:text-champagne-200 transition-colors duration-300">Privacy Policy</button></li>
              <li><button onClick={() => navigate({ name: 'terms' })} className="text-sm font-light text-ivory-300/80 hover:text-champagne-200 transition-colors duration-300">Terms</button></li>
              <li><button onClick={() => navigate({ name: 'admin-login' })} className="text-sm font-light text-ivory-300/50 hover:text-champagne-200 transition-colors duration-300">Admin Portal</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow text-ivory-300/50 mb-5">Private Client Services</p>
            <p className="text-sm font-light text-ivory-300/70 mb-4">
              By appointment only.<br />
              Mumbai · Delhi · Bengaluru
            </p>
            <div className="flex items-center gap-4 mt-5">
              {[Instagram, Facebook, Twitter, Mail].map((Icon, i) => (
                <button
                  key={i}
                  className="text-ivory-300/60 hover:text-champagne-200 transition-colors duration-300"
                  aria-label="Social link"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory-300/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory-300/40 font-light">© 2025 VK Jewellers. All rights reserved.</p>
          <p className="text-xs text-ivory-300/40 font-light tracking-wide">Crafted with intention.</p>
        </div>
      </div>
    </footer>
  );
}
