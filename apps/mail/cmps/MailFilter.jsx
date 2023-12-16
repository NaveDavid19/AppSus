import { utilService } from "../../../services/util.service.js"
import { MailFilterSelect } from "./MailFilterSelect.jsx"

const { useState, useEffect, useRef } = React


export function MailFilter({ filterBy, setFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const debounceOnSearch = useRef(utilService.debounce(setFilterBy, 500))


    useEffect(() => {
        if (filterBy.tab) {
            debounceOnSearch.current(filterByToEdit)
        }
    }, [filterByToEdit])

    function handleSubmit(ev) {
        ev.preventDefault()
        setFilterBy(filterByToEdit)
    }
    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setFilterByToEdit(prevFilter => ({ ...prevFilter, tab: filterBy.tab, [field]: value }))
    }

    const { txt } = filterByToEdit
    return (
        <section className="search">
            <MailFilterSelect {...{ setFilterBy }} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="txt"></label>
                <div className="search-container">
                    <button className="fa-solid fa-magnifying-glass"></button>
                    <input value={txt} className="search" placeholder="Search mail" onChange={handleChange} type="text" id="txt" name="txt" />
                </div>
            </form>
        </section>
    )
}