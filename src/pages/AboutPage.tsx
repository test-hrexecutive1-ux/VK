import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/Button';
import { useRouter } from '@/context/RouterContext';
import { aboutImage, aboutImage2, editorialImage, signatureImage } from '@/data/mockData';

export function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="The House of VK"
        title="A Tradition of Quiet Excellence"
        subtitle="For three generations, VK Jewellers has crafted fine jewellery for a private clientele who value discretion, craftsmanship, and timeless design."
      />

      {/* Image */}
      <div className="container-lux pb-20">
        <div className="aspect-[16/9] overflow-hidden bg-ivory-200">
          <img src={aboutImage} alt="The VK atelier" className="w-full h-full object-cover" loading="lazy" />
        </div>
      </div>

      {/* Story */}
      <div className="container-lux-narrow py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow mb-6">Our Beginning</p>
            <h2 className="font-serif text-3xl text-charcoal-800 mb-6">Founded on Craft</h2>
            <div className="space-y-4 text-charcoal-500 font-light leading-relaxed">
              <p>VK Jewellers began as a small atelier in the by-lanes of old Mumbai, where the founder spent his days drawing compositions by hand and his evenings refining each piece under lamplight.</p>
              <p>What started as a private commission house — making pieces for a handful of families — grew quietly over three generations into one of the most trusted names in fine jewellery, without ever losing the intimacy of its origins.</p>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-6">Our Philosophy</p>
            <h2 className="font-serif text-3xl text-charcoal-800 mb-6">Restraint Over Excess</h2>
            <div className="space-y-4 text-charcoal-500 font-light leading-relaxed">
              <p>We believe that true luxury is not loud. It is the weight of a well-made clasp, the way a stone catches light from every angle, the confidence of a piece that will be worn for decades rather than seasons.</p>
              <p>Every piece is composed, not assembled. Every detail is considered. Nothing is added that does not serve the whole.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Craft section */}
      <div className="bg-ivory-200 py-24 lg:py-32">
        <div className="container-lux">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="aspect-[4/5] overflow-hidden bg-ivory-300">
              <img src={aboutImage2} alt="Craftsmanship" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <p className="eyebrow mb-6">The Atelier</p>
              <h2 className="font-serif text-display-sm text-charcoal-800 mb-8">Made by Hand.</h2>
              <div className="space-y-4 text-charcoal-500 font-light leading-relaxed">
                <p>Each piece passes through the hands of master artisans — designers, goldsmiths, stone-setters, and polishers — whose combined experience spans over a century.</p>
                <p>We work slowly. A single piece may take weeks to refine, and we would rather make fewer pieces well than many pieces quickly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="container-lux py-24 lg:py-32">
        <div className="text-center mb-16">
          <p className="eyebrow mb-4">What We Stand For</p>
          <h2 className="font-serif text-display-sm text-charcoal-800">Our Principles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: 'Discretion', text: 'We serve a private clientele. What happens between VK and our clients stays between us.' },
            { title: 'Craftsmanship', text: 'Every piece is made by hand, by artisans whose work has been refined over generations.' },
            { title: 'Timelessness', text: 'We design pieces to be worn for decades, not seasons. Trends do not enter the atelier.' },
          ].map((value, i) => (
            <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <h3 className="font-serif text-2xl text-charcoal-800 mb-4">{value.title}</h3>
              <p className="text-charcoal-500 font-light leading-relaxed">{value.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={signatureImage} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-charcoal-900/70" />
        </div>
        <div className="relative container-lux-narrow text-center">
          <h2 className="font-serif text-ivory-100 text-display-sm text-balance">Experience the Collection.</h2>
          <p className="mt-6 text-lg text-ivory-200/70 font-light max-w-xl mx-auto">Arrange a private viewing at one of our showrooms in Mumbai, Delhi, or Bengaluru.</p>
          <div className="mt-10">
            <Button variant="primary" size="lg" onClick={() => navigate({ name: 'contact' })} className="bg-ivory-100 text-charcoal-900 hover:bg-ivory-200 border-ivory-100">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
