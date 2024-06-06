import React,{useId,useRef} from 'react'

function Input({
    label,
    className,
    type='text',
    placeholder='',
    ...props
},ref) {
    
    const id = useId()
    return (
        <div className='w-full my-4 flex justify-center items-center'>
            <div className='mr-8'>
        {label && 
        <label 
        htmlFor={id}
        className={`inline-block mb-1 text-black font-[500] text-lg`}>
            {label}
            </label>}
</div>

            <div>
        <input
        type={type}
        className={`w-[320px] h-10 rounded-lg pl-2 ${className}`}
        placeholder={placeholder}
        {...props}
        ref={ref}
        id={id}
        
        >
        
        </input>
        </div>
        </div>
    )
}

export default React.forwardRef(Input)