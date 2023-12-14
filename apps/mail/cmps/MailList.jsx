import { MailFilter } from "./MailFilter.jsx";
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onUpdateMail, onRemoveMail }) {

    return (
        <section className="main">
            <MailFilter />
            <ul className="mail-preview">
                {mails.map(mail => (
                    <MailPreview key={mail.id} {... { mail, onUpdateMail, onRemoveMail }} />
                ))}
            </ul>
        </section>
    );
}

