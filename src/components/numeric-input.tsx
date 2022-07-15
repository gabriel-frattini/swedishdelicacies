import * as React from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import styles from './numeric-input.module.css';

interface CompProps {
  onIncrement: () => void;
  onDecrement: () => void;
  className?: any;
  disabled?: boolean;
  quantity: number;
  onChangeQuantity: (e: any) => void;
  min: string;
  max: string;
}

export function NumericInput({
  onIncrement,
  onDecrement,
  className,
  disabled,
  quantity,
  onChangeQuantity,
  min,
  max,
}: CompProps) {
  return (
    <div className={styles.wrap}>
      <input
        disabled={disabled}
        type="numeric"
        className={[styles.input, className].join(' ')}
        value={quantity}
        onChange={onChangeQuantity}
        max={max}
        min={min}
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
