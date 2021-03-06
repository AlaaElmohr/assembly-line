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

    if (inputValue.trim()) {
      onAddToFirstStage(inputValue.trim());
      //reset input
      setValue('');
    }
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
          <form onSubmit={onSubmit}>
            <input
              data-cy="input"
              value={inputValue}
              onKeyPress={onKeyPress}
              onChange={(e) => setValue(e.target.value)}
              className={styles.input}
              placeholder="Type your task here..."
            />
            <button type="submit" data-cy="submit" className={styles.btn}>
              + Add New Task
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
