const { useState, useEffect } = React;

export function LongTextMail({ txt }) {
  const [displayText, setDisplayText] = useState(txt);
  const [maxWidth, setMaxWidth] = useState(60);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const newMaxWidth = Math.floor((screenWidth - 30 - 200 - 120 - 100) / 20);
      setMaxWidth(newMaxWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setDisplayText(txt.length > maxWidth ? `${txt.substr(0, maxWidth)}...` : txt);
  }, [txt, maxWidth]);

  return <p>{displayText}</p>;
}
