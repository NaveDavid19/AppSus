import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)


    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => setMails(mails))
            .catch(err => console.log('err', err))
    }

    function unreadCount() {
        let count = 0
        mails.forEach(mail => {
            if (!mail.isRead) count++
        })
        return count
    }



    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <h2>Inbox ({unreadCount()})</h2>
            <MailList mails={mails} />
        </section>
    )
}

