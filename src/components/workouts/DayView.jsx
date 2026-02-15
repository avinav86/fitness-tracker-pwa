import { format } from 'date-fns'
import { Button, Card } from '../ui'

const DayView = ({ date, workout, onEdit, onDelete, onClose }) => {
  if (!workout) {
    return (
      <div className="text-center py-12">
        <p className="text-ios-gray-2 mb-4">No workout logged for this day</p>
        <Button onClick={onEdit}>Add Workout</Button>
      </div>
    )
  }

  const getWorkoutTypeColor = (type) => {
    switch (type) {
      case 'trainer':
        return 'bg-ios-blue text-white'
      case 'self':
        return 'bg-ios-green text-white'
      case 'rest':
        return 'bg-ios-gray-3 text-gray-700'
      default:
        return 'bg-ios-gray-6 text-gray-700'
    }
  }

  const calculateTotalVolume = () => {
    return workout.exercises?.reduce((total, exercise) => {
      const exerciseVolume = exercise.sets?.reduce((setTotal, set) => {
        return setTotal + (Number(set.reps) || 0) * (Number(set.weight) || 0)
      }, 0) || 0
      return total + exerciseVolume
    }, 0) || 0
  }

  return (
    <div className="max-w-2xl mx-auto pb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold">
            {format(date, 'EEEE, MMMM d')}
          </h2>
          <button onClick={onClose} className="text-ios-gray-1 hover:text-ios-blue">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getWorkoutTypeColor(workout.workoutType)}`}>
            {workout.workoutType === 'trainer' ? 'With Trainer' : workout.workoutType === 'self' ? 'Self' : 'Rest Day'}
          </span>
          <span className="text-sm text-ios-gray-2">
            Total Volume: {calculateTotalVolume().toLocaleString()} kg
          </span>
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-4 mb-6">
        {workout.exercises?.map((exercise, index) => (
          <Card key={index} className="p-4">
            <div className="mb-3">
              <h3 className="font-semibold text-lg">{exercise.name}</h3>
              {exercise.variation && (
                <p className="text-sm text-ios-gray-2">{exercise.variation}</p>
              )}
            </div>

            {/* Sets */}
            <div className="space-y-2 mb-3">
              {exercise.sets?.map((set, setIndex) => (
                <div key={setIndex} className="flex items-center gap-3 text-sm">
                  <span className="text-ios-gray-2 w-8">Set {setIndex + 1}</span>
                  <span className="font-medium">{set.reps} reps</span>
                  <span className="text-ios-gray-2">×</span>
                  <span className="font-medium">{set.weight} {set.unit}</span>
                  {set.completed && (
                    <svg className="w-4 h-4 text-ios-green ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              ))}
            </div>

            {exercise.notes && (
              <p className="text-sm text-ios-gray-1 bg-ios-gray-6 p-2 rounded">
                {exercise.notes}
              </p>
            )}
          </Card>
        ))}
      </div>

      {/* Workout Notes */}
      {workout.notes && (
        <Card className="p-4 mb-6">
          <h3 className="font-semibold mb-2">Workout Notes</h3>
          <p className="text-ios-gray-1">{workout.notes}</p>
        </Card>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="secondary" onClick={onEdit} className="flex-1">
          Edit Workout
        </Button>
        <Button variant="destructive" onClick={onDelete} className="flex-1">
          Delete
        </Button>
      </div>
    </div>
  )
}

export default DayView
