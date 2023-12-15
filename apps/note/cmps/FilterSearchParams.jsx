const { Link } = ReactRouterDOM

export function FilterSearchParams({
  searchInputRef,
  activeType,
  handleTypeClick,
  activeColor,
  handleColorClick,
  onSearchParams,
}) {

  const handleEnterKey = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      onSearchParams()
    }
  }
  return (
    <section className="filter-search-params">
      <div className="search-title">
        <button onClick={onSearchParams} className="search-btn">
        <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search note"
          onKeyDown={handleEnterKey}
        />
        <Link to="/note">
          <button className="close-btn">X</button>
        </Link>
      </div>
      <div className="search-type-wrapper">
        <h2>Types</h2>
        <div className="search-type">
          <button
            className={activeType === 'noteTodos' ? 'active' : ''}
            onClick={() => handleTypeClick('noteTodos')}>
            <i className="fa-regular fa-file"></i>
            <span>Todos</span>
          </button>
          <button
            className={activeType === 'noteImg' ? 'active' : ''}
            onClick={() => handleTypeClick('noteImg')}>
            <i className="fa-solid fa-camera"></i>
            <span>Images</span>
          </button>
          <button
            className={activeType === 'noteVideo' ? 'active' : ''}
            onClick={() => handleTypeClick('noteVideo')}>
            <i className="fa-solid fa-video"></i>
            <span>Videos</span>
          </button>
        </div>
      </div>
      <div className="search-color-wrapper">
        <h2>Colors</h2>
        <div className="search-color">
          <button
            style={{ backgroundColor: '#faafa8' }}
            className={activeColor === '#faafa8' ? 'active' : ''}
            onClick={() => handleColorClick('#faafa8')}>
            coral
          </button>
          <button
            style={{ backgroundColor: '#f39f76' }}
            className={activeColor === '#f39f76' ? 'active' : ''}
            onClick={() => handleColorClick('#f39f76')}>
            peach
          </button>
          <button
            style={{ backgroundColor: '#fff8b8' }}
            className={activeColor === '#fff8b8' ? 'active' : ''}
            onClick={() => handleColorClick('#fff8b8')}>
            sand
          </button>
          <button
            style={{ backgroundColor: '#e2f6d3' }}
            className={activeColor === '#e2f6d3' ? 'active' : ''}
            onClick={() => handleColorClick('#e2f6d3')}>
            mint
          </button>
          <button
            style={{ backgroundColor: '#b4ddd3' }}
            className={activeColor === '#b4ddd3' ? 'active' : ''}
            onClick={() => handleColorClick('#b4ddd3')}>
            sage
          </button>
          <button
            style={{ backgroundColor: '#d4e4ed' }}
            className={activeColor === '#d4e4ed' ? 'active' : ''}
            onClick={() => handleColorClick('#d4e4ed')}>
            fog
          </button>
          <button
            style={{ backgroundColor: '#aeccdc' }}
            className={activeColor === '#aeccdc' ? 'active' : ''}
            onClick={() => handleColorClick('#aeccdc')}>
            strom
          </button>
          <button
            style={{ backgroundColor: '#291d2e' }}
            className={activeColor === '#291d2e' ? 'active' : ''}
            onClick={() => handleColorClick('#291d2e')}>
            dusk
          </button>
          <button
            style={{ backgroundColor: '#f6e2dd' }}
            className={activeColor === '#f6e2dd' ? 'active' : ''}
            onClick={() => handleColorClick('#f6e2dd')}>
            blossom
          </button>
          <button
            style={{ backgroundColor: '#e9e3d4' }}
            className={activeColor === '#e9e3d4' ? 'active' : ''}
            onClick={() => handleColorClick('#e9e3d4')}>
            clay
          </button>
          <button
            style={{ backgroundColor: '#efeff1' }}
            className={activeColor === '#efeff1' ? 'active' : ''}
            onClick={() => handleColorClick('#efeff1')}>
            chalk
          </button>
        </div>
      </div>
    </section>
  )
}
