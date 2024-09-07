import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
}

export default function Card({ className, children, ...rest }: CardProps) {
  return (
    <div
      className={`p-6 bg-white border border-gray-200 rounded-lg shadow ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
