export function ColorButtons({ changeBackgroundColor, note }) {
  return (
    <details>
      <summary>Colors</summary>
      <button
        onClick={() => {
          changeBackgroundColor('#faafa8', note)
        }}>
        coral
      </button>
      <button
        onClick={() => {
          changeBackgroundColor('#f39f76', note)
        }}>
        peach
      </button>
      <button
        onClick={() => {
          changeBackgroundColor('#fff8b8', note)
        }}>
        sand
      </button>
      <button
        onClick={() => {
          changeBackgroundColor('#e2f6d3', note)
        }}>
        mint
      </button>
      <button
        onClick={() => {
          changeBackgroundColor('#b4ddd3', note)
        }}>
        sage
      </button>
      <button
        onClick={() => {
          changeBackgroundColor('#aeccdc', note)
        }}>
        storm
      </button>
      <button
        onClick={() => {
          changeBackgroundColor('#f6e2dd', note)
        }}>
        blossom
      </button>
      <button
        onClick={() => {
          changeBackgroundColor('#e9e3d4', note)
        }}>
        clay
      </button>
      <button
        onClick={() => {
          changeBackgroundColor('#efeff1', note)
        }}>
        chalk
      </button>
    </details>
  )
}
