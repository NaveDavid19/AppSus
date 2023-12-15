import { MailFilter } from "./MailFilter.jsx";
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onUpdateMail, onRemoveMail, setFilterBy, filterBy }) {

    return (
        <section className="main">
            <MailFilter {...{ setFilterBy, filterBy }} />
            <ul className="mail-preview">
                {mails.map(mail => (
                    <MailPreview key={mail.id} {... { mail, onUpdateMail, onRemoveMail }} />
                ))}
            </ul>
        </section>
    );
}

