export function MailFilterSelect({ setFilterBy }) {

    function handleSelect(ev) {
        const selectedFilter = ev.target.value
        setFilterBy((prevFilter) => ({ tab: prevFilter.tab, txt: prevFilter.txt, [selectedFilter]: true }))
    }

    return (
        <section>
            <select onChange={handleSelect} name="filters" id="filter-select" className="custom-select"  >
                <option value="" hidden>Filter By:</option>
                <option value="">None</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
                <option value="date">Date</option>
            </select>
        </section>
    )
}