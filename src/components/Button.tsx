import { DetailedHTMLProps, ButtonHTMLAttributes, forwardRef } from "react";

export const Button = forwardRef<
    HTMLButtonElement,
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement>
>(({ className, children, ...rest }, ref) => {
    return <button
        className={`border-2 bg-blue-600 rounded p-2 text-white font-bold hover:bg-blue-500 focus:bg-blue-400 transition-colors disabled:bg-gray-500 ${className}`}
        {...rest}
        ref={ref}
    >
        {children}
    </button>
})