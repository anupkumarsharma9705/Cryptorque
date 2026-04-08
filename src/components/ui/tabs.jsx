// import React from 'react';
// export function Tabs({ children, value, onValueChange, className='' }){
//   return <div className={className}>{children}</div>;
// }
// export function TabsList({ children, className='' }){ return <div className={className}>{children}</div> }
// export function TabsTrigger({ value, children, className='', onClick }){ return <button onClick={() => onClick?.()} className={className}>{children}</button> }
// export function TabsContent({ children, className='' }){ return <div className={className}>{children}</div> }

import React from "react";

/**
 * Root Tabs container
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.value] - Active tab value
 * @param {Function} [props.onValueChange] - Callback when tab changes
 * @param {string} [props.className] - Optional custom classes
 */
export function Tabs({ children, value, onValueChange, className = "" }) {
  // Keep props for future tab logic
  return <div className={className}>{children}</div>;
}

/**
 * Tabs List container (wraps tab buttons)
 */
export function TabsList({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

/**
 * Individual Tab trigger button
 * onClick will automatically call parent onValueChange if provided
 */
export function TabsTrigger({
  value,
  children,
  className = "",
  onClick,
  onValueChange,
}) {
  const handleClick = () => {
    onClick?.();
    onValueChange?.(value);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}

/**
 * Content panel for a tab
 */
export function TabsContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
