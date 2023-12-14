const { useRef, useEffect, useState } = React
const { Link } = ReactRouterDOM

export function NoteSearch() {
  const searchInputRef = useRef();
  const [activeType, setActiveType] = useState(null);
  const [activeColor, setActiveColor] = useState(null);

  useEffect(() => {
    // Triggering focus on the element when the component mounts
    searchInputRef.current.focus();
  }, []);

  const handleTypeClick = (type) => {
    setActiveType((prevType) => (prevType === type ? null : type));
  };

  const handleColorClick = (color) => {
    setActiveColor((prevColor) => (prevColor === color ? null : color));
  };

  return (
    <section className="note-search">
      <div className="search-title">
        <input ref={searchInputRef} type="text" />
        <button>X</button>
      </div>
      <div className="search-type">
        <h2>Types</h2>
        <button
          className={activeType === 'Todos' ? 'active' : ''}
          onClick={() => handleTypeClick('Todos')}
        >
          Todos
        </button>
        <button
          className={activeType === 'Images' ? 'active' : ''}
          onClick={() => handleTypeClick('Images')}
        >
          Images
        </button>
        <button
          className={activeType === 'Video' ? 'active' : ''}
          onClick={() => handleTypeClick('Video')}
        >
          Video
        </button>
      </div>
      <div className="search-color">
        <h2>Color</h2>
        <button
          className={activeColor === 'Color1' ? 'active' : ''}
          onClick={() => handleColorClick('Color1')}
        >
          Color1
        </button>
        <button
          className={activeColor === 'Color2' ? 'active' : ''}
          onClick={() => handleColorClick('Color2')}
        >
          Color2
        </button>
        <button
          className={activeColor === 'Color3' ? 'active' : ''}
          onClick={() => handleColorClick('Color3')}
        >
          Color3
        </button>
      </div>
      <Link to="/note">Back</Link>
    </section>
  );
}
