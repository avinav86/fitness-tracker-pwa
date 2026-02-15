import { createContext, useContext, useState, useEffect } from 'react'
import { storage, STORAGE_KEYS } from '../utils/storage/localStorage'

const WorkoutContext = createContext(null)

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext)
  if (!context) {
    throw new Error('useWorkoutContext must be used within WorkoutProvider')
  }
  return context
}

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)

  // Load workouts from localStorage on mount
  useEffect(() => {
    const loadedWorkouts = storage.get(STORAGE_KEYS.WORKOUTS, [])
    setWorkouts(loadedWorkouts)
    setLoading(false)
  }, [])

  // Save workouts to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      storage.set(STORAGE_KEYS.WORKOUTS, workouts)
    }
  }, [workouts, loading])

  const value = {
    workouts,
    setWorkouts,
    loading,
  }

  return (
    <WorkoutContext.Provider value={value}>
      {children}
    </WorkoutContext.Provider>
  )
}
