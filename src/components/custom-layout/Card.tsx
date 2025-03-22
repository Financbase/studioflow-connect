
import React from "react";

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={`${className || ""}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
