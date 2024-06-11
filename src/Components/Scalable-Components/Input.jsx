import React, { useId } from "react";
import "./input.css";
function Input(
  {
    label = "",
    className,
    type = "text",
    placeholder = "",
    required = false,
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className={`w-full my-4 flex justify-center item ${'input-container'}   s-center`}>
      <div className="mr-8">
        {label && (
          <label
            htmlFor={id}
            className={`${'form-label'} inline-block mb-1 text-black font-[500] `}
          >
            {required && <span className={`${"required"}`}>*</span>}
            {label}
          </label>
        )}
      </div>

      <div>
        <input
          type={type}
          className={`w-[320px] h-10 rounded-lg pl-2 ${className} ${"form-input"}`}
          placeholder={placeholder}
          {...props}
          ref={ref}
          required={required}
          id={id}
        ></input>
      </div>
    </div>
  );
}

export default React.forwardRef(Input);
