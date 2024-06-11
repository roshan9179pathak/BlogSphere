import React from 'react'
import './button.css'
export default function Button({
    children,
    className = '',
    bgColor='',
    type ='button',
    ...props
    
}) {
    

    return (
        <div className={`${'button-container'}`}>
            <button
        className={`${bgColor} ${className}`}
        {...props}
        >
            {children}
        </button>
        </div>
    )
}
