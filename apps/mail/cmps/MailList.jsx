import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onUpdateMail, onRemoveMail }) {

    return (
        <section className="main">
            <ul className="mail-preview">
                {mails.map(mail => (
                    <MailPreview key={mail.id} {... { mail, onUpdateMail, onRemoveMail }} />
                ))}
            </ul>
        </section>
    );
}

