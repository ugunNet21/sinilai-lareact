// js/Components/InputLabel.tsx
import classNames from 'classnames';
import React from 'react';

interface InputLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
  value?: string;
}

export default function InputLabel({ 
  htmlFor, 
  children, 
  className = '',
  value,
  ...props 
}: InputLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        'block text-sm font-medium text-gray-700',
        className
      )}
      {...props}
    >
      {value ? value : children}
    </label>
  );
}