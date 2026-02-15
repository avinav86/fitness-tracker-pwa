import { useState, useRef, useEffect } from 'react'
import { BODY_PARTS, getExercisesByBodyPart, searchExercises } from '../../data/exerciseLibrary'

const ExerciseSelector = ({ onSelect, onClose }) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredExercises, setFilteredExercises] = useState([])
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      // Search mode
      const results = searchExercises(searchQuery)
      setFilteredExercises(results)
      setSelectedBodyPart(null)
    } else if (selectedBodyPart) {
      // Body part filter mode
      const exercises = getExercisesByBodyPart(selectedBodyPart)
      setFilteredExercises(exercises.map(ex => ({ ...ex, bodyPart: selectedBodyPart })))
    } else {
      // No filter
      setFilteredExercises([])
    }
  }, [searchQuery, selectedBodyPart])

  const handleBodyPartClick = (bodyPart) => {
    setSearchQuery('')
    setSelectedBodyPart(bodyPart === selectedBodyPart ? null : bodyPart)
  }

  const handleExerciseSelect = (exercise, variation = null) => {
    onSelect({
      name: exercise.name,
      variation: variation || '',
      bodyPart: exercise.bodyPart
    })
    onClose()
  }

  const bodyPartColors = {
    [BODY_PARTS.CHEST]: 'bg-red-100 text-red-700 hover:bg-red-200',
    [BODY_PARTS.BACK]: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    [BODY_PARTS.SHOULDERS]: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
    [BODY_PARTS.BICEPS]: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    [BODY_PARTS.TRICEPS]: 'bg-pink-100 text-pink-700 hover:bg-pink-200',
    [BODY_PARTS.LEGS]: 'bg-green-100 text-green-700 hover:bg-green-200',
    [BODY_PARTS.GLUTES]: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
    [BODY_PARTS.ABS]: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    [BODY_PARTS.FOREARMS]: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
    [BODY_PARTS.CARDIO]: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
    [BODY_PARTS.FULL_BODY]: 'bg-violet-100 text-violet-700 hover:bg-violet-200'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-t-ios-xl sm:rounded-ios-xl shadow-ios-modal max-h-[90vh] w-full sm:max-w-2xl overflow-hidden safe-bottom">
        {/* Header */}
        <div className="px-6 py-4 border-b border-ios-gray-5 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-ios-title font-semibold">Select Exercise</h3>
          <button
            onClick={onClose}
            className="text-ios-gray-1 hover:text-ios-blue transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 border-b border-ios-gray-5 bg-white sticky top-[73px] z-10">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 text-ios-body bg-ios-gray-6 border-none rounded-ios focus:outline-none focus:ring-2 focus:ring-ios-blue"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ios-gray-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ios-gray-2 hover:text-ios-gray-1"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="scrollable max-h-[calc(90vh-200px)] overflow-y-auto">
          {!searchQuery && !selectedBodyPart && (
            <div className="p-6">
              <h4 className="text-sm font-semibold text-ios-gray-1 mb-3">SELECT BODY PART</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.values(BODY_PARTS).map(bodyPart => (
                  <button
                    key={bodyPart}
                    onClick={() => handleBodyPartClick(bodyPart)}
                    className={`
                      px-4 py-3 rounded-ios font-medium text-sm transition-all
                      ${bodyPartColors[bodyPart]}
                      ${selectedBodyPart === bodyPart ? 'ring-2 ring-offset-2 ring-ios-blue' : ''}
                    `}
                  >
                    {bodyPart}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(searchQuery || selectedBodyPart) && filteredExercises.length > 0 && (
            <div className="p-6">
              {selectedBodyPart && (
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-ios-gray-1">
                    {selectedBodyPart.toUpperCase()} EXERCISES
                  </h4>
                  <button
                    onClick={() => {
                      setSelectedBodyPart(null)
                      setSearchQuery('')
                    }}
                    className="text-sm text-ios-blue hover:text-blue-600"
                  >
                    Clear
                  </button>
                </div>
              )}

              {searchQuery && (
                <h4 className="text-sm font-semibold text-ios-gray-1 mb-4">
                  SEARCH RESULTS ({filteredExercises.length})
                </h4>
              )}

              {/* Dropdown/List of Exercises */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto border border-ios-gray-5 rounded-ios">
                {filteredExercises.map((exercise, index) => (
                  <div key={index} className="border-b border-ios-gray-5 last:border-b-0">
                    <button
                      onClick={() => handleExerciseSelect(exercise)}
                      className="w-full px-4 py-3 text-left hover:bg-ios-gray-6 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{exercise.name}</div>
                        {!selectedBodyPart && (
                          <div className="text-sm text-ios-gray-2">{exercise.bodyPart}</div>
                        )}
                      </div>
                      <svg className="w-5 h-5 text-ios-gray-3 group-hover:text-ios-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {exercise.variations && exercise.variations.length > 0 && (
                      <div className="bg-ios-gray-6 px-4 py-3 border-t border-ios-gray-5">
                        <div className="text-xs font-semibold text-ios-gray-2 mb-2">Select Variation:</div>
                        <div className="grid grid-cols-2 gap-2">
                          {exercise.variations.map((variation, vIndex) => (
                            <button
                              key={vIndex}
                              onClick={() => handleExerciseSelect(exercise, variation)}
                              className="px-3 py-2 text-sm bg-white hover:bg-ios-blue hover:text-white rounded-ios text-ios-gray-1 transition-colors text-left border border-ios-gray-5 hover:border-ios-blue"
                            >
                              {variation}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(searchQuery || selectedBodyPart) && filteredExercises.length === 0 && (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-ios-gray-4 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-ios-gray-2">No exercises found</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedBodyPart(null)
                }}
                className="mt-4 text-ios-blue hover:text-blue-600 text-sm font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExerciseSelector
