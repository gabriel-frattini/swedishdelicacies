import * as React from 'react';
import styles from './toast.module.css';

export function Toast({ show, duration = 1000, ...props }: any) {
  const [visible, setVisible] = React.useState(show);
  const [animation, setAnimation] = React.useState('');

  React.useEffect(() => {
    if (show) {
      setVisible(true);
    }
    const timeout = setTimeout(() => {
      setAnimation('');
      setVisible(show);
    }, duration);
    setAnimation(show ? styles.showing : styles.hiding);
    return () => clearTimeout(timeout);
  }, [show, duration]);

  return visible ? (
    <div
      className={[styles.toastWrapper, animation].join(' ')}
      {...props}
    />
  ) : null;
}
