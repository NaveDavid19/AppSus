
const { useState } = React

export function LongText({ txt, length }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const displayText = isExpanded ? txt : txt.slice(0, length) + '...';

    return <section>
        <h1>Book Description : <p>{displayText}</p></h1>

        {txt.length > length && (
            <button onClick={toggleExpand}>
                {isExpanded ? 'Read less' : 'Read more'}
            </button>
        )}
    </section>
}


