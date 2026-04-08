import React from 'react';
export function Badge({ children, className='', ...props }) {
  return <span {...props} className={'inline-flex items-center gap-2 px-2 py-1 rounded '+className}>{children}</span>
}
