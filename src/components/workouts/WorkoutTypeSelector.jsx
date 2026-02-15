const WorkoutTypeSelector = ({ value, onChange }) => {
  const types = [
    { value: 'trainer', label: 'Trainer', color: 'bg-ios-blue' },
    { value: 'self', label: 'Self', color: 'bg-ios-green' },
    { value: 'rest', label: 'Rest', color: 'bg-ios-gray-3' },
  ]

  return (
    <div className="flex gap-2">
      {types.map(type => (
        <button
          key={type.value}
          onClick={() => onChange(type.value)}
          className={`
            flex-1 py-2.5 px-4 rounded-ios font-medium transition-all
            ${value === type.value
              ? `${type.color} text-white shadow-ios`
              : 'bg-ios-gray-6 text-ios-gray-1 hover:bg-ios-gray-5'
            }
          `}
        >
          {type.label}
        </button>
      ))}
    </div>
  )
}

export default WorkoutTypeSelector
