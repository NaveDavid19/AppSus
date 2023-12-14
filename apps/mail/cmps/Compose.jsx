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
            alert('Invalid Email Adress')
            return
        }
        mailService.save(newMail).then(onSendMail)
        setOpenCompose(!openCompose)
        showSuccessMsg('Mail successfully Sent!')
    }


    return <section className="compose">
        <header>New Message</header>
        <form onSubmit={handleSendMail}>
            <label htmlFor="to">To : </label>
            <input required onChange={handleChange} type="text" id="to" name="to" />

            <label htmlFor="subject">Subject : </label>
            <input required onChange={handleChange} type="text" id="subject" name="subject" />

            <label htmlFor="body"></label>
            <input required onChange={handleChange} className="compose-content" type="text" id="body" name="body" />

            <button >Send</button>
        </form>
    </section>
}