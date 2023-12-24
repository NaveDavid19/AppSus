import { Tabs } from "../services/mail.service.js"
const { Link } = ReactRouterDOM

export function SideBar({ setOpenCompose, openCompose, unreadCount }) {


    return <nav className="side-bar">
        <div className="side-bar-list">
            <button className="side-bar-btn compose-btn" title="Compose" onClick={() => setOpenCompose(!openCompose)}><i className="fa-solid fa-pen"></i><span className="side-btn">Compose</span></button>
            <Link title="Inbox" className="side-bar-btn inbox" to={`/mail/${Tabs.INBOX}`}><i className="fa-solid fa-inbox"> </i><span className="side-btn"> Inbox</span> ({unreadCount})</Link>
            <Link title="Starred" className="side-bar-btn starred" to={`/mail/${Tabs.STAR}`}><i className="fa-regular fa-star"></i><span className="side-btn"> Starred</span></Link>
            <Link title="Sent" className="side-bar-btn sent" to={`/mail/${Tabs.SENT}`}><i className="fa-regular fa-paper-plane"></i><span className="side-btn"> Sent</span></Link>
            <Link title="Trash" className="side-bar-btn trash" to={`/mail/${Tabs.TRASH}`}><i className="fa-solid fa-trash"></i><span className="side-btn"> Trash</span></Link>
        </div>
    </nav>;
}
