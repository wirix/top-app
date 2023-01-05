import React from 'react';
import { PProps } from './P.props';
import cn from 'classnames';
import styles from './P.module.css';

export const P = ({ children, fontSize = 'm', className, ...props }: PProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.mediumFont]: fontSize === 'm',
        [styles.smallFont]: fontSize === 's',
        [styles.bigFont]: fontSize === 'b',
      })}
      {...props}
    >
      {children}
    </p>
  );
};