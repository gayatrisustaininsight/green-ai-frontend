import Image from 'next/image';
import React, { forwardRef } from 'react';


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: string;
    error?: string;
    showPassword?: boolean;
    inputsize?: 'sm' | 'md' | 'lg';
    maxLength?: number;
    minLength?: number;
    type?: string;
    onTogglePassword?: () => void;
    required?: boolean;
    touched?: boolean;
    showError?: boolean;
    value?: string | number;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, icon: Icon, value, error, showPassword, onTogglePassword, required, showError, handleChange, handleBlur, className, disabled, ...props }, ref) => {

        return (
            <div className="relative w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-0.5">
                        {label}

                    </label>
                )}
                <div className="relative flex items-center">
                    {Icon && (
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <Image src={Icon} alt="Icon" width={24} height={24} className="text-gray-400 text-3xl border-r-2 border-[#000000] pr-2" />
                        </div>
                    )}

                    <input
                        ref={ref}
                        aria-required={required}
                        aria-invalid={!!showError}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={value}
                        autoComplete="new-password"
                        className={`
                            block w-full rounded-2xl border border-gray-200  py-2
                            focus:border-primary focus:ring-1 focus:ring-primary text-sm
                            ${Icon ? 'pl-10' : 'pl-4'}
                            ${showError
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                : 'border-gray-200 focus:border-primary focus:ring-primary'
                            }
                            ${disabled ? ' cursor-not-allowed bg-transparent' : ''}
                            transition-all duration-200 ${className}
                            placeholder:text-gray-400
                        `}
                        {...props}
                    />
                    {/* {showPassword !== undefined && onTogglePassword && (
                        <button
                            type="button"
                            onClick={onTogglePassword}
                            className="absolute right-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <FaEyeSlash className='text-xl' /> : <FaEye className='text-xl' />}
                        </button>
                    )} */}
                </div>
                {showError && error && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input'; 