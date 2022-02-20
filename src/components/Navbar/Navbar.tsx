import React, { useState } from 'react';
/*
local files
*/
import { NavbarProps } from './types';
import styles from './Navbar.module.scss';

const Navbar = ({ onAddToFirstStage }: NavbarProps) => {
  const [inputValue, setValue] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddToFirstStage(inputValue);
    //reset input
    setValue('');
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'enter') {
      onSubmit(e);
    }
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <h1>🎯 Board</h1>
        <div className={styles.container}>
          <form onSubmit={onSubmit} onKeyPress={onKeyPress}>
            <input
              value={inputValue}
              onChange={(e) => setValue(e.target.value)}
              className={styles.input}
              placeholder="Type your task here..."
            />
            <button type="submit" className={styles.btn}>
              + Add New Task
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
