import { SideBar } from '../cmps/SideBar.jsx'
import { MailList } from "../cmps/MailList.jsx"
import { mailService, Tabs } from "../services/mail.service.js"

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
        const updatedMails = mails.map(mail => (mail.id === updatedMail.id ? updatedMail : mail))
        setMails(updatedMails);
        setUnreadCount(updatedMails.filter(mail => !mail.isRead).length);

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
            <SideBar setOpenCompose={setOpenCompose} openCompose={openCompose} setSelectedTab={setSelectedTab} unreadCount={unreadCount} />
            <MailList {...{ mails, onUpdateMail, onRemoveMail }} />
        </section>
    )
}

