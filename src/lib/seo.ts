const SITE_URL = import.meta.env.SITE_URL || 'https://eventflow.co.il';
const SITE_NAME = 'EventFlow';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/icon-512.png`,
    description: 'מערכת CRM לספקי שירותי אירועים בישראל',
    foundingDate: '2025',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Hebrew', 'English'],
    },
    // sameAs: ['https://facebook.com/eventflow', ...] — add when social profiles exist
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'מערכת CRM לספקי שירותי אירועים בישראל',
    inLanguage: 'he-IL',
    // potentialAction: SearchAction — add when search page exists
  };
}

export function softwareAppSchema(offers?: { name: string; price: string; currency: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'מערכת CRM לניהול עסק אירועים — לידים, הצעות מחיר, חוזים, תשלומים, גלריות וביקורות',
    offers: offers?.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      price: o.price,
      priceCurrency: o.currency,
    })) ?? [{
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'ILS',
    }],
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function webPageSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: { '@type': 'WebSite', url: SITE_URL },
    inLanguage: 'he-IL',
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function localBusinessSchema(supplier: {
  business_name: string;
  description?: string | null;
  logo_url?: string | null;
  city?: string | null;
  phone?: string | null;
  website_url?: string | null;
  avgRating?: number;
  reviewCount?: number;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: supplier.business_name,
    description: supplier.description || undefined,
    image: supplier.logo_url || undefined,
    telephone: supplier.phone || undefined,
    url: supplier.website_url || undefined,
  };
  if (supplier.city) {
    schema.address = {
      '@type': 'PostalAddress',
      addressLocality: supplier.city,
      addressCountry: 'IL',
    };
  }
  if (supplier.avgRating && supplier.reviewCount && supplier.reviewCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: supplier.avgRating,
      reviewCount: supplier.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }
  return schema;
}

export function serviceSchema(serviceName: string, description: string, areaServed: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description,
    areaServed: { '@type': 'Place', name: areaServed },
    provider: { '@type': 'Organization', name: 'EventFlow', url: SITE_URL },
  };
}

