import React from 'react';

export default function Button({ children, onClick, type = 'button', variant = 'primary', size = 'base', className = '' }) {
  
  let colorClasses = '';
  switch (variant) {
    case 'success':
      colorClasses = 'bg-green-500 hover:bg-green-600 focus:ring-green-500';
      break;
    case 'danger':
      colorClasses = 'bg-red-500 hover:bg-red-600 focus:ring-red-500';
      break;
    case 'primary':
    default:
      colorClasses = 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500';
      break;
  }
  
  const sizeClasses = size === 'sm' 
    ? 'text-sm py-1 px-2'
    : 'text-base py-2 px-4';

  const combinedClasses = `text-white font-semibold rounded-lg shadow-md transition-colors 
                           duration-150 ease-in-out focus:outline-none focus:ring-2 
                           focus:ring-opacity-50
                           ${colorClasses} ${sizeClasses} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
    >
      {children}
    </button>
  );
}