import { ButtonProps } from "./Button.props";
import styles from './Button.module.css';
import cn from 'classnames';
import Image from "next/image";

export const Button = ({ appearance, children, arrow = 'none', className, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost',
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && <span className={cn(styles.arrow, {
        [styles.down]: arrow === 'down',
        [styles.right]: arrow === 'right',
      })}>
        <Image width={10} height={10} src={'/arrow.svg'} alt='' />
      </span>}
    </button>
  );
};