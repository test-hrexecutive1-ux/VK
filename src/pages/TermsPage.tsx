import { PageHeader } from '@/components/layout/PageHeader';

export function TermsPage() {
  const sections = [
    { title: 'Acceptance of Terms', body: 'By accessing the VK Jewellers catalogue, you agree to these Terms of Use. If you do not agree, please do not use the website or our services.' },
    { title: 'Catalogue Use', body: 'VK Jewellers provides a private jewellery catalogue for viewing and enquiry purposes. The catalogue does not constitute an offer to sell. All pieces are available by private enquiry, and availability is subject to confirmation.' },
    { title: 'Access Levels', body: 'Access to the catalogue is tiered: public pieces are visible to all visitors; members-only pieces require registration; and private collection pieces are reserved for authorised premium clients. VK Jewellers reserves the right to grant, modify, or revoke access at its discretion.' },
    { title: 'Intellectual Property', body: 'All content on this website — including images, designs, text, and composition — is the property of VK Jewellers and protected by applicable intellectual property laws. You may not reproduce, distribute, or use any content without prior written consent.' },
    { title: 'Enquiries', body: 'Submitting an enquiry does not constitute a purchase commitment. Our client services team will respond to enquiries personally and in good faith. Pricing and availability are discussed privately between VK Jewellers and the enquiring client.' },
    { title: 'Limitation of Liability', body: 'VK Jewellers is not liable for any indirect, incidental, or consequential damages arising from the use of this website. We strive to display accurate imagery and information but do not warrant that the catalogue is free from errors.' },
    { title: 'Governing Law', body: 'These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai.' },
  ];

  return (
    <div className="min-h-screen">
      <PageHeader eyebrow="Legal" title="Terms of Use" subtitle="Last updated: 1 December 2025" />
      <div className="container-lux-narrow pb-24 lg:pb-32 space-y-12">
        {sections.map((section, i) => (
          <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <h2 className="font-serif text-2xl text-charcoal-800 mb-4">{section.title}</h2>
            <p className="text-charcoal-500 font-light leading-relaxed">{section.body}</p>
          </div>
        ))}
        <div className="pt-8 border-t border-ivory-300">
          <p className="text-sm text-charcoal-400 font-light">
            For questions about these Terms, contact us at private.clients@vkjewellers.com
          </p>
        </div>
      </div>
    </div>
  );
}
