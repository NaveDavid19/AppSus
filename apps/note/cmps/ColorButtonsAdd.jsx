export function ColorButtonsAdd({
  changeBackgroundColor
}) {
  return <details>
        <summary>Colors</summary>
        <button onClick={() => {
      changeBackgroundColor('#faafa8');
    }}>
          coral
        </button>
        <button onClick={() => {
      changeBackgroundColor('#f39f76');
    }}>
          peach
        </button>
        <button onClick={() => {
      changeBackgroundColor('#fff8b8');
    }}>
          sand
        </button>
        <button onClick={() => {
      changeBackgroundColor('#e2f6d3');
    }}>
          mint
        </button>
        <button onClick={() => {
      changeBackgroundColor('#b4ddd3');
    }}>
          sage
        </button>
        <button onClick={() => {
      changeBackgroundColor('#aeccdc');
    }}>
          storm
        </button>
        <button onClick={() => {
      changeBackgroundColor('#f6e2dd');
    }}>
          blossom
        </button>
        <button onClick={() => {
      changeBackgroundColor('#e9e3d4');
    }}>
          clay
        </button>
        <button onClick={() => {
      changeBackgroundColor('#efeff1');
    }}>
          chalk
        </button>
      </details>;
}
  