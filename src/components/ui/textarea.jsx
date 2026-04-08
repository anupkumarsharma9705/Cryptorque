import React from 'react';
export function Textarea(props){ return <textarea {...props} className={'w-full p-2 rounded '+(props.className||'')}/> }
