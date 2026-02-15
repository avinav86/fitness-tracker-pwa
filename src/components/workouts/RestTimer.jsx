import { useState, useEffect, useRef } from 'react'
import { Button } from '../ui'

const RestTimer = ({ defaultTime = 90, autoStart = true, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(defaultTime)
  const [isRunning, setIsRunning] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const intervalRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    if (autoStart) {
      startTimer()
    }
  }, [autoStart])

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            completeTimer()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeRemaining])

  const startTimer = () => {
    setIsRunning(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeRemaining(defaultTime)
  }

  const adjustTime = (seconds) => {
    setTimeRemaining(prev => Math.max(0, prev + seconds))
  }

  const completeTimer = () => {
    setIsRunning(false)

    // Play sound
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e))
    }

    // Haptic feedback (iOS)
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([200, 100, 200])
    }

    onComplete?.()
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((defaultTime - timeRemaining) / defaultTime) * 100

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-4 safe-bottom z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-ios-blue text-white px-4 py-2 rounded-full shadow-ios-modal flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          {formatTime(timeRemaining)}
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 safe-bottom z-40 bg-white border-t border-ios-gray-5 shadow-ios-modal">
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIGGS57OihUBELTKXh8bllHgg2jdXzxnksBSR0xPDdkEILFGCy6+ymWBMNR6Df87tiIAYuf8vz2Ik2Bxdiu+zooFARDEuk4fG5ZR4INIzU88R6LAUZU8Hw3I9BChVgsuvspVkUDkeg3/O7YiAGLn/L89iJNgcXYbvs6KFRDw1Mo+HwuWYdCDKL1fPCeSsFGFXC8NuPQQoVYLLr7KRaEw5Go9/zul0fByuCy/PYiTQIG2K76+ifUBEOTqPh8bdmHQcxidTzwHkrBRhWw/Daj0ILEGCy6+ukWRQPRqHf87tgHwYqgsrz2Ig0Bxtiu+vnn1ARD02l4fC2ZxwGMIjU8795KwUXVsPw2o9DCxBfsuvuolgVD0ah3/O7YB4GKoLL89iINAcbY7zr559PEhBPouDwtmgcBi6I1fO+eSsFFVbE8NqOQg0PXrDr7qFYGBBHo9/zu18fBSuCy/PYhzMHHGK76+edUBIRUKHg8LRnGwYuhdb0vHcrBhRYxe/bi0QNED955e+gVxgRR6Pf8rpfHgQqg8vz2IczBxxhu+vnnVASEVCh4PC0aBsGLYXW9Lx3KwYVWMXv24tEDRA" />

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Rest Timer</h3>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-ios-gray-1 hover:text-ios-blue p-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-4">
          <div className="text-6xl font-bold text-ios-blue mb-2">
            {formatTime(timeRemaining)}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-ios-gray-6 rounded-full overflow-hidden">
            <div
              className="h-full bg-ios-blue transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 mb-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => adjustTime(-15)}
            disabled={timeRemaining <= 0}
          >
            -15s
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => adjustTime(15)}
          >
            +15s
          </Button>
          {isRunning ? (
            <Button variant="primary" onClick={pauseTimer} className="flex-1">
              Pause
            </Button>
          ) : (
            <Button variant="primary" onClick={startTimer} className="flex-1">
              {timeRemaining === 0 ? 'Restart' : 'Start'}
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={resetTimer}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RestTimer
