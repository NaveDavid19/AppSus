import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onUpdateMail, onRemoveMail }) {

    return (
        <ul className="mail-preview">
            {mails.map(mail => (
                <MailPreview key={mail.id} {... { mail, onUpdateMail, onRemoveMail }} />
            ))}
        </ul>
    );
}

