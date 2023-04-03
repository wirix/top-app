import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';
import { ButtonIcon } from '../../components';
import { motion, useReducedMotion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useRouter } from 'next/router';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState(false);
  const shouldReducedMotion = useReducedMotion();
  const router = useRouter();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        // вид анимации
        stiffness: 20
      }
    },
    closed: {
      opacity: shouldReducedMotion ? 1 : 0,
      x: '100%',
    }
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      LOGO
      <ButtonIcon appearance='white' icon='menu' onClick={() => { setIsOpened(true); }} />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={'closed'}
        animate={isOpened ? 'opened' : 'closed'}
      >
        <Sidebar />
        <ButtonIcon className={styles.menuClose} appearance='white' icon='close' onClick={() => { setIsOpened(false); }} />
      </motion.div>
    </header>
  );
};