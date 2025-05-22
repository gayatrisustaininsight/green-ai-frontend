import React from 'react'

const Label = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={` text-gray-700 bg-gray-100 rounded-lg px-2 py-1.5 text-sm ${className}`} >{children}</div>
    )
}

export default Label