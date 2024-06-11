import React from 'react'
import './container.css'
export default function Container({
    children, 
    className=''
}) {
    

    return (
        <div
        className={`w-full ${className} ${'responsive-container'}`}
        >
            {children}
        </div>
    )
}
