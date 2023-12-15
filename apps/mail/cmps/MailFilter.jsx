const { useState, useEffect } = React


export function MailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [isSubmit, setSubmit] = useState(false)


    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [isSubmit])

    function onSetFilterBy(ev) {
        ev.preventDefault()
        setSubmit(true)
        onSetFilter(filterByToEdit)
    }
    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { txt } = filterByToEdit
    return (
        <section className="search">
            <form onSubmit={onSetFilterBy}>
                <label htmlFor="txt"></label>
                <div className="search-container">
                    <button className="fa-solid fa-magnifying-glass"></button>
                    <input value={txt} className="search" placeholder="Search mail" onChange={handleChange} type="text" id="txt" name="txt" />
                </div>
            </form>
        </section>
    )
}