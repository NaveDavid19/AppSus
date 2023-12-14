const { useRef, useEffect } = React

export function ColorButtons({ changeBackgroundColor, note }) {
  const detailsRef = useRef()

  const handleClick = (color) => {
    changeBackgroundColor(color, note)
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
    <details ref={detailsRef}>
      <summary>Colors</summary>
      <button
        type="button"
        style={{ backgroundColor: '#faafa8' }}
        onClick={(e) => handleButtonClick(e, '#faafa8')}>
        coral
      </button>
      <button
        type="button"
        style={{ backgroundColor: '#f39f76' }}
        onClick={(e) => handleButtonClick(e, '#f39f76')}>
        peach
      </button>
      <button
        type="button"
        style={{ backgroundColor: '#fff8b8' }}
        onClick={(e) => handleButtonClick(e, '#fff8b8')}>
        sand
      </button>
      <button
        type="button"
        style={{ backgroundColor: '#e2f6d3' }}
        onClick={(e) => handleButtonClick(e, '#e2f6d3')}>
        mint
      </button>
      <button
        type="button"
        style={{ backgroundColor: '#b4ddd3' }}
        onClick={(e) => handleButtonClick(e, '#b4ddd3')}>
        sage
      </button>
      <button
        type="button"
        style={{ backgroundColor: '#aeccdc' }}
        onClick={(e) => handleButtonClick(e, '#aeccdc')}>
        storm
      </button>
      <button
        type="button"
        style={{ backgroundColor: '#f6e2dd' }}
        onClick={(e) => handleButtonClick(e, '#f6e2dd')}>
        blossom
      </button>
      <button
        type="button"
        style={{ backgroundColor: '#e9e3d4' }}
        onClick={(e) => handleButtonClick(e, '#e9e3d4')}>
        clay
      </button>
      <button
        type="button"
        style={{ backgroundColor: '#efeff1' }}
        onClick={(e) => handleButtonClick(e, '#efeff1')}>
        chalk
      </button>
    </details>
  )
}
