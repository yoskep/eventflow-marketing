import { useState } from 'react';

export default function NewsletterSignup({ supabaseUrl, supabaseKey }: { supabaseUrl: string; supabaseKey: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ email, source: 'blog' }),
      });
      if (res.ok || res.status === 201 || res.status === 409) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center" dir="rtl">
        <p className="text-green-800 font-bold">תודה! נרשמת בהצלחה לניוזלטר</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1a2744] rounded-xl p-8 text-center" dir="rtl">
      <h3 className="text-xl font-bold text-white mb-2">הישארו מעודכנים</h3>
      <p className="text-gray-300 text-sm mb-4">קבלו טיפים ומדריכים חדשים ישירות למייל — בלי ספאם</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="הכניסו את המייל שלכם"
          className="flex-1 px-4 py-3 rounded-lg text-sm bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-white/50"
          dir="ltr"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-3 rounded-lg text-sm font-bold bg-gradient-to-r from-[#c8a97e] to-[#e8d5b5] text-[#1a2744] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'הרשמה'}
        </button>
      </form>
      {status === 'error' && <p className="text-red-300 text-sm mt-2">שגיאה. נסו שוב.</p>}
    </div>
  );
}
