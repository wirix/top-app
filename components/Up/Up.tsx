import React, { useEffect } from 'react';
import cn from 'classnames';
import styles from './Up.module.css';
import { useScrollY } from '../../hooks/useScrollY';
import { useAnimation, motion } from 'framer-motion';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const Up = (): JSX.Element => {
  const y = useScrollY();
  const controls = useAnimation();
  useEffect(() => {
      controls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      className={cn(styles.up)}
      
      animate={controls}
      // тк кнопка изначально видна
      initial={{opacity: 0}}
    >
      <ButtonIcon icon='up' appearance='primary' aria-label='вверх' onClick={scrollToTop}/>
    </motion.div>
  );
};