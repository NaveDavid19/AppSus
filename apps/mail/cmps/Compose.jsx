import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
const { useState, useEffect } = React
const { useLocation, useNavigate } = ReactRouterDOM


export function Compose({ onSendMail, onClose }) {
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    const location = useLocation()
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {
        const subjectParam = searchParams.get("subject");
        const bodyParam = searchParams.get("body");
        if (subjectParam || bodyParam) {
            setNewMail(prevMail => ({ ...prevMail, subject: subjectParam, body: bodyParam }));
        }

        return (() => {
            if (subjectParam || bodyParam) {
                setNewMail(mailService.getEmptyMail())
                const baseUrl = `/mail`;
                navigate(baseUrl)
            }
        })
    }, []);

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setNewMail(prevMail => ({ ...prevMail, [field]: value }))
    }

    function handleSendMail(ev) {
        ev.preventDefault();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(newMail.to)) {
            Swal.fire({
                title: "Failed to send",
                text: 'Invalid Email Address! Please enter a valid Email.',
                icon: "error"
            });
            return;
        }

        mailService.save(newMail).then(onSendMail);
        showSuccessMsg('Mail successfully Sent!');
        onClose()
    }

    return <section className="compose-container">
        <div className="compose">
            <header>
                <p>New Message</p>
                <button onClick={onClose}>X</button>
            </header>
            <form onSubmit={handleSendMail}>
                <input placeholder="To" required onChange={handleChange} type="text" id="to" name="to" />
                <input value={newMail.subject} placeholder="Subject" required onChange={handleChange} type="text" id="subject" name="subject" />
                <textarea value={newMail.body} required onChange={handleChange} className="compose-content" id="body" name="body" />
                <div className="compose-btns">
                    <button >Send</button>
                </div>
            </form>
        </div>
    </section>
}