import { unstable_setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <div className="relative">
      <div className="fixed inset-0 cyber-grid opacity-3 pointer-events-none z-0" />
      <Hero />
    </div>
  );
}
