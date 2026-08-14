import { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronDown, Crown } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useApp } from '@/context/AppContext';
import { categories } from '@/data/mockData';

export function Header() {
  const { navigate, route } = useRouter();
  const { role, userName, logout } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const isHome = route.name === 'home';
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navItems = [
    { label: 'Collections', hasMenu: true },
    { label: 'Jewellery', action: () => navigate({ name: 'categories' }) },
    { label: 'About', action: () => navigate({ name: 'about' }) },
    { label: 'Contact', action: () => navigate({ name: 'contact' }) },
  ];

  const handleNav = (item: typeof navItems[number]) => {
    if (item.hasMenu) {
      setCollectionsOpen(!collectionsOpen);
    } else {
      item.action?.();
      setMobileOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-lux ${
          transparent
            ? 'bg-transparent'
            : 'bg-ivory-100/95 backdrop-blur-md border-b border-ivory-300'
        }`}
      >
        <div className="container-lux">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => navigate({ name: 'home' })}
              className="flex items-center gap-2 group"
            >
              <span className={`font-serif text-2xl tracking-wide transition-colors duration-500 ${transparent ? 'text-ivory-100' : 'text-charcoal-900'}`}>
                VK
              </span>
              <span className={`font-sans text-[0.6rem] uppercase tracking-[0.3em] transition-colors duration-500 ${transparent ? 'text-ivory-200/80' : 'text-charcoal-400'}`}>
                Jewellers
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasMenu && setCollectionsOpen(true)}
                  onMouseLeave={() => item.hasMenu && setCollectionsOpen(false)}
                >
                  <button
                    onClick={() => handleNav(item)}
                    className={`flex items-center gap-1 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 link-underline ${
                      transparent ? 'text-ivory-100' : 'text-charcoal-700 hover:text-charcoal-900'
                    }`}
                  >
                    {item.label}
                    {item.hasMenu && <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform duration-300 ${collectionsOpen ? 'rotate-180' : ''}`} />}
                  </button>

                  {/* Collections Mega Menu */}
                  {item.hasMenu && collectionsOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                      <div className="bg-ivory-100 border border-ivory-300 shadow-elevated p-8 w-[640px] animate-slide-down">
                        <div className="grid grid-cols-3 gap-6">
                          {categories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                navigate({ name: 'category', slug: cat.slug });
                                setCollectionsOpen(false);
                              }}
                              className="group text-left"
                            >
                              <div className="aspect-square overflow-hidden bg-ivory-200 mb-3">
                                <img
                                  src={cat.image}
                                  alt={cat.name}
                                  className="w-full h-full object-cover transition-transform duration-700 ease-lux group-hover:scale-105"
                                />
                              </div>
                              <p className="font-serif text-lg text-charcoal-800 group-hover:text-champagne-700 transition-colors">{cat.name}</p>
                              <p className="text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 mt-0.5">{cat.tagline}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-5">
              <button
                className={`transition-colors duration-300 ${transparent ? 'text-ivory-100 hover:text-champagne-200' : 'text-charcoal-600 hover:text-charcoal-900'}`}
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              {role === 'guest' ? (
                <button
                  onClick={() => navigate({ name: 'login' })}
                  className={`hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 link-underline ${
                    transparent ? 'text-ivory-100' : 'text-charcoal-700'
                  }`}
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={() => navigate({ name: 'premium-access' })}
                  className={`hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
                    transparent ? 'text-ivory-100' : 'text-charcoal-700'
                  }`}
                >
                  {role === 'premium' && <Crown size={14} strokeWidth={1.5} className="text-champagne-600" />}
                  <span>{role === 'premium' ? 'Premium' : 'Account'}</span>
                  {userName && <span className="text-charcoal-400 normal-case tracking-normal font-light hidden xl:inline">— {userName}</span>}
                </button>
              )}

              {role !== 'guest' && (
                <button
                  onClick={logout}
                  className={`hidden md:block text-[0.65rem] uppercase tracking-[0.15em] font-light transition-colors duration-300 ${
                    transparent ? 'text-ivory-200/70 hover:text-ivory-100' : 'text-charcoal-300 hover:text-charcoal-600'
                  }`}
                >
                  Sign out
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(true)}
                className={`lg:hidden transition-colors ${transparent ? 'text-ivory-100' : 'text-charcoal-800'}`}
                aria-label="Menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal-900/40 backdrop-blur-sm animate-fade-in-only" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-ivory-100 shadow-elevated animate-slide-down overflow-y-auto">
            <div className="flex items-center justify-between px-6 h-20 border-b border-ivory-300">
              <span className="font-serif text-2xl text-charcoal-900">VK</span>
              <button onClick={() => setMobileOpen(false)} className="text-charcoal-600">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <nav className="px-6 py-8 flex flex-col gap-1">
              <p className="eyebrow mb-4">Menu</p>
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item)}
                  className="text-left py-3 font-serif text-2xl text-charcoal-800 hover:text-champagne-700 transition-colors"
                >
                  {item.label}
                </button>
              ))}

              {collectionsOpen && (
                <div className="pl-4 border-l border-ivory-300 my-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        navigate({ name: 'category', slug: cat.slug });
                        setMobileOpen(false);
                      }}
                      className="block py-2 text-sm text-charcoal-500 hover:text-champagne-700 transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-ivory-300">
                {role === 'guest' ? (
                  <button
                    onClick={() => {
                      navigate({ name: 'login' });
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-charcoal-700"
                  >
                    <Lock size={16} strokeWidth={1.5} />
                    Login
                  </button>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        navigate({ name: 'premium-access' });
                        setMobileOpen(false);
                      }}
                      className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-charcoal-700"
                    >
                      {role === 'premium' && <Crown size={16} strokeWidth={1.5} className="text-champagne-600" />}
                      {userName || 'Account'}
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="block text-xs uppercase tracking-[0.15em] text-charcoal-400"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
