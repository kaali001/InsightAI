// src/components/ui/Card.tsx
import React from "react";

type CardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ title, children, className = "" }: CardProps) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 ${className}`}>
      {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;

