import * as React from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import styles from './numeric-input.module.css';
export function NumericInput({
  onIncrement,
  onDecrement,
  className,
  disabled,
  ...props
}: any) {
  return (
    <div className={styles.wrap}>
      <input
        disabled={disabled}
        type="numeric"
        className={[styles.input, className].join(' ')}
        {...props}
      />
      <button
        disabled={disabled}
        className={styles.increment}
        aria-label="Increment"
        onClick={onIncrement}
      >
        <span>+</span>
        <MdArrowDropUp />
      </button>
      <button
        disabled={disabled}
        className={styles.decrement}
        aria-label="Decrement"
        onClick={onDecrement}
      >
        <span>-</span>
        <MdArrowDropDown />
      </button>
    </div>
  );
}
