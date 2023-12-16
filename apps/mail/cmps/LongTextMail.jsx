const { useState, useEffect } = React;

export function LongTextMail({ txt }) {
  const [displayText, setDisplayText] = useState(txt);
  const [maxWidth, setMaxWidth] = useState(60); // Default value, adjust as needed

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      // Adjust the calculation based on your requirements
      const newMaxWidth = Math.floor((screenWidth - 30 - 200 - 120 - 100) / 20); // Adjust the division factor as needed
      setMaxWidth(newMaxWidth);
    };

    handleResize(); // Set initial maxWidth
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
