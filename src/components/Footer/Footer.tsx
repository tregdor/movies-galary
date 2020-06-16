import React from 'react';

import { Logo } from '..';

import style from './Footer.module.scss';

export const Footer: React.FC = () => (
  <footer className={style.footer}>
    <Logo />
  </footer>
);
