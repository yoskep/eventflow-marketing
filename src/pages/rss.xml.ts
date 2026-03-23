import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPublishedPosts } from '@/lib/blog';

export async function GET(context: APIContext) {
  const posts = await getAllPublishedPosts();
  return rss({
    title: 'בלוג EventFlow — מדריכים לספקי אירועים',
    description: 'מאמרים, מדריכים וטיפים לספקי שירותי אירועים בישראל',
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.title,
      pubDate: new Date(post.published_at || post.created_at),
      description: post.excerpt || '',
      link: `/blog/${post.slug}`,
      categories: post.category ? [post.category] : [],
    })),
    customData: '<language>he</language>',
  });
}
