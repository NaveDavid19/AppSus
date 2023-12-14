import { Tabs } from "../services/mail.service.js"
import { Compose } from "./Compose.jsx";


const { Link } = ReactRouterDOM


export function SideBar({ setOpenCompose, openCompose, setSelectedTab, unreadCount, onSendMail }) {
    return <nav className="side-bar">
        <div className="side-bar-list">
            <button className="compose-btn" title="Compose" onClick={() => setOpenCompose(!openCompose)}><i className="fa-solid fa-pen"></i></button>
            {openCompose && <Compose {...{ onSendMail, setOpenCompose, openCompose }} />}
            <Link title="Inbox" className="side-bar-btn inbox" to={`/mail/${Tabs.INBOX}`} onClick={() => setSelectedTab(Tabs.INBOX)}><i className="fa-solid fa-inbox"> </i><span className="side-btn"> Inbox</span> ({unreadCount})</Link>
            <Link title="Starred" className="side-bar-btn starred" to={`/mail/${Tabs.STAR}`} onClick={() => setSelectedTab(Tabs.STAR)}><i className="fa-regular fa-star"></i><span className="side-btn"> Starred</span></Link>
            <Link title="Sent" className="side-bar-btn sent" to={`/mail/${Tabs.SENT}`} onClick={() => setSelectedTab(Tabs.SENT)}><i className="fa-regular fa-paper-plane"></i><span className="side-btn"> Sent</span></Link>
        </div>
    </nav>;
}
