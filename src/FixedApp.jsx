import { useState } from 'react'
import { format } from 'date-fns'
import { WorkoutProvider } from './contexts/WorkoutContext'
import { useWorkouts } from './hooks/useWorkouts'
import { Button, Modal, Card } from './components/ui'
import Layout from './components/layout/Layout'
import Calendar from './components/calendar/Calendar'
import WorkoutForm from './components/workouts/WorkoutForm'
import DayView from './components/workouts/DayView'

function AppContent() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [showWorkoutForm, setShowWorkoutForm] = useState(false)
  const [showDayView, setShowDayView] = useState(false)
  const [editingWorkout, setEditingWorkout] = useState(null)

  const { workouts, addWorkout, updateWorkout, deleteWorkout, getWorkoutByDate } = useWorkouts()

  const handleDayClick = (date, workout) => {
    console.log('Day clicked:', date, workout)
    setSelectedDate(date)
    setSelectedWorkout(workout)
    setShowDayView(true)
  }

  const handleAddWorkout = (date) => {
    console.log('Add workout clicked for date:', date)
    setSelectedDate(date || new Date())
    setEditingWorkout(null)
    setShowDayView(false)
    setShowWorkoutForm(true)
  }

  const handleEditWorkout = () => {
    console.log('Edit workout clicked')
    setEditingWorkout(selectedWorkout)
    setShowDayView(false)
    setShowWorkoutForm(true)
  }

  const handleSaveWorkout = (workoutData) => {
    console.log('Saving workout:', workoutData)
    if (editingWorkout) {
      updateWorkout(editingWorkout.id, workoutData)
    } else {
      addWorkout(workoutData)
    }
    setShowWorkoutForm(false)
    setEditingWorkout(null)

    // Refresh day view if it was open
    if (selectedDate) {
      const updated = getWorkoutByDate(format(selectedDate, 'yyyy-MM-dd'))
      setSelectedWorkout(updated)
      setShowDayView(true)
    }
  }

  const handleDeleteWorkout = () => {
    if (selectedWorkout && window.confirm('Are you sure you want to delete this workout?')) {
      deleteWorkout(selectedWorkout.id)
      setShowDayView(false)
      setSelectedWorkout(null)
    }
  }

  const renderHome = () => (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Fitness Tracker</h1>
        <p className="text-ios-gray-2">Track your workouts and progress</p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-ios-blue">{workouts.length}</div>
            <div className="text-sm text-ios-gray-2">Total Workouts</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-ios-green">
              {workouts.filter(w => w.workoutType === 'trainer').length}
            </div>
            <div className="text-sm text-ios-gray-2">With Trainer</div>
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        <Button
          onClick={() => {
            console.log('Button clicked!')
            handleAddWorkout(new Date())
          }}
          className="w-full"
        >
          Log Today's Workout
        </Button>

        <button
          onClick={() => alert('Plain button works!')}
          className="w-full bg-green-500 text-white py-3 rounded-lg"
        >
          Test Plain Button
        </button>
      </div>
    </div>
  )

  const renderCalendar = () => (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <Button size="sm" onClick={() => handleAddWorkout(new Date())}>
          + Add Workout
        </Button>
      </div>
      <Calendar onDayClick={handleDayClick} />
    </div>
  )

  const renderInsights = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Insights</h1>
      <Card className="p-6 text-center">
        <p className="text-ios-gray-2">Progress charts and analytics coming soon!</p>
      </Card>
    </div>
  )

  const renderSettings = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <Card className="p-6">
        <p className="text-ios-gray-2">Settings panel coming soon!</p>
      </Card>
    </div>
  )

  console.log('Render state:', { showWorkoutForm, showDayView })

  return (
    <Layout>
      {({ activeTab }) => (
        <>
          {activeTab === 'home' && renderHome()}
          {activeTab === 'calendar' && renderCalendar()}
          {activeTab === 'insights' && renderInsights()}
          {activeTab === 'settings' && renderSettings()}
        </>
      )}

      {/* Workout Form Modal */}
      {showWorkoutForm && (
        <Modal
          isOpen={showWorkoutForm}
          onClose={() => {
            console.log('Closing workout form')
            setShowWorkoutForm(false)
            setEditingWorkout(null)
          }}
          title={editingWorkout ? 'Edit Workout' : 'New Workout'}
        >
          <div className="p-6">
            <WorkoutForm
              initialWorkout={editingWorkout}
              onSave={handleSaveWorkout}
              onCancel={() => {
                setShowWorkoutForm(false)
                setEditingWorkout(null)
              }}
            />
          </div>
        </Modal>
      )}

      {/* Day View Modal */}
      {showDayView && (
        <Modal
          isOpen={showDayView}
          onClose={() => {
            console.log('Closing day view')
            setShowDayView(false)
          }}
          title={selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''}
        >
          <div className="p-6">
            <DayView
              date={selectedDate}
              workout={selectedWorkout}
              onEdit={handleEditWorkout}
              onDelete={handleDeleteWorkout}
              onClose={() => setShowDayView(false)}
            />
          </div>
        </Modal>
      )}
    </Layout>
  )
}

function FixedApp() {
  return (
    <WorkoutProvider>
      <AppContent />
    </WorkoutProvider>
  )
}

export default FixedApp
