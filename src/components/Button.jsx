export function Button ({ typeButton = 'button', className = '', onClick = () => {}, children }) {
  return (
    <button type={typeButton} onClick={onClick} className={`cursor-pointer p-1.5 rounded-md bg-prj-1 text-white hover:underline ${className}`}>
      {children}
    </button>
  )
}
