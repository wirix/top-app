import React, { ForwardedRef, forwardRef } from 'react';
import { CardProps } from './Card.props';
import cn from 'classnames';
import styles from './Card.module.css';

export const Card = forwardRef(({ children, color = 'white', className, ...props }: CardProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  return (
    <div className={cn(styles.card, className, {
      [styles.blue]: color === 'blue',
      [styles.white]: color === 'white'
    })} ref={ref} {...props}>
      {children}
    </div>
  );
});