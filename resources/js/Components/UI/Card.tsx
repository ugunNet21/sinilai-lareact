// js/Components/UI/Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition ${className}`}
    >
      {children}
    </div>
  );
}
