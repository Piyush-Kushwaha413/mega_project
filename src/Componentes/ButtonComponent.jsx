import React from 'react'

function ButtonComponent({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
  return <button
  className={`${bgColor} ${textColor} px-4 py-2 rounded-lg  `} 
  {...props}>
    {children}
  </button>
}

export default ButtonComponent