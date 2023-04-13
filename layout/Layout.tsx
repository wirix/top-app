import { FunctionComponent, useState, KeyboardEvent, useRef } from 'react';
import { LayoutProps } from './Layout.props';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Sidebar } from './Sidebar/Sidebar';
import styles from './Layout.module.css';
import { AppContextProvider, IAppContext } from '../context/app.context';
import { Up } from '../components';
import cn from 'classnames';

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code === 'Enter' || key.code === 'Space') {
      bodyRef.current?.focus();
      key.preventDefault();
    }
    setIsSkipLinkDisplayed(false);
  };
  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkipLinkDisplayed(true)}
        tabIndex={1}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLinkDisplayed
        })}
        onKeyDown={skipContentAction}
      >Сразу к содержанию</a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main className={styles.body} ref={bodyRef} tabIndex={0} role='main'>
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

// type T = Record<string, unknown> evaluates to { [x: string]: unknown; }

// & IAppContext дает всем страницам доступ к контексту
export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T) {
    return (
      // нужно передать стартовые значения, тк AppContextProvider имеет props
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};