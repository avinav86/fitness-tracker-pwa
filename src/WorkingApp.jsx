import { useState } from 'react'
import { format } from 'date-fns'
import { WorkoutProvider } from './contexts/WorkoutContext'
import { useWorkouts } from './hooks/useWorkouts'
import { Button, Modal, Card } from './components/ui'
import TabBar from './components/layout/TabBar'
import Calendar from './components/calendar/Calendar'
import WorkoutForm from './components/workouts/WorkoutForm'
import DayView from './components/workouts/DayView'

function AppContent() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [showWorkoutForm, setShowWorkoutForm] = useState(false)
  const [showDayView, setShowDayView] = useState(false)
  const [editingWorkout, setEditingWorkout] = useState(null)

  const { workouts, addWorkout, updateWorkout, deleteWorkout, getWorkoutByDate } = useWorkouts()

  const handleDayClick = (date, workout) => {
    setSelectedDate(date)
    setSelectedWorkout(workout)
    setShowDayView(true)
  }

  const handleAddWorkout = (date) => {
    setSelectedDate(date || new Date())
    setEditingWorkout(null)
    setShowDayView(false)
    setShowWorkoutForm(true)
  }

  const handleEditWorkout = () => {
    setEditingWorkout(selectedWorkout)
    setShowDayView(false)
    setShowWorkoutForm(true)
  }

  const handleSaveWorkout = (workoutData) => {
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

  return (
    <div className="min-h-screen bg-ios-gray-6 pb-20">
      {/* Main content */}
      <div className="safe-top">
        {activeTab === 'home' && (
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

            <Button onClick={() => handleAddWorkout(new Date())} className="w-full">
              Log Today's Workout
            </Button>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Calendar</h1>
              <Button size="sm" onClick={() => handleAddWorkout(new Date())}>
                + Add Workout
              </Button>
            </div>
            <Calendar onDayClick={handleDayClick} />
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Insights</h1>
            <Card className="p-6 text-center">
              <p className="text-ios-gray-2">Progress charts and analytics coming soon!</p>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <Card className="p-6">
              <p className="text-ios-gray-2">Settings panel coming soon!</p>
            </Card>
          </div>
        )}
      </div>

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Workout Form Modal */}
      <Modal
        isOpen={showWorkoutForm}
        onClose={() => {
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

      {/* Day View Modal */}
      <Modal
        isOpen={showDayView}
        onClose={() => setShowDayView(false)}
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
    </div>
  )
}

function WorkingApp() {
  return (
    <WorkoutProvider>
      <AppContent />
    </WorkoutProvider>
  )
}

export default WorkingApp
