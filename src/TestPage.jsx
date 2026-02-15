import { useState } from 'react'

function TestPage() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    console.log('Button clicked!')
    setCount(c => c + 1)
    alert('Button works! Count: ' + (count + 1))
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Test Page</h1>

      <button
        onClick={handleClick}
        style={{
          backgroundColor: '#007AFF',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Click Me - Count: {count}
      </button>

      <div style={{ marginTop: '20px' }}>
        <p>If this button works, the issue is with the main app.</p>
        <p>Count: {count}</p>
      </div>
    </div>
  )
}

export default TestPage
