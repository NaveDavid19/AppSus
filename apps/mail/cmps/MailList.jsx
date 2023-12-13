import { mailService } from "../services/mail.service.js";
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails }) {


    function onSetReadMail(mail) {
        mail.isRead = true
        mailService.save(mail)
    }

    return (
        <section>
            <MailPreview mails={mails} onSetReadMail={onSetReadMail} />
        </section>
    );
}

