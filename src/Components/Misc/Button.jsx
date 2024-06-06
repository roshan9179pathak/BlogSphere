import React from 'react'

export default function Button({
    children,
    className = '',
    bgColor='',
    type ='button',
    ...props
    
}) {
    

    return (
        <button
        className={` ${bgColor} ${className}`}
        {...props}
        >
            {children}
        </button>
    )
}
