import { useState } from 'react'
import { WorkoutProvider } from './contexts/WorkoutContext'
import { useWorkouts } from './hooks/useWorkouts'

function SimpleTest() {
  const [count, setCount] = useState(0)
  const { workouts, addWorkout } = useWorkouts()

  const handleAddWorkout = () => {
    console.log('Adding workout...')
    const result = addWorkout({
      date: new Date().toISOString().split('T')[0],
      workoutType: 'self',
      exercises: [{
        name: 'Test Exercise',
        sets: [{ reps: 10, weight: 50, unit: 'kg', completed: true }]
      }],
      notes: 'Test'
    })
    console.log('Workout added:', result)
    alert('Workout added! Total: ' + (workouts.length + 1))
  }

  const handleSimpleClick = () => {
    setCount(c => c + 1)
    alert('Simple button works! Count: ' + (count + 1))
  }

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Simple Test App</h1>

      <div className="space-y-4 max-w-md">
        <button
          onClick={handleSimpleClick}
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Simple Button (Count: {count})
        </button>

        <button
          onClick={handleAddWorkout}
          className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Add Workout (Total: {workouts.length})
        </button>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold mb-2">Workouts: {workouts.length}</h2>
          {workouts.map((w, i) => (
            <div key={w.id} className="text-sm text-gray-600">
              {i + 1}. {w.date} - {w.exercises?.[0]?.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SimpleApp() {
  return (
    <WorkoutProvider>
      <SimpleTest />
    </WorkoutProvider>
  )
}

export default SimpleApp
