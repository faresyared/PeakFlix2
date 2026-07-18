import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({ children, params: { lang } }: { children: React.ReactNode; params: { lang: string } }) {
  let messages;
  try {
    messages = (await import(`../../messages/${lang}.json`)).default;
  } catch (error) {
    notFound();
  }

  const isRtl = lang === 'ar';

  return (
    <html lang={lang} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className={`${isRtl ? 'font-arabic' : ''} bg-black text-white`}>
        <NextIntlClientProvider locale={lang} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
