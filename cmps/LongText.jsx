const { useState } = React

export function LongText({ txt, length }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  let displayText

  if (txt.length < length) displayText = txt
  else displayText = isExpanded ? txt : txt.slice(0, length) + '...'

  function renderTextWithLineBreaks(text) {
    // Replace newline characters (\n) with <br> HTML element
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
  }

  return (
    <section>
      <h4>{renderTextWithLineBreaks(displayText)}</h4>

      {txt.length > length && (
        <button onClick={toggleExpand}>
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </section>
  )
}
