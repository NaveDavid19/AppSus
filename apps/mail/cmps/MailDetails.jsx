import { utilService } from "../../../services/util.service.js"
import { mailService, loggedinUser } from "../services/mail.service.js"
// import { mailService, loggedinUser } from "../services/mail.service.js";


const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM




export function MailDetails() {
    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()



    function nextMail() {
        mailService.getNextMailId(params.mailId).then(id => navigate(`/mail/details/${id} `))
    }
    function prevMail() {
        mailService.getPrevMailId(params.mailId).then(id => navigate(`/mail/details/${id} `))
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
            <div className="details-img-name">
                <div className="left-side">
                    <img src="assets\img\logos\unnamed.webp" alt="" />
                    <h2 className="mail-title">{mail.from.userName} <span>{(mail.from === loggedinUser.email) ? mail.to : mail.from.mail}</span> </h2>
                </div>
                <div className="right-side">
                    <time className="mail-time">{utilService.getDate(mail.sentAt)}</time>

                </div>
            </div>
            <p className="mail-body">{mail.body}</p>
            <div className="change-mail">
                <button onClick={nextMail}>Next Mail</button>
                <button onClick={prevMail}>Prev Mail</button>
            </div>
            <button className="back-btn" onClick={onBack}>Back</button>
        </section>
    )

}