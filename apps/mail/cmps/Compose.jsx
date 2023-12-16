import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
const { useState } = React


export function Compose({ onSendMail, setOpenCompose, openCompose }) {
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())



    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setNewMail(prevMail => ({ ...prevMail, [field]: value }))
    }

    function handleSendMail(ev) {
        ev.preventDefault()
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(newMail.to)) {
            if (!emailRegex.test(newMail.to)) {
                Swal.fire({
                    title: "Failed to send",
                    text: 'Invalid Email Adress! Please enter a valid Email.',
                    icon: "error"
                });
                return
            }
        }
        mailService.save(newMail).then(onSendMail)
        showSuccessMsg('Mail successfully Sent!')
        setOpenCompose(!openCompose)
    }

    return <section className="compose-container">
        <div className="compose">
            <header>
                <p>New Message</p>
                <button onClick={() => setOpenCompose(!openCompose)}>X</button>
            </header>
            <form onSubmit={handleSendMail}>
                <input placeholder="To" required onChange={handleChange} type="text" id="to" name="to" />
                <input placeholder="Subject" required onChange={handleChange} type="text" id="subject" name="subject" />
                <textarea required onChange={handleChange} className="compose-content" id="body" name="body" />
                <div className="compose-btns">
                    <button >Send</button>
                </div>
            </form>
        </div>
    </section>
}