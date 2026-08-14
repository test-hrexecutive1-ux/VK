import { PageHeader } from '@/components/layout/PageHeader';

export function PrivacyPage() {
  const sections = [
    { title: 'Information We Collect', body: 'We collect information you provide directly to us — including your name, mobile number, email address, and company name when you register or enquire about a piece. We also collect information about how you interact with our catalogue, including which pieces you view and collections you open.' },
    { title: 'How We Use Your Information', body: 'We use your information to provide and improve our services, to communicate with you about pieces and collections, to process enquiries, and to curate personalised selections. We do not share, sell, or rent your information to third parties.' },
    { title: 'Data Security', body: 'We take reasonable measures to protect your personal information from unauthorised access, alteration, or disclosure. Access to your information is restricted to authorised personnel within VK Jewellers.' },
    { title: 'Cookies & Tracking', body: 'Our website may use cookies and similar technologies to enhance your browsing experience and understand how the catalogue is used. You may control cookies through your browser settings.' },
    { title: 'Your Rights', body: 'You may request access to, correction of, or deletion of your personal information at any time by contacting our client services team. You may also withdraw consent for marketing communications at any time.' },
    { title: 'Changes to This Policy', body: 'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on this page.' },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: 1 December 2025" />
      <div className="container-lux-narrow pb-24 lg:pb-32 space-y-12">
        {sections.map((section, i) => (
          <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <h2 className="font-serif text-2xl text-charcoal-800 mb-4">{section.title}</h2>
            <p className="text-charcoal-500 font-light leading-relaxed">{section.body}</p>
          </div>
        ))}
        <div className="pt-8 border-t border-ivory-300">
          <p className="text-sm text-charcoal-400 font-light">
            For questions about this policy, contact us at private.clients@vkjewellers.com
          </p>
        </div>
      </div>
    </div>
  );
}
