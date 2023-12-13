import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState } = React


export function Compose({ onSendMail }) {
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())

    const disableSend = !(newMail.to && newMail.subject && newMail.body)


    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setNewMail(prevMail => ({ ...prevMail, [field]: value }))
    }

    function handleSendMail(ev) {
        ev.preventDefault()
        mailService.save(newMail).then(onSendMail)
        showSuccessMsg('Mail successfully Sent!')
    }


    return <section className="compose">
        <header>New Message</header>
        <form onSubmit={handleSendMail}>
            <label htmlFor="to">To : </label>
            <input onChange={handleChange} type="text" id="to" name="to" />

            <label htmlFor="subject">Subject : </label>
            <input onChange={handleChange} type="text" id="subject" name="subject" />

            <label htmlFor="body"></label>
            <input onChange={handleChange} className="compose-content" type="text" id="body" name="body" />

            <button disabled={disableSend}>Send</button>
        </form>
    </section>
}