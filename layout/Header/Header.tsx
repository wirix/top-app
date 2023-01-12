import React from 'react';
import cn from 'classnames';
import styles from './Header.module.css';
import { HeaderProps } from './Header.props';

export const Header = ({ ...props }: HeaderProps): JSX.Element => {
  return (
    <div {...props}>
      Header
    </div>
  );
};