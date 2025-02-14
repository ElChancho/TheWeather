import { useEffect } from 'react'

export function MessagePop ({ text, isError, duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [text, duration])

  return (
    <div className={`fixed top-5 bg-prj-2 p-2 border border-black rounded-md ${isError ? 'text-red-500' : 'text-green-500'}`}>
      <p>{text}</p>
    </div>
  )
}
