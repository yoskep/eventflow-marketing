export interface FAQItem {
  question: string;
  answer: string;
}

export const genericFaqs: FAQItem[] = [
  {
    question: 'כמה עולה {service} ב{city}?',
    answer:
      'מחירי {service} ב{city} משתנים בהתאם לניסיון, חבילת השירות ומועד האירוע. מומלץ לבקש הצעות מחיר ממספר ספקים ולהשוות בין השירותים המוצעים.',
  },
  {
    question: 'איך בוחרים {service} ב{city}?',
    answer:
      'בבחירת {service} ב{city} חשוב לבדוק תיק עבודות, לקרוא ביקורות של לקוחות קודמים, לוודא זמינות בתאריך האירוע ולפגוש את הספק פנים אל פנים לפני ההחלטה.',
  },
  {
    question: 'מתי כדאי להזמין {service} ב{city}?',
    answer:
      'מומלץ להזמין {service} ב{city} מוקדם ככל האפשר, לפחות 6-12 חודשים לפני האירוע. בעונת החתונות הספקים הטובים מתמלאים מהר, ולכן הזמנה מוקדמת תבטיח את הספק המועדף עליכם.',
  },
  {
    question: 'האם {service} ב{city} נוסעים לאירועים מחוץ לעיר?',
    answer:
      'רוב ספקי {service} ב{city} מוכנים לנסוע לאירועים באזורים הסמוכים, לרוב תוך תוספת תשלום על נסיעות. מומלץ לברר זאת ישירות עם כל ספק.',
  },
];

export function interpolateFaqs(
  faqs: FAQItem[],
  serviceNameHe: string,
  cityNameHe: string,
): FAQItem[] {
  return faqs.map((faq) => ({
    question: faq.question.replace(/\{service\}/g, serviceNameHe).replace(/\{city\}/g, cityNameHe),
    answer: faq.answer.replace(/\{service\}/g, serviceNameHe).replace(/\{city\}/g, cityNameHe),
  }));
}
