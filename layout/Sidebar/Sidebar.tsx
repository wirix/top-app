import React from 'react';
import cn from 'classnames';
import styles from './Sidebar.module.css';
import { SidebarProps } from './Sidebar.props';
import { Menu } from '../Menu/Menu';

export const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
  return (
    <div {...props}>
      <Menu />
    </div>
  );
};