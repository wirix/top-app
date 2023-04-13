import React, { forwardRef, useRef, useState, ForwardedRef } from 'react';
import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { devlOfNum, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';
import cn from 'classnames';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const scrollToReview = () => {
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const variants = {
    visible: {
      // выход меню
      opacity: 1,
      height: 'auto',
    },
    hidden: { height: 0, opacity: 0 }
  };

  return (
    <div className={className} ref={ref} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
            tabIndex={0}
          />
        </div>
        <div className={styles.title} tabIndex={0}>{product.title}</div>
        <div className={styles.price} tabIndex={0}>
          <span>
            <span
              // он произносит рубли тк по дереву они ниже aria-label='цена'
              //  aria-label='цена'
              className='visualHidden'
            >цена</span>
            {priceRu(product.price)}
          </span>
          {product.oldPrice &&
            <Tag className={styles.oldPrice} color='green' tabIndex={0}>
              <span className='visualHidden'>скидка</span>
              {priceRu(product.price - product.oldPrice)}
            </Tag>}
        </div>
        <div className={styles.credit} tabIndex={0}>
          <span className='visualHidden'>
            кредит
          </span>
          {priceRu(product.credit)} /
          <span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
          <span className='visualHidden'>
            рейтинг + {product.reviewAvg ?? product.initialRating}
          </span>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>{product.categories.map(c => <Tag className={styles.category} key={c} color={'ghost'} tabIndex={0}>{c}</Tag>)}</div>
        <div className={styles.priceTitle} aria-hidden={true}>цена</div>
        <div className={styles.creditTitle} aria-hidden={true}>кредит</div>
        <div className={styles.rateTitle}><a href={'#ref'} onClick={() => scrollToReview()}>{product.reviewCount} {devlOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
        <Divider className={styles.hr} />
        <div className={styles.description} tabIndex={0}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map(c => (
            <div className={styles.characteristics} key={c.name} >
              <span className={styles.characteristicsName} tabIndex={0}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue} tabIndex={0}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && <div className={styles.advantages}>
            <div className={styles.advTitle} tabIndex={0} >Преимущества</div>
            <div tabIndex={0}>{product.advantages}</div>
          </div>}
          {product.disadvantages && <div className={styles.disadvantages}>
            <div className={styles.advTitle} tabIndex={0}>Недостатки</div>
            <div tabIndex={0}>{product.disadvantages}</div>
          </div>}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance={'primary'} tabIndex={0}>Узнать подробнее</Button>
          <Button
            appearance={'ghost'}
            arrow={isReviewOpened ? 'down' : 'right'}
            className={styles.reviewButton}
            onClick={() => setIsReviewOpened(prev => !prev)}
            aria-expanded={isReviewOpened}
          >Читать отзывы</Button>
        </div>
      </Card>
      <motion.div
        variants={variants}
        initial={isReviewOpened ? 'visible' : 'hidden'}
        animate={isReviewOpened ? 'visible' : 'hidden'}
        className={cn(styles.reviews)}
      >
        <Card color='blue' ref={reviewRef} tabIndex={isReviewOpened ? 0 : -1} >
          {product.reviews.map(r => (
            <div key={r._id} >
              <Review review={r} />
              <Divider />
            </div>
          ))}
          <ReviewForm productId={product._id} isOpened={isReviewOpened} />
        </Card>
      </motion.div>
    </div>
  );
}));