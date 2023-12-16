import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onUpdateMail, onRemoveMail, setUnreadCount }) {

    return (
        <section className="main">
            <ul className="mail-preview">
                {mails.map(mail => (
                    <MailPreview key={mail.id} {... { mail, onUpdateMail, onRemoveMail, setUnreadCount }} />
                ))}
            </ul>
        </section>
    );
}

