export interface ServiceType {
  slug: string;
  dbType: string;
  nameHe: string;
  pluralHe: string;
  descriptionHe: string;
  metaKeywords: string[];
}

export const services: ServiceType[] = [
  {
    slug: 'photographer',
    dbType: 'photographer',
    nameHe: 'צלם',
    pluralHe: 'צלמים',
    descriptionHe: 'צלמי חתונות ואירועים מקצועיים',
    metaKeywords: ['צלם חתונות', 'צלם אירועים', 'צילום מקצועי'],
  },
  {
    slug: 'videographer',
    dbType: 'videographer',
    nameHe: 'צלם וידאו',
    pluralHe: 'צלמי וידאו',
    descriptionHe: 'צלמי וידאו לחתונות ואירועים',
    metaKeywords: ['צלם וידאו חתונה', 'וידאוגרף', 'סרטון חתונה'],
  },
  {
    slug: 'dj',
    dbType: 'dj',
    nameHe: 'דיג׳יי',
    pluralHe: 'דיג׳ייז',
    descriptionHe: 'דיג׳ייז לחתונות ומסיבות',
    metaKeywords: ['דיג׳יי לחתונה', 'DJ לאירוע', 'מוזיקה לחתונה'],
  },
  {
    slug: 'venue',
    dbType: 'venue',
    nameHe: 'אולם אירועים',
    pluralHe: 'אולמות אירועים',
    descriptionHe: 'אולמות וגני אירועים',
    metaKeywords: ['אולם חתונה', 'גן אירועים', 'מקום לחתונה'],
  },
  {
    slug: 'caterer',
    dbType: 'caterer',
    nameHe: 'קייטרינג',
    pluralHe: 'קייטרינג',
    descriptionHe: 'שירותי קייטרינג לאירועים',
    metaKeywords: ['קייטרינג לחתונה', 'אוכל לאירוע', 'שירותי הסעדה'],
  },
  {
    slug: 'planner',
    dbType: 'planner',
    nameHe: 'מתכנן אירועים',
    pluralHe: 'מתכנני אירועים',
    descriptionHe: 'מתכנני ומארגני חתונות ואירועים',
    metaKeywords: ['מתכנן חתונה', 'מארגן אירועים', 'רכז חתונה'],
  },
  {
    slug: 'florist',
    dbType: 'florist',
    nameHe: 'פרחים',
    pluralHe: 'עיצוב פרחים',
    descriptionHe: 'מעצבי פרחים לחתונות ואירועים',
    metaKeywords: ['פרחים לחתונה', 'עיצוב פרחוני', 'כלה ופרחים'],
  },
  {
    slug: 'musician',
    dbType: 'musician',
    nameHe: 'מוזיקאי',
    pluralHe: 'מוזיקאים',
    descriptionHe: 'מוזיקאים ולהקות לאירועים',
    metaKeywords: ['להקה לחתונה', 'מוזיקה חיה לאירוע', 'זמר לחתונה'],
  },
  {
    slug: 'entertainer',
    dbType: 'entertainer',
    nameHe: 'בידור',
    pluralHe: 'בידורנים',
    descriptionHe: 'אמני בידור לאירועים ולחתונות',
    metaKeywords: ['בידור לחתונה', 'אמן אירועים', 'שעשועים לאירוע'],
  },
  {
    slug: 'makeup',
    dbType: 'makeup',
    nameHe: 'איפור',
    pluralHe: 'מאפרות',
    descriptionHe: 'מאפרות מקצועיות לכלות ולאירועים',
    metaKeywords: ['מאפרת כלה', 'איפור לחתונה', 'מאפרת מקצועית'],
  },
  {
    slug: 'producer',
    dbType: 'producer',
    nameHe: 'הפקת אירועים',
    pluralHe: 'מפיקי אירועים',
    descriptionHe: 'מפיקי אירועים ומסיבות',
    metaKeywords: ['הפקת חתונה', 'מפיק אירועים', 'הפקה מלאה לאירוע'],
  },
  {
    slug: 'hair-stylist',
    dbType: 'hair_stylist',
    nameHe: 'עיצוב שיער',
    pluralHe: 'מעצבי שיער',
    descriptionHe: 'מעצבי שיער לכלות ולאירועים',
    metaKeywords: ['עיצוב שיער לחתונה', 'מעצב שיער כלה', 'תסרוקת כלה'],
  },
  {
    slug: 'event-designer',
    dbType: 'event_designer',
    nameHe: 'עיצוב אירועים',
    pluralHe: 'מעצבי אירועים',
    descriptionHe: 'מעצבי אירועים וחתונות',
    metaKeywords: ['עיצוב חתונה', 'מעצב אירועים', 'דקורציה לאירוע'],
  },
  {
    slug: 'officiant',
    dbType: 'officiant',
    nameHe: 'רב',
    pluralHe: 'רבנים ועורכי טקסים',
    descriptionHe: 'עורכי טקסים ורבנים לחתונות',
    metaKeywords: ['רב לחתונה', 'עורך טקס חתונה', 'חופה וקידושין'],
  },
  {
    slug: 'bar',
    dbType: 'bar',
    nameHe: 'בר',
    pluralHe: 'שירותי בר',
    descriptionHe: 'שירותי בר ומשקאות לאירועים',
    metaKeywords: ['בר לחתונה', 'שירותי בר לאירוע', 'ברמן לחתונה'],
  },
  {
    slug: 'invitations',
    dbType: 'invitations',
    nameHe: 'הזמנות',
    pluralHe: 'הזמנות לאירועים',
    descriptionHe: 'עיצוב והדפסת הזמנות לאירועים',
    metaKeywords: ['הזמנות לחתונה', 'עיצוב הזמנות', 'הדפסת הזמנות'],
  },
  {
    slug: 'attractions',
    dbType: 'attractions',
    nameHe: 'אטרקציות',
    pluralHe: 'אטרקציות לאירועים',
    descriptionHe: 'אטרקציות ופעילויות לאירועים',
    metaKeywords: ['אטרקציות לחתונה', 'פעילויות לאירוע', 'בידור לאורחים'],
  },
];

export const RESERVED_PATHS: string[] = [
  'blog',
  'biz',
  'cities',
  'about',
  'pricing',
  'privacy',
  'terms',
  'accessibility',
  'rss.xml',
];

export function getServiceBySlug(slug: string): ServiceType | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceByDbType(dbType: string): ServiceType | undefined {
  return services.find((s) => s.dbType === dbType);
}
