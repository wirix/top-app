import { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useState } from 'react';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import styles from './Rating.module.css';
import StarIcon from './star.svg';

export const Rating = forwardRef(({ error, rating, setRating, isEditable = false, className, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
    contructRating(rating);
  }, [rating]);

  const contructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((_: JSX.Element, i: number) => (
      <span
        className={cn(styles.star, className, {
          [styles.filled]: i < currentRating,
          [styles.editable]: isEditable,
        })}
        onMouseEnter={() => changeDisplay(i + 1)}
        onMouseLeave={() => changeDisplay(rating)}
        onClick={() => onClick(i + 1)}
      >
        <StarIcon
          tabIndex={isEditable ? 0 : -1}
          onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
        />
      </span>

    ));
    setRatingArray(updatedArray);
  };

  const changeDisplay = (i: number) => {
    if (!isEditable) {
      return;
    }
    contructRating(i);
  };

  const onClick = (i: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating(i);
  };

  const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
    if (e.code != 'Space' || !setRating) {
      return;
    }
    setRating(i);
  };

  return (
    <div className={styles.ratingWrapper}>
      <div ref={ref} className={cn({
        [styles.error]: error
      })} {...props}>
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
      </div>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>

  );
});