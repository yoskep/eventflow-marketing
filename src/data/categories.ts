export interface BlogCategory {
  slug: string;
  nameHe: string;
  description: string;
}

export const categories: BlogCategory[] = [
  { slug: 'supplier-tips', nameHe: 'טיפים לספקים', description: 'עצות ומדריכים לספקי אירועים' },
  { slug: 'supplier-marketing', nameHe: 'שיווק לספקים', description: 'מדריכי שיווק לספקי אירועים' },
  { slug: 'couples-guide', nameHe: 'מדריך לזוגות', description: 'טיפים וארגון חתונה לזוגות' },
  { slug: 'industry-trends', nameHe: 'מגמות בתעשייה', description: 'נתונים ומגמות בתעשיית האירועים' },
  { slug: 'general', nameHe: 'כללי', description: 'מאמרים כלליים' },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return categories.find((c) => c.slug === slug);
}
