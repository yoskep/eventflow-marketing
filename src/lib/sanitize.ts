import sanitizeHtml from 'sanitize-html';

export function sanitize(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'p', 'br', 'strong', 'em', 'u', 's',
      'a', 'img', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'hr',
      'div', 'span',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel', 'title'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      '*': ['class'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
  });
}
