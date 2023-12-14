import { Tabs } from "../services/mail.service.js"


const { Link } = ReactRouterDOM


export function SideBar({
    setOpenCompose,
    openCompose,
    setSelectedTab,
    unreadCount
}) {
    return <nav className="side-bar">
        <div className="side-bar-list"></div>
        <button title="Compose" onClick={() => setOpenCompose(!openCompose)}><i className="fa-solid fa-pen"></i></button>
        {openCompose && <Compose {...{
            onSendMail
        }} />}
        <Link title="Inbox" className="inbox" to={`/mail/${Tabs.INBOX}`} onClick={() => setSelectedTab(Tabs.INBOX)}><h2><i className="fa-solid fa-inbox"></i> ({unreadCount})</h2></Link>
        <Link title="Starred" className="starred" to={`/mail/${Tabs.STAR}`} onClick={() => setSelectedTab(Tabs.STAR)}><h2><i className="fa-regular fa-star"></i></h2></Link>
        <Link title="Sent" className="sent" to={`/mail/${Tabs.SENT}`} onClick={() => setSelectedTab(Tabs.SENT)}><h2><i className="fa-regular fa-paper-plane"></i></h2></Link>
    </nav>;
}
