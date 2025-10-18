// js/Components/Checkbox.tsx
import classNames from 'classnames';
import React, { forwardRef } from 'react';

const Checkbox = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props, ref) => (
  <input
    {...props}
    type="checkbox"
    ref={ref}
    className={classNames(
      'rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition',
      props.className,
    )}
  />
));

export default Checkbox;
