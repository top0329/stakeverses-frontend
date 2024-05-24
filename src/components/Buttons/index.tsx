import React, { FC } from 'react';
import { IButtonClass } from '@/types';

export interface Props {
  text: string;
  variant?: 'primary' | 'outline';
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<Props> = ({
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
    style: 'bg-gradient-to-r from-[#192F3A] to-[#06C2C4]',
  },
  {
    name: 'outline',
    style: 'bg-transparent',
  },
];

export default Button;
