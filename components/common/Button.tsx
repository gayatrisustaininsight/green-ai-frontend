import { ReactNode } from "react";
import Image from "next/image";
import { WiStars } from "react-icons/wi";
import { BsStars } from "react-icons/bs";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xs';
    isLoading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    icon?: string;
    fullWidth?: boolean;
    classNames?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: ReactNode;
    disabled?: boolean;
}

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon: Icon,
    fullWidth = false,
    classNames = '',
    disabled = false,
    ...props
}: ButtonProps) => {
    const baseStyles = "inline-flex items-center cursor-pointer justify-center rounded-2xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]";

    const variants = {
        primary: "bg-[#10B981] hover:bg-[#059669] text-white disabled:bg-primary-light",
        secondary: "bg-gray-700 hover:bg-gray-800 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
        outline: "border-2 border-[#10B981] text-[#10B981] hover:bg-[#10B981]/10"
    };

    const sizes = {
        xs: "px-2 py-1 text-sm",
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-2 text-sm"
    };

    return (
        <button
            className={` hover:scale-[0.98] transition-all duration-300 h-min
                ${baseStyles}
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? 'w-full' : ''}
                ${isLoading || disabled ? 'opacity-70 cursor-not-allowed' : ''}
                ${classNames}
            `}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"

                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {variant === "outline" ? (
                <div className="flex flex-row gap-2 items-center">
                    <BsStars className="text-[#10B981] text-xl" />
                    {children}
                </div>
            ) : (
                <>
                    {Icon && <Image src={Icon} alt="Icon" className="mr-2" width={20} height={20} />}
                    {children}
                </>
            )}

        </button>
    );
}; 