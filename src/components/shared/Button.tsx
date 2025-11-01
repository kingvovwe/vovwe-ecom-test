import Link from 'next/link';
import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

interface ButtonBaseProps {
  variant?: 'primary' | 'outline';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = ButtonBaseProps & 
  (ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>);


const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  href,
  className = '',
  children,
  ...props
}) => {
  // Base classes that apply to all variants
  const baseClasses =
    'flex items-center justify-center w-full h-12 px-6 py-3 font-semibold text-base rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant-specific classes
  const variantClasses = {
    primary:
      'bg-gray-900 text-white hover:bg-gray-700 active:bg-gray-950',
    outline:
      'bg-white text-gray-900 border border-gray-900 hover:bg-gray-100 active:bg-gray-200',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  // <Link> if `href` is provided
  if (href) {
    return (
      <Link href={href} className={combinedClasses} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  // default
  return (
    <button className={combinedClasses} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};

export default Button;
