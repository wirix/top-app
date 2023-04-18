import React, { useState } from 'react';
import { SearchProps } from './Search.props';
import cn from 'classnames';
import styles from './Search.module.css';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import GlassIcon from './glass.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const onChangeInput = (e: string): void => {
    setSearch(e);
  };

  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    });
  };

  const hangleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      goToSearch();
    }
  };

  return (
    <form className={cn(className, styles.search)} role='search' {...props} >
      <Input
        className={styles.input}
        placeholder={'Поиск...'}
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeInput(e.currentTarget.value)}
        onKeyDown={(event) => hangleKeyDown(event)}
      />
      <Button
        appearance={'primary'}
        className={styles.button}
        onClick={goToSearch}
        aria-label='Искать по сайту'
      >
        <GlassIcon />
      </Button>
    </form>
  );
};