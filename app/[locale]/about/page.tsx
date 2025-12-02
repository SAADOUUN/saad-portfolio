import { unstable_setRequestLocale } from 'next-intl/server';
import About from '@/components/About';

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <div className="relative pt-20">
      <div className="fixed inset-0 cyber-grid opacity-5 pointer-events-none z-0" />
      <About />
    </div>
  );
}

