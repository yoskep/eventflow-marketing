import { supabase } from './supabase';

export interface PublicSupplier {
  id: string;
  business_name: string;
  business_type: string;
  city: string | null;
  slug: string;
  description: string | null;
  logo_url: string | null;
  phone: string | null;
  website_url: string | null;
  subscription_tier: string;
  avgRating: number;
  reviewCount: number;
}

// Fetch all public suppliers with ratings — called ONCE at build time
export async function getAllPublicSuppliers(): Promise<PublicSupplier[]> {
  try {
    const { data: suppliers, error } = await supabase
      .from('suppliers')
      .select('id, business_name, business_type, city, slug, description, logo_url, phone, website_url, subscription_tier')
      .eq('onboarding_completed', true)
      .not('slug', 'is', null);

    if (error) {
      console.warn('Failed to fetch suppliers:', error.message);
      return [];
    }

    const { data: reviews } = await supabase
      .from('reviews')
      .select('business_id, rating')
      .eq('is_public', true);

    const ratingMap = new Map<string, { sum: number; count: number }>();
    (reviews ?? []).forEach((r: { business_id: string; rating: number }) => {
      const existing = ratingMap.get(r.business_id) ?? { sum: 0, count: 0 };
      existing.sum += r.rating;
      existing.count += 1;
      ratingMap.set(r.business_id, existing);
    });

    return (suppliers ?? []).map((s) => {
      const rating = ratingMap.get(s.id);
      return {
        ...s,
        avgRating: rating ? Math.round((rating.sum / rating.count) * 10) / 10 : 0,
        reviewCount: rating?.count ?? 0,
      };
    });
  } catch (e) {
    console.warn('Failed to fetch suppliers:', e instanceof Error ? e.message : e);
    return [];
  }
}

export function filterByService(suppliers: PublicSupplier[], dbType: string): PublicSupplier[] {
  return suppliers.filter((s) => s.business_type === dbType);
}

export function filterByCity(suppliers: PublicSupplier[], cityNameHe: string): PublicSupplier[] {
  return suppliers.filter((s) => s.city?.includes(cityNameHe));
}

export function sortSuppliers(suppliers: PublicSupplier[]): PublicSupplier[] {
  const tierOrder: Record<string, number> = { enterprise: 0, pro: 1, basic: 2, free: 3 };
  return [...suppliers].sort((a, b) => {
    const tierDiff = (tierOrder[a.subscription_tier] ?? 3) - (tierOrder[b.subscription_tier] ?? 3);
    if (tierDiff !== 0) return tierDiff;
    if (b.avgRating !== a.avgRating) return b.avgRating - a.avgRating;
    return b.reviewCount - a.reviewCount;
  });
}
