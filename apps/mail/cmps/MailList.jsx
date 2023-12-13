import { mailService } from "../services/mail.service.js";
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onUpdateMail }) {


    function onSetReadMail(mail) {
        mail.isRead = true
        mailService.save(mail)
        onUpdateMail()
    }

    return (
        <section>
            <MailPreview mails={mails} onSetReadMail={onSetReadMail} />
        </section>
    );
}

