import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
// пишем с маленькой тк мы будем это использовать как строковый параметр
import up from './up.svg';
import close from './close.svg';
import menu from './menu.svg';

export const icons = {
  up,
  close,
  menu,
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  appearance: 'primary' | 'white';
  icon: IconName;
}