import React from 'react';
import { TagProps } from './Tag.props';
import cn from 'classnames';
import styles from './Tag.module.css';

export const Tag = ({ children, size = 's', className, color = 'ghost', href, ...props }: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.s]: size === 'm',
        [styles.m]: size === 's',
        [styles.ghost]: color === 'ghost',
        [styles.red]: color === 'red',
        [styles.gray]: color === 'gray',
        [styles.green]: color === 'green',
        [styles.primary]: color === 'primary',
      })}
      {...props}
    >
      {
        href
          ? <a href={href}>{children}</a>
          : <>{children}</>
      }
    </div>
  );
};