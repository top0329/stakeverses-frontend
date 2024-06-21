import React, { FC } from 'react';
import { IButton, IButtonClass } from '@/types';

const Button: FC<IButton> = ({
  text,
  variant = 'primary',
  className,
  disabled,
  onClick,
}) => {
  const styling: IButtonClass | undefined = buttonClasses.find((classes) => {
    return classes.name === variant;
  });
  return (
    <button
      className={`btn ${styling?.style} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

const buttonClasses: Array<IButtonClass> = [
  {
    name: 'primary',
    style: 'bg-gradient-to-r from-[#192F3A] to-[#06C2C4] hover:from-[#192F3A] hover:to-[#192F3A]',
  },
  {
    name: 'outline',
    style: 'bg-transparent !text-black !border-black dark:!text-white dark:!border-white',
  },
];

export default Button;
