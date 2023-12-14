export function FilterSearchParams({
  searchInputRef,
  activeType,
  handleTypeClick,
  activeColor,
  handleColorClick,
  onSearchParams,
}) {
  return (
    <section className="filter-search-params">
      <div className="search-title">
        <input ref={searchInputRef} type="text" />
        <button>X</button>
      </div>
      <div className="search-type">
        <h2>Types</h2>
        <button
          className={activeType === 'noteTodos' ? 'active' : ''}
          onClick={() => handleTypeClick('noteTodos')}>
          Todos
        </button>
        <button
          className={activeType === 'noteImg' ? 'active' : ''}
          onClick={() => handleTypeClick('noteImg')}>
          Images
        </button>
        <button
          className={activeType === 'noteVideo' ? 'active' : ''}
          onClick={() => handleTypeClick('noteVideo')}>
          Video
        </button>
      </div>
      <div className="search-color">
        <h2>Color</h2>
        <button
          className={activeColor === 'Color1' ? 'active' : ''}
          onClick={() => handleColorClick('Color1')}>
          Color1
        </button>
        <button
          className={activeColor === 'Color2' ? 'active' : ''}
          onClick={() => handleColorClick('Color2')}>
          Color2
        </button>
        <button
          className={activeColor === 'Color3' ? 'active' : ''}
          onClick={() => handleColorClick('Color3')}>
          Color3
        </button>
      </div>

      <button onClick={onSearchParams} className="search-btn">Search</button>
    </section>
  )
}
