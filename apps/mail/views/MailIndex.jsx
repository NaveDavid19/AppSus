import { Compose } from "../cmps/Compose.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService, Tabs } from "../services/mail.service.js"
const { Link } = ReactRouterDOM

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [unreadCount, setUnreadCount] = useState(0);
    const [openCompose, setOpenCompose] = useState(false)
    const [selectedTab, setSelectedTab] = useState(Tabs.INBOX)
    const [loadingMails, setLoadingMails] = useState(mails.length === 0)

    useEffect(() => {
        initMails()
    }, [selectedTab])

    function initMails() {
        setLoadingMails(true)
        mailService.query(selectedTab)
            .then(mails => {
                if (selectedTab === Tabs.INBOX) {
                    setUnreadCount(mails.filter(mail => !mail.isRead).length);
                }
                setMails(mails)
                setLoadingMails(false)
            })
            .catch(err => console.log('err', err))
    }

    function onUpdateMail(updatedMail) {
        setMails(mails.map(mail => (mail.id === updatedMail.id ? updatedMail : mail)));
    }

    function onSendMail(mailToSend) {
        if (selectedTab === Tabs.SENT) {
            setMails([...mails, mailToSend])
            setOpenCompose(false)
        }
    }


    function onRemoveMail(mailToRemove) {
        setMails(mails.filter(mail => mail.id !== mailToRemove.id))
    }

    if (loadingMails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <nav className="side-bar">
                <div className="side-bar-list"></div>
                <button title="Compose" onClick={() => setOpenCompose(!openCompose)}><i className="fa-solid fa-pen"></i></button>
                {openCompose && <Compose {...{ onSendMail }} />}
                <Link title="Inbox" className="inbox" to={`/mail/${Tabs.INBOX}`} onClick={() => setSelectedTab(Tabs.INBOX)}><h2><i className="fa-solid fa-inbox"></i> ({unreadCount})</h2></Link>
                <Link title="Starred" className="starred" to={`/mail/${Tabs.STAR}`} onClick={() => setSelectedTab(Tabs.STAR)}><h2><i className="fa-regular fa-star"></i></h2></Link>
                <Link title="Sent" className="sent" to={`/mail/${Tabs.SENT}`} onClick={() => setSelectedTab(Tabs.SENT)}><h2><i className="fa-regular fa-paper-plane"></i></h2></Link>
            </nav>
            <MailList {...{ mails, selectedTab, onUpdateMail, onRemoveMail }} />
        </section>
    )
}

