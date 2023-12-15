import { SideBar } from '../cmps/SideBar.jsx'
import { MailList } from "../cmps/MailList.jsx"
import { mailService, Tabs } from "../services/mail.service.js"
const { useParams, Outlet } = ReactRouterDOM
const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [unreadCount, setUnreadCount] = useState(0);
    const [openCompose, setOpenCompose] = useState(false)
    const [loadingMails, setLoadingMails] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const params = useParams()

    useEffect(() => {
        loadMails()
    }, [])

    useEffect(() => {
        if (!loadingMails) {
            loadMails()
        }
    }, [filterBy])

    useEffect(() => {
        console.log("Selected TAB is " + params.tab)
        setFilterBy(filterBy => ({ ...filterBy, tab: params.tab, txt: '' }))
    }, [params.tab])

    function loadMails() {
        setLoadingMails(true)
        mailService.query(filterBy)
            .then(mails => {
                if (params.tab === Tabs.INBOX && mailService.areObjectsEqual(mailService.getDefaultFilter(), filterBy)) {
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
        if (params.tab === Tabs.SENT) {
            setMails([...mails, mailToSend])
            setOpenCompose(false)
        }
    }

    function onRemoveMail(mailToRemove) {
        if (mailToRemove.removedAt) {
            mailService.remove(mailToRemove.id)
                .then(() => {
                    setMails(mails.filter(mail => mail.id !== mailToRemove.id));
                })
                .catch(err => console.error('Error removing mail:', err));
        } else {
            const removeMail = {
                ...mailToRemove,
                removedAt: Date.now()
            };
            mailService.save(removeMail)
                .then(() => {
                    setMails(mails.filter(mail => mail.id !== mailToRemove.id));
                })
                .catch(err => console.error('Error removing mail:', err));
        }
    }

    if (loadingMails) return <img className="loader" src="assets\img\logos\SusMail.png" />
    return (
        <section className="mail-index">
            <SideBar {...{ setOpenCompose, openCompose, unreadCount, onSendMail }} />
            {!params.mailId && <MailList {...{ mails, onUpdateMail, onRemoveMail, filterBy, setFilterBy }} />}
            {params.mailId && <Outlet />}
        </section>
    )
}

