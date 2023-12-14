const { useRef, useState, useEffect } = React

export function ColorButtonsAdd({ changeBackgroundColor }) {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)
  const paletteRef = useRef(null)

  const handleButtonClick = (e, color) => {
    changeBackgroundColor(color)
    // Additional logic if needed
  }

  const handlePaletteToggle = () => {
    setIsPaletteOpen((prev) => !prev)
  }

  const handleClickOutsidePalette = (event) => {
    if (
      !isPaletteOpen &&
      !paletteRef.current.contains(event.target)
    ) {
      setIsPaletteOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutsidePalette)

    return () => {
      document.removeEventListener('click', handleClickOutsidePalette)
    }
  }, [isPaletteOpen])

  return (
    <section className="color-buttons">
      <button
        type="button"
        className="open-palette"
        onClick={handlePaletteToggle}>
        <i className="fa-solid fa-brush"></i>
      </button>
      <div
        className={`color-palette ${isPaletteOpen ? 'open' : 'closed'}`}
        ref={paletteRef}>
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
      </div>
    </section>
  )
}
