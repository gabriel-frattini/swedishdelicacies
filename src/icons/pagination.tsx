import React from 'react';

interface buttonProps {
  show: boolean;
  onPress: () => void;
  className: any;
}

export function NextButton({ show, onPress, ...props }: buttonProps) {
  if (!show) {
    return <div></div>;
  }
  return (
    <div {...props} onClick={onPress}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
        <path d="M8.025 22 6.25 20.225 14.475 12 6.25 3.775 8.025 2l10 10Z" />
      </svg>
    </div>
  );
}

export function PreviousButton({ show, onPress, ...props }: buttonProps) {
  if (!show) {
    return <div></div>;
  }
  return (
    <div {...props} onClick={onPress}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
        <path d="M10 22 0 12 10 2l1.775 1.775L3.55 12l8.225 8.225Z" />
      </svg>
    </div>
  );
}
