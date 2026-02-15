const Card = ({
  children,
  className = '',
  onClick,
  hover = false,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-ios-lg shadow-ios-card
        ${hover ? 'hover:shadow-ios-modal transition-shadow duration-200 cursor-pointer active:scale-[0.98]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
