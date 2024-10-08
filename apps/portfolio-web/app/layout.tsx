import './global.css';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { Questrial, M_PLUS_Rounded_1c } from 'next/font/google';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { MaxContentWidth } from '../components/max-content-width';
import { PageContainer } from '../components/page-container';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

const fontBody = Questrial({
  subsets: ['latin'],
  variable: '--font-body',
  weight: '400',
});

const fontHeading = M_PLUS_Rounded_1c({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['300', '400', '500', '700', '900'],
});

export const metadata = {
  description:
    'Portfolio of Andrew Grewell, a full stack developer and designer and entrepreneur. Explore projects showcasing expertise in TypesScript, React, Node.js, and more.',
  title: 'Andrew Grewell - Full Stack Developer, Designer, and Entrepreneur',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={clsx(
        fontHeading.variable,
        fontBody.variable,
        'h-full scroll-smooth bg-white antialiased',
      )}
    >
      <body className="bg-slate-50">
        <Header />
        <MaxContentWidth className="">
          <PageContainer>
            <main>{children}</main>
          </PageContainer>
        </MaxContentWidth>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
