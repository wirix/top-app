import { useContext } from 'react';
import cn from 'classnames';
import styles from './Menu.module.css';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.inteface';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();
  // для родителей
  const variants = {
    // пробел по тайтлом
    visible: {
      marginBottom: 20,
      transition: {
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
    hidden: { opacity: 0, height: 0 }
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map(m => {
      if (m._id.secondCategory === secondCategory) {
        m.isOpened = !m.isOpened;
      }
      return m;
    }));
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map(m => (
          <div key={m.route}>
            <Link href={`/${m.route}`}>
              <div className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: m.id === firstCategory
              })}>
                {m.icon}
                <span>{m.name}</span>
              </div>
            </Link>

            {m.id === firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map(m => {
          if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            m.isOpened = true;
          }
          return (
            <div key={m._id.secondCategory}>
              <div
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
                tabIndex={0}
                onKeyDown={(e: KeyboardEvent) => {
                  if (e.code === 'Enter' || e.code === 'Space') {
                    // e.preventDefault(); убирает дефолтное поведение (в нашем случае пробел)
                    e.preventDefault(); 
                    openSecondLevel(m._id.secondCategory);
                  }
                }}
              >{m._id.secondCategory}</div>
              <motion.div
                layout
                variants={variants}
                initial={m.isOpened ? 'visible' : 'hidden'}
                animate={m.isOpened ? 'visible' : 'hidden'}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                {/* m.isOpened ?? false означает если m.isOpened undef то false как стандартное значение*/}
              </motion.div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return (
      pages.map(p => (
        <motion.div key={p._id} variants={variantsChildren} >
          <Link
            href={`/${route}/${p.alias}`}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath,
              // [styles.thirdLevelExtra]: checkLenWord(p.category)
            })}
            tabIndex={isOpened ? 0 : -1}
          >
            {p.category}
          </Link>
        </motion.div>

      ))
    );
  };

  return (
    <div className={styles.menu}>
      {buildFirstLevel()}
    </div>
  );
};