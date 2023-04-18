import Head from 'next/head';
// import Router from 'next/router';
// import ym from 'react-yandex-metrika';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

// Router.events.on('routeChangeComplete', (url: string) => {
//   if (typeof window !== 'undefined') {
//     ym('hit', url);
//   }
// });

export default function App({ Component, pageProps, router }: AppProps): JSX.Element {
  return <>
    <Head>
      {/* <link rel="preconnect" href="https://mc.yandex.com" /> */}
      {/* эта мета будет формироваться на этапе пререндера тк здесь ниже только идет компонент*/}
      <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
      {/* какой язык сайта */}
      <meta property='og:local' content='ru_RU' />
    </Head>
    {/* <YMInitializer
      accounts={[93232786]}
      options={{ webvisor: true, defer: true }}
    /> */}
    <Component {...pageProps} />
  </>;
}