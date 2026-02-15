/**
 * LocalStorage utility functions with JSON serialization
 */

export const storage = {
  /**
   * Get item from localStorage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} Parsed value or default
   */
  get(key, defaultValue = null) {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error)
      return defaultValue
    }
  },

  /**
   * Set item in localStorage
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be JSON stringified)
   */
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error)
      // Check if quota exceeded
      if (error.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded!')
      }
    }
  },

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   */
  remove(key) {
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  },

  /**
   * Clear all items from localStorage
   */
  clear() {
    try {
      window.localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },

  /**
   * Get all keys from localStorage
   * @returns {string[]} Array of keys
   */
  keys() {
    try {
      return Object.keys(window.localStorage)
    } catch (error) {
      console.error('Error getting localStorage keys:', error)
      return []
    }
  },

  /**
   * Calculate approximate storage usage in bytes
   * @returns {number} Storage size in bytes
   */
  getSize() {
    try {
      let total = 0
      for (const key in window.localStorage) {
        if (window.localStorage.hasOwnProperty(key)) {
          total += window.localStorage[key].length + key.length
        }
      }
      return total
    } catch (error) {
      console.error('Error calculating storage size:', error)
      return 0
    }
  }
}

// Storage keys constants
export const STORAGE_KEYS = {
  WORKOUTS: 'fitness_workouts',
  TEMPLATES: 'fitness_templates',
  BODY_WEIGHT: 'fitness_body_weight',
  PERSONAL_RECORDS: 'fitness_personal_records',
  SETTINGS: 'fitness_settings',
  EXERCISE_LIBRARY: 'fitness_exercise_library',
}
