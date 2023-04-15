import Head from 'next/head';
import ym from 'react-yandex-metrika';
import { YMInitializer } from 'react-yandex-metrika';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {
  if (typeof window !== 'undefined') {
    router.events.on('routeChangeComplete', (url: string) => {
      ym('hit', url);
    });
  }
  return <>
    <Head>
      <link rel="preconnect" href="https://mc.yandex.com" />
      {/* эта мета будет формироваться на этапе пререндера тк здесь ниже только идет компонент*/}
      <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
      {/* какой язык сайта */}
      <meta property='og:local' content='ru_RU' />
    </Head>
    <YMInitializer
      accounts={[93232786]}
      options={{ webvisor: true, defer: true }}
    />
    <Component {...pageProps} />
  </>;
}