import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useWorkoutContext } from '../contexts/WorkoutContext'

export const useWorkouts = () => {
  const { workouts, setWorkouts, loading } = useWorkoutContext()

  /**
   * Add a new workout
   * @param {Object} workout - Workout data
   * @returns {Object} Created workout with ID
   */
  const addWorkout = useCallback((workout) => {
    const newWorkout = {
      ...workout,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setWorkouts(prev => [...prev, newWorkout])
    return newWorkout
  }, [setWorkouts])

  /**
   * Update an existing workout
   * @param {string} id - Workout ID
   * @param {Object} updates - Fields to update
   * @returns {Object|null} Updated workout or null if not found
   */
  const updateWorkout = useCallback((id, updates) => {
    let updated = null

    setWorkouts(prev => prev.map(workout => {
      if (workout.id === id) {
        updated = {
          ...workout,
          ...updates,
          id: workout.id, // Ensure ID doesn't change
          createdAt: workout.createdAt, // Preserve creation date
          updatedAt: new Date().toISOString(),
        }
        return updated
      }
      return workout
    }))

    return updated
  }, [setWorkouts])

  /**
   * Delete a workout
   * @param {string} id - Workout ID
   * @returns {boolean} True if deleted, false if not found
   */
  const deleteWorkout = useCallback((id) => {
    let deleted = false

    setWorkouts(prev => {
      const filtered = prev.filter(workout => {
        if (workout.id === id) {
          deleted = true
          return false
        }
        return true
      })
      return filtered
    })

    return deleted
  }, [setWorkouts])

  /**
   * Get workout by ID
   * @param {string} id - Workout ID
   * @returns {Object|null} Workout or null if not found
   */
  const getWorkout = useCallback((id) => {
    return workouts.find(workout => workout.id === id) || null
  }, [workouts])

  /**
   * Get workout(s) by date
   * @param {string} date - Date in YYYY-MM-DD format
   * @returns {Object|null} Workout for that date (or null)
   */
  const getWorkoutByDate = useCallback((date) => {
    return workouts.find(workout => workout.date === date) || null
  }, [workouts])

  /**
   * Get workouts within a date range
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @returns {Array} Workouts in range, sorted by date
   */
  const getWorkoutsByDateRange = useCallback((startDate, endDate) => {
    return workouts
      .filter(workout => workout.date >= startDate && workout.date <= endDate)
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [workouts])

  /**
   * Get all workouts sorted by date (newest first)
   * @returns {Array} Sorted workouts
   */
  const getAllWorkouts = useCallback(() => {
    return [...workouts].sort((a, b) => b.date.localeCompare(a.date))
  }, [workouts])

  return {
    workouts: getAllWorkouts(),
    loading,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    getWorkout,
    getWorkoutByDate,
    getWorkoutsByDateRange,
  }
}
