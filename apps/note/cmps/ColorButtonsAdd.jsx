const { useRef, useEffect } = React

export function ColorButtonsAdd({ changeBackgroundColor }) {
  const detailsRef = useRef()

  const handleClick = (color) => {
    changeBackgroundColor(color)
  }

  const handleButtonClick = (event, color) => {
    event.stopPropagation()
    handleClick(color)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        detailsRef.current.removeAttribute('open')
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <details className="color-details" ref={detailsRef}>
      <summary><i class="fa-solid fa-brush"></i></summary>
      <button
        type="button"
        style={{ backgroundColor: '#faafa8' }}
        onClick={(e) => handleButtonClick(e, '#faafa8')}></button>
      <button
        type="button"
        style={{ backgroundColor: '#f39f76' }}
        onClick={(e) => handleButtonClick(e, '#f39f76')}></button>
      <button
        type="button"
        style={{ backgroundColor: '#fff8b8' }}
        onClick={(e) => handleButtonClick(e, '#fff8b8')}></button>
      <button
        type="button"
        style={{ backgroundColor: '#e2f6d3' }}
        onClick={(e) => handleButtonClick(e, '#e2f6d3')}></button>
      <button
        type="button"
        style={{ backgroundColor: '#b4ddd3' }}
        onClick={(e) => handleButtonClick(e, '#b4ddd3')}></button>
      <button
        type="button"
        style={{ backgroundColor: '#aeccdc' }}
        onClick={(e) => handleButtonClick(e, '#aeccdc')}></button>
      <button
        type="button"
        style={{ backgroundColor: '#f6e2dd' }}
        onClick={(e) => handleButtonClick(e, '#f6e2dd')}></button>
      <button
        type="button"
        style={{ backgroundColor: '#e9e3d4' }}
        onClick={(e) => handleButtonClick(e, '#e9e3d4')}></button>
      <button
        type="button"
        style={{ backgroundColor: '#efeff1' }}
        onClick={(e) => handleButtonClick(e, '#efeff1')}></button>
    </details>
  )
}
