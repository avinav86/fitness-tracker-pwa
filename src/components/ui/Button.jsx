import { forwardRef } from 'react'

const variants = {
  primary: 'bg-ios-blue text-white hover:bg-blue-600 active:bg-blue-700',
  secondary: 'bg-ios-gray-6 text-ios-blue hover:bg-ios-gray-5 active:bg-ios-gray-4',
  destructive: 'bg-ios-red text-white hover:bg-red-600 active:bg-red-700',
  ghost: 'bg-transparent text-ios-blue hover:bg-ios-gray-6 active:bg-ios-gray-5',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-ios-body',
  lg: 'px-6 py-3 text-lg',
}

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        rounded-ios font-medium transition-colors duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.98] transition-transform
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {children}
        </span>
      ) : children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
