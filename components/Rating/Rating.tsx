import { ForwardedRef, forwardRef, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { RatingProps } from './Rating.props';
import cn from 'classnames';
import styles from './Rating.module.css';
import StarIcon from './star.svg';

export const Rating = forwardRef(({ tabIndex, error, rating, setRating, isEditable = false, className, ...props }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    contructRating(rating);
  }, [rating, tabIndex]);

  const computeFocus = (r: number, i: number): number => {
    if (!isEditable) {
      return -1;
    }
    if (!rating && i === 0) {
      return tabIndex ?? 0;
    }
    if (r === i + 1) {
      return tabIndex ?? 0;
    }
    return -1;
  };

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
        tabIndex={computeFocus(rating, i)}
        // условие вызова здесь не пишем, а внутри ф-ии, чтобы не изобретать велосипед
        onKeyDown={handleKey}
        ref={r => ratingArrayRef.current?.push(r)}
        role={isEditable ? 'slider' : ''}
        aria-valuenow={rating}
        aria-valuemin={1}
        aria-valuemax={5}
        aria-label={isEditable ? 'укажите рейтинг стрелками вверх или вниз' : 'рейтинг' + {rating}}
      >
        <StarIcon />
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

  const handleKey = (e: KeyboardEvent<SVGElement>) => {
    if (!isEditable || !setRating) {
      return;
    }
    if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
      // тк вначале rating undef устан нач знач
      if (!rating) {
        setRating(1);
      } else {
        e.preventDefault();
        setRating(rating < 5 ? rating + 1 : 5);
      }
      ratingArrayRef.current[rating]?.focus();
    }
    if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
      if (!rating) {
        setRating(1);
      } else {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
      }
      ratingArrayRef.current[rating - 2]?.focus();
    }
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