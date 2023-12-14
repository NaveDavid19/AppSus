import { MailFilter } from "./MailFilter.jsx";
import { MailPreview } from "./MailPreview.jsx";


export function MailList({ mails, onUpdateMail, onRemoveMail, setFilterBy, filterBy, onSetFilter }) {

    return (
        <section className="main">
            <MailFilter {...{ setFilterBy, filterBy, onSetFilter }} />
            <ul className="mail-preview">
                {mails.map(mail => (
                    <MailPreview key={mail.id} {... { mail, onUpdateMail, onRemoveMail }} />
                ))}
            </ul>
        </section>
    );
}

