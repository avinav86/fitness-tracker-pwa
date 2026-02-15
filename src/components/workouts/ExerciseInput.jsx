import { useState } from 'react'
import { Button, Input } from '../ui'
import ExerciseSelector from './ExerciseSelector'

const ExerciseInput = ({ exercise, onChange, onRemove, exerciseIndex }) => {
  const [sets, setSets] = useState(exercise.sets || [{ reps: '', weight: '', unit: 'kg', completed: false }])
  const [showExerciseSelector, setShowExerciseSelector] = useState(false)

  const addSet = () => {
    const newSets = [...sets, { reps: '', weight: '', unit: 'kg', completed: false }]
    setSets(newSets)
    onChange({ ...exercise, sets: newSets })
  }

  const removeSet = (setIndex) => {
    const newSets = sets.filter((_, i) => i !== setIndex)
    setSets(newSets)
    onChange({ ...exercise, sets: newSets })
  }

  const updateSet = (setIndex, field, value) => {
    const newSets = sets.map((set, i) => {
      if (i === setIndex) {
        return { ...set, [field]: value }
      }
      return set
    })
    setSets(newSets)
    onChange({ ...exercise, sets: newSets })
  }

  const handleExerciseChange = (field, value) => {
    onChange({ ...exercise, [field]: value })
  }

  const handleExerciseSelect = (selectedExercise) => {
    onChange({
      ...exercise,
      name: selectedExercise.name,
      variation: selectedExercise.variation,
      bodyPart: selectedExercise.bodyPart
    })
    setShowExerciseSelector(false)
  }

  return (
    <div className="bg-white rounded-ios-lg p-4 shadow-ios">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 space-y-3">
          <div className="relative">
            <Input
              placeholder="Exercise name (e.g., Bench Press) or click to browse"
              value={exercise.name || ''}
              onChange={(e) => handleExerciseChange('name', e.target.value)}
              onClick={() => setShowExerciseSelector(true)}
              className="font-medium pr-10"
            />
            <button
              onClick={() => setShowExerciseSelector(true)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-ios-blue hover:text-blue-600 p-1"
              title="Browse exercises"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <Input
            placeholder="Variation (optional, e.g., Incline Dumbbell)"
            value={exercise.variation || ''}
            onChange={(e) => handleExerciseChange('variation', e.target.value)}
          />
        </div>
        <button
          onClick={onRemove}
          className="ml-3 text-ios-red hover:text-red-600 p-1"
          aria-label="Remove exercise"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Sets */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-ios-gray-1">Sets</span>
          <Button size="sm" variant="ghost" onClick={addSet}>
            + Add Set
          </Button>
        </div>

        {sets.map((set, setIndex) => (
          <div key={setIndex} className="flex items-center gap-2">
            <span className="text-sm text-ios-gray-2 w-6">{setIndex + 1}</span>

            <Input
              type="number"
              placeholder="Reps"
              value={set.reps}
              onChange={(e) => updateSet(setIndex, 'reps', e.target.value)}
              className="flex-1"
            />

            <Input
              type="number"
              placeholder="Weight"
              value={set.weight}
              onChange={(e) => updateSet(setIndex, 'weight', e.target.value)}
              className="flex-1"
            />

            <select
              value={set.unit}
              onChange={(e) => updateSet(setIndex, 'unit', e.target.value)}
              className="px-3 py-2.5 border border-ios-gray-4 rounded-ios text-ios-body focus:outline-none focus:ring-2 focus:ring-ios-blue"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>

            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={set.completed}
                onChange={(e) => updateSet(setIndex, 'completed', e.target.checked)}
                className="w-5 h-5 text-ios-blue border-ios-gray-4 rounded focus:ring-ios-blue"
              />
            </label>

            {sets.length > 1 && (
              <button
                onClick={() => removeSet(setIndex)}
                className="text-ios-red hover:text-red-600 p-1"
                aria-label="Remove set"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="mt-3">
        <textarea
          placeholder="Exercise notes (optional)"
          value={exercise.notes || ''}
          onChange={(e) => handleExerciseChange('notes', e.target.value)}
          rows={2}
          className="w-full px-4 py-2.5 text-ios-body bg-white border border-ios-gray-4 rounded-ios focus:outline-none focus:ring-2 focus:ring-ios-blue resize-none"
        />
      </div>

      {/* Exercise Selector Modal */}
      {showExerciseSelector && (
        <ExerciseSelector
          onSelect={handleExerciseSelect}
          onClose={() => setShowExerciseSelector(false)}
        />
      )}
    </div>
  )
}

export default ExerciseInput
