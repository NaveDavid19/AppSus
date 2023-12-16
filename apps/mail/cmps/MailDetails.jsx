import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM




export function MailDetails() {
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const arrow = isOpen ? '▲' : '▼';


    function nextMail() {
        mailService.getNextMailId(params.mailId).then(id => navigate(`/mail/${id} `))
    }
    function prevMail() {
        mailService.getPrevMailId(params.mailId).then(id => navigate(`/mail/${id} `))
    }

    useEffect(() => {
        loadMail()
    }, [params.mailId])


    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => setMail(mail))
            .catch(err => {
                console.log('err:', err)
                navigate('/mail')
            })
    }

    function onBack() {
        navigate('/mail/inbox')
    }
    if (!mail) return <div>Loading...</div>
    return (
        <section className="mail-details">
            <h2 className="mail-subject">{mail.subject}</h2>
            <h2 className="mail-title">{mail.from.userName} <span>{mail.from.mail}</span> </h2>
            <p className="mail-body">{mail.body}</p>
            <time className="mail-time">{mail.sentAt}</time>
            <div className="change-mail">
                <button onClick={nextMail}>Next Mail</button>
                <button onClick={prevMail}>Prev Mail</button>
            </div>
            <button onClick={onBack}>Back</button>
        </section>
    )

}