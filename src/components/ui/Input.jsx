import { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  error,
  helperText,
  type = 'text',
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`
          w-full px-4 py-2.5 text-ios-body
          bg-white border border-ios-gray-4
          rounded-ios
          focus:outline-none focus:ring-2 focus:ring-ios-blue focus:border-transparent
          disabled:bg-ios-gray-6 disabled:text-ios-gray-2 disabled:cursor-not-allowed
          transition-all duration-150
          ${error ? 'border-ios-red focus:ring-ios-red' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-ios-red">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-ios-gray-2">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
