import { useEffect } from 'react'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}) => {
  // Body overflow is handled globally in index.css
  // removed useEffect

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          relative bg-white rounded-t-ios-xl sm:rounded-ios-xl
          shadow-ios-modal max-h-[90vh] w-full sm:max-w-lg
          overflow-hidden safe-bottom
          animate-slide-up
          ${className}
        `}
      >
        {/* Header */}
        {title && (
          <div className="px-6 py-4 border-b border-ios-gray-5 flex items-center justify-between">
            <h3 className="text-ios-title font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="text-ios-gray-1 hover:text-ios-blue transition-colors p-1"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="scrollable max-h-[calc(90vh-80px)] overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
