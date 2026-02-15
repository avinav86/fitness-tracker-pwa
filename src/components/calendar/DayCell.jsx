import { format } from 'date-fns'

const DayCell = ({ date, isCurrentMonth, isToday, workout, onClick }) => {
  const getWorkoutColor = (type) => {
    switch (type) {
      case 'trainer':
        return 'bg-ios-blue'
      case 'self':
        return 'bg-ios-green'
      case 'rest':
        return 'bg-ios-gray-3'
      default:
        return 'bg-transparent'
    }
  }

  return (
    <button
      onClick={onClick}
      className={`
        aspect-square p-1 rounded-ios relative
        hover:bg-ios-gray-6 transition-colors
        ${!isCurrentMonth ? 'opacity-40' : ''}
        ${isToday ? 'ring-2 ring-ios-blue' : ''}
      `}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <span className={`text-sm font-medium ${isToday ? 'text-ios-blue' : 'text-gray-900'}`}>
          {format(date, 'd')}
        </span>

        {/* Workout indicator */}
        {workout && (
          <div className="flex flex-col items-center gap-0.5 mt-1">
            <div className={`w-1.5 h-1.5 rounded-full ${getWorkoutColor(workout.workoutType)}`} />
            {workout.exercises?.length > 0 && (
              <span className="text-[10px] text-ios-gray-2">
                {workout.exercises.length}
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  )
}

export default DayCell
