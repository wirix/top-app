import { useContext, useState } from 'react';
import cn from 'classnames';
import styles from './Menu.module.css';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.inteface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion, useReducedMotion } from 'framer-motion';

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();
  const shouldReducerMotion = useReducedMotion();
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  // для родителей
  const variants = {
    // пробел по тайтлом
    visible: {
      marginBottom: 20,
      transition: shouldReducerMotion ? {} : {
        // сначала анимация для родителя, а не потом
        when: 'beforeChildren',
        // через сколько секунд появится следующий элемент
        staggerChildren: 0.1
      }
    },
    hidden: { marginBottom: 0 }
  };
  // для детей
  const variantsChildren = {
    // появление списка
    visible: {
      opacity: 1,
      height: 20,
    },
    // убрать список
    hidden: { opacity: shouldReducerMotion ? 1 : 0, height: 0 }
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map(m => {
      if (m._id.secondCategory === secondCategory) {
        setAnnounce(m.isOpened ? 'closed' : 'opened');
        m.isOpened = !m.isOpened;
      }
      return m;
    }));
  };

  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstLevelList}>
        {firstLevelMenu.map(m => (
          <li key={m.route} aria-expanded={m.id === firstCategory}>
            <Link href={`/${m.route}`}>
              <div className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: m.id === firstCategory
              })}>
                {m.icon}
                <span>{m.name}</span>
              </div>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map(m => {
          if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            m.isOpened = true;
          }
          return (
            <li key={m._id.secondCategory}>
              <button
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
                tabIndex={0}
                // не аннонсируется поэтому создаем state
                aria-expanded={m.isOpened}
                onKeyDown={(e) => {
                  if (e.code === 'Enter' || e.code === 'Space') {
                    // e.preventDefault(); убирает дефолтное поведение (в нашем случае пробел)
                    e.preventDefault();
                    openSecondLevel(m._id.secondCategory);
                  }
                }}
              >{m._id.secondCategory}</button>
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? 'visible' : 'hidden'}
                animate={m.isOpened ? 'visible' : 'hidden'}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                {/* m.isOpened ?? false означает если m.isOpened undef то false как стандартное значение*/}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return (
      pages.map(p => (
        <motion.li key={p._id} variants={variantsChildren} >
          <Link
            href={`/${route}/${p.alias}`}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath,
              // [styles.thirdLevelExtra]: checkLenWord(p.category)
            })}
            tabIndex={isOpened ? 0 : -1}
            aria-current={`/${route}/${p.alias}` === router.asPath ? 'page' : false}
          >
            {p.category}
          </Link>
        </motion.li>
      ))
    );
  };

  return (
    <nav className={styles.menu} role='navigation'>
      {/* тк в роле log, screen reader начинает озвучивать при появлении spana его содержание */}
      {announce && <span role='log' className={'visualHidden'}>{announce === 'opened' ? 'развёрнуто' : 'свёрнуто'}</span>}
      {buildFirstLevel()}
    </nav>
  );
};