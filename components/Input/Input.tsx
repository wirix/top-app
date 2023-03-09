import React, { useState } from 'react';
import { InputProps } from './Input.props';
import cn from 'classnames';
import styles from './Input.module.css';

export const Input = ({ className, ...props }: InputProps): JSX.Element => {
  const [currentValue, setCurrentValue] = useState<string>('');
  const onChangeInput = (e: string): void => {
    setCurrentValue(e);
  };
  return (
    <input
      value={currentValue}
      className={cn(className, styles.input)}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e.currentTarget.value)}
      {...props} />
  );
};