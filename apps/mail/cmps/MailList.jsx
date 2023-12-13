import { mailService } from "../services/mail.service.js";

const { Link } = ReactRouterDOM

export function MailList({ mails }) {


    function setReadMail(mail) {
        console.log(mail);
        mail.isRead = true
        mailService.save(mail)
        console.log(mail);
    }

    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <Link onClick={() => setReadMail(mail)} key={mail.id} to={`/mail/${mail.id} `}>
                    <li >
                        <h2>{mail.from.userName}</h2>
                        <h2>{mail.subject}</h2>
                        <p>{mail.body}</p>
                        <time>{mail.sentAt}</time>
                    </li>
                </Link>
            )}
        </ul>
    );
}

