import React from 'react';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import styles from './Rating.module.css';
import Star from './star.svg';
const Rating = (): JSX.Element => {
  return (
    <p>
      <Star />
    </p>
  );
};

export default Rating;