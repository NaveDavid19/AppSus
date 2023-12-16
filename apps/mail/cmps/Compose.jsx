import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
const { useState, useEffect } = React
const { useLocation } = ReactRouterDOM


export function Compose({ onSendMail, setOpenCompose, openCompose }) {
    const [newMail, setNewMail] = useState(mailService.getEmptyMail())
    const location = useLocation()
    console.log(mailService.getEmptyMail());

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const subjectParam = searchParams.get("subject") || "";
        const bodyParam = searchParams.get("body") || "";

        setNewMail(prevMail => ({ ...prevMail, subject: subjectParam, body: bodyParam }));

        return () => {
            // Log the current state before updating
            const updatedSearchParams = new URLSearchParams(location.search);
            updatedSearchParams.set("subject", "");
            updatedSearchParams.set("body", "");
            window.history.replaceState(
                null,
                null,
                `${location.pathname}?${updatedSearchParams}`
            );

            // Set the state to an empty mail
            setNewMail(prevMail => ({ ...prevMail, ...mailService.getEmptyMail() }));
        };
    }, [location.search]);








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
        setOpenCompose(!openCompose);
    }


    return <section className="compose-container">
        <div className="compose">
            <header>
                <p>New Message</p>
                <button onClick={() => setOpenCompose(!openCompose)}>X</button>
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