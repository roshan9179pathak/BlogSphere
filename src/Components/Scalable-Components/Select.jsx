import React, {useId} from 'react'
import './select.css'
 function Select({
    options=[],
    label,
    className,
    ...props

},ref) {
    
    const id = useId()

    return (
        <div className={`${'select-container'} `}>

        {label && <label htmlFor={id} className={`font-semibold text-black ${'select-label'}`}>
            {label}
            </label>}

          <select 
          id={id}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className} ${'for-select'}`}
          ref={ref}
          >
            {options?.map((option)=>(
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
            </select>  
               
        </div>
    )
}

export default React.forwardRef(Select);