import { Compose } from "../cmps/Compose.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [compose, setCompose] = useState(false)


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
            !mail.isRead ? count++ : count
        })
        return count
    }



    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <button onClick={() => setCompose(!compose)}>Compose</button>
            {compose && <Compose />}
            <h2>Inbox ({unreadCount()})</h2>
            <MailList mails={mails} />
        </section>
    )
}

