import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const next = useCallback(() => setActiveIndex((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, next, prev]);

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        {/* Thumbnails */}
        <div className="flex lg:flex-col gap-3 lg:w-24">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative shrink-0 w-20 lg:w-full aspect-[3/4] overflow-hidden bg-ivory-200 transition-all duration-500 ${
                activeIndex === i ? 'ring-1 ring-charcoal-800 ring-offset-2 ring-offset-ivory-100' : 'opacity-50 hover:opacity-80'
              }`}
            >
              <img src={img} alt={`${alt} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="flex-1 relative group">
          <div className="relative aspect-[3/4] overflow-hidden bg-ivory-200">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-lux ${
                  activeIndex === i ? 'opacity-100' : 'opacity-0'
                }`}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}

            {/* Nav arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-ivory-100/0 hover:bg-ivory-100/80 text-charcoal-800 p-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-ivory-100/0 hover:bg-ivory-100/80 text-charcoal-800 p-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
              aria-label="Next image"
            >
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>

            {/* Fullscreen */}
            <button
              onClick={() => setLightboxOpen(true)}
              className="absolute top-4 right-4 bg-ivory-100/0 hover:bg-ivory-100/80 text-charcoal-800 p-2 opacity-0 group-hover:opacity-100 transition-all duration-500"
              aria-label="Open fullscreen"
            >
              <Maximize2 size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* Counter */}
          <p className="mt-3 text-xs text-charcoal-400 font-light tracking-wider">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[55] bg-charcoal-900/95 flex items-center justify-center animate-fade-in-only">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-ivory-200 hover:text-ivory-100 transition-colors"
            aria-label="Close fullscreen"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
          <button onClick={prev} className="absolute left-6 text-ivory-200/70 hover:text-ivory-100 transition-colors p-2" aria-label="Previous">
            <ChevronLeft size={32} strokeWidth={1.5} />
          </button>
          <button onClick={next} className="absolute right-6 text-ivory-200/70 hover:text-ivory-100 transition-colors p-2" aria-label="Next">
            <ChevronRight size={32} strokeWidth={1.5} />
          </button>
          <div className="max-w-5xl max-h-[85vh] px-16">
            <img src={images[activeIndex]} alt={alt} className="max-w-full max-h-[85vh] object-contain animate-scale-in" />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory-200/60 text-xs tracking-wider font-light">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
