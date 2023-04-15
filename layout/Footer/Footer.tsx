import React from 'react';
import cn from 'classnames';
import styles from './Footer.module.css';
import { FooterProps } from './Footer.props';
import { format } from 'date-fns';
import Image from 'next/image';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div>
        OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены
      </div>
      <a href="#" target='_blank'>Пользовательское соглашение</a>
      <a href="#" target='_blank'>Политика конфиденциальности</a>
      <div><Image src="https://mc.yandex.ru/informer/93232786/3_1_FFFFFFFF_EFEFEFFF_0_pageviews" width={88} height={31} alt="метрика" /></div>
    </footer>
  );
};