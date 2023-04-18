import React from 'react';
import { Htag } from '../components';
import { withLayout } from '../layout/Layout';

export function Error404(): JSX.Element {
  return (
    <>
      <Htag tag='h1'>ошибка 404</Htag>
    </>
  );
}

export default withLayout(Error404);
