import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

export default function App() {
  const id = useSelector(state => state.auth.id);
  let signed;
  if (id === null) {
    signed = false;
  } else {
    signed = true;
  }

  const Routes = createRouter(signed);

  return <Routes />;
}
