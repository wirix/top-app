import React from 'react';
import { SortEnum, SortProps } from './Sort.props';
import cn from 'classnames';
import styles from './Sort.module.css';

export const Sort = ({sort, setSort, className, ...props }: SortProps): JSX.Element => {

  return (
    <div className={cn(className, styles.sort)} {...props}>
      <span
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort === SortEnum.Rating
        })}
      >
        По рейтингу
      </span>
      <span
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort === SortEnum.Price
        })}
      >
        По цене
      </span>
    </div>
  );
};