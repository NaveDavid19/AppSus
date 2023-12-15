


export function MailFilterSelect() {



    return (
        <section>
            <select name="filters" id="filter-select" >
                <option value="">Filter By:</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
                <option value="date">Date</option>
            </select>
        </section>
    )
}