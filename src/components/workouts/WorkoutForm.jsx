import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button, Input } from '../ui'
import ExerciseInput from './ExerciseInput'
import WorkoutTypeSelector from './WorkoutTypeSelector'
import RestTimer from './RestTimer'

const WorkoutForm = ({ initialWorkout, onSave, onCancel }) => {
  const [workout, setWorkout] = useState(initialWorkout || {
    date: new Date().toISOString().split('T')[0],
    workoutType: 'self',
    exercises: [],
    notes: '',
  })

  const [showRestTimer, setShowRestTimer] = useState(false)
  const [errors, setErrors] = useState({})

  const addExercise = () => {
    setWorkout(prev => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          id: uuidv4(),
          name: '',
          variation: '',
          sets: [{ reps: '', weight: '', unit: 'kg', completed: false }],
          notes: '',
        }
      ]
    }))
  }

  const removeExercise = (index) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }))
  }

  const updateExercise = (index, updatedExercise) => {
    setWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.map((ex, i) => i === index ? updatedExercise : ex)
    }))

    // Check if a set was just completed and show timer
    const completedSets = updatedExercise.sets?.filter(s => s.completed) || []
    if (completedSets.length > 0) {
      setShowRestTimer(true)
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!workout.date) {
      newErrors.date = 'Date is required'
    }

    if (workout.exercises.length === 0) {
      newErrors.exercises = 'Add at least one exercise'
    } else {
      workout.exercises.forEach((ex, i) => {
        if (!ex.name?.trim()) {
          newErrors[`exercise_${i}`] = 'Exercise name is required'
        }
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validate()) {
      onSave(workout)
    }
  }

  return (
    <div className="max-w-2xl mx-auto pb-32">
      <div className="space-y-6">
        {/* Date */}
        <div>
          <Input
            type="date"
            label="Date"
            value={workout.date}
            onChange={(e) => setWorkout({ ...workout, date: e.target.value })}
            error={errors.date}
          />
        </div>

        {/* Workout Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Workout Type
          </label>
          <WorkoutTypeSelector
            value={workout.workoutType}
            onChange={(type) => setWorkout({ ...workout, workoutType: type })}
          />
        </div>

        {/* Exercises */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Exercises
            </label>
            <Button size="sm" onClick={addExercise}>
              + Add Exercise
            </Button>
          </div>

          {errors.exercises && (
            <p className="text-sm text-ios-red mb-3">{errors.exercises}</p>
          )}

          <div className="space-y-4">
            {workout.exercises.map((exercise, index) => (
              <div key={exercise.id || index}>
                <ExerciseInput
                  exercise={exercise}
                  exerciseIndex={index}
                  onChange={(updated) => updateExercise(index, updated)}
                  onRemove={() => removeExercise(index)}
                />
                {errors[`exercise_${index}`] && (
                  <p className="text-sm text-ios-red mt-1">{errors[`exercise_${index}`]}</p>
                )}
              </div>
            ))}
          </div>

          {workout.exercises.length === 0 && (
            <div className="text-center py-12 bg-ios-gray-6 rounded-ios-lg">
              <p className="text-ios-gray-2 mb-4">No exercises yet</p>
              <Button onClick={addExercise}>Add Your First Exercise</Button>
            </div>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Workout Notes (optional)
          </label>
          <textarea
            value={workout.notes}
            onChange={(e) => setWorkout({ ...workout, notes: e.target.value })}
            rows={3}
            placeholder="How did you feel? Any observations?"
            className="w-full px-4 py-2.5 text-ios-body bg-white border border-ios-gray-4 rounded-ios focus:outline-none focus:ring-2 focus:ring-ios-blue resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} className="flex-1">
            Save Workout
          </Button>
        </div>
      </div>

      {/* Rest Timer */}
      {showRestTimer && (
        <RestTimer
          defaultTime={90}
          autoStart={true}
          onComplete={() => console.log('Rest complete!')}
        />
      )}
    </div>
  )
}

export default WorkoutForm
