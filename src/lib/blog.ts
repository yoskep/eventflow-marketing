import { supabase } from './supabase';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  status: string;
  category: string;
  tags: string[];
  reading_time: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    if (error) {
      console.warn('Failed to fetch blog posts:', error.message);
      return [];
    }
    return (data ?? []) as BlogPost[];
  } catch (e) {
    console.warn('Failed to fetch blog posts:', e instanceof Error ? e.message : e);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  if (error) return null;
  return data as BlogPost;
}

export async function getRelatedPosts(category: string, excludeSlug: string, limit = 3): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, cover_image_url, reading_time, published_at, category')
    .eq('status', 'published')
    .eq('category', category)
    .neq('slug', excludeSlug)
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) return [];
  return (data ?? []) as BlogPost[];
}

export function extractHeadings(html: string): { id: string; text: string; level: number }[] {
  const regex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    const id = text.toLowerCase().replace(/[^\w\s\u0590-\u05FF]/g, '').replace(/\s+/g, '-').slice(0, 60);
    headings.push({ id, text, level: parseInt(match[1]) });
  }
  return headings;
}

export function addHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (_, level, attrs, content) => {
    const text = content.replace(/<[^>]+>/g, '').trim();
    const id = text.toLowerCase().replace(/[^\w\s\u0590-\u05FF]/g, '').replace(/\s+/g, '-').slice(0, 60);
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
  });
}

export function formatDateHe(dateString: string): string {
  return new Date(dateString).toLocaleDateString('he-IL', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}
