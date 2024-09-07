interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
