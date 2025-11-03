import React from 'react';

export default function ToggleSwitch({ checked, onChange }) {
  
  return (
    <label className="flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only"
        checked={checked} 
        onChange={onChange}
      />

      <div 
        className={`block w-10 h-6 rounded-full transition-colors duration-200 ${
          checked ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      ></div>
      
      <div 
        className={`dot absolute left-1 top-1 w-4 h-4 rounded-full bg-white 
                    shadow-md transition-transform duration-200 ease-in-out
                    ${checked ? 'transform translate-x-4' : ''}`}
      ></div>
    </label>
  );
}