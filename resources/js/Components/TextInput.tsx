// js/Components/TextInput.tsx
import classNames from 'classnames';
import React, { forwardRef } from 'react';

const TextInput = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={classNames(
      'border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm transition',
      props.className,
    )}
  />
));

export default TextInput;
