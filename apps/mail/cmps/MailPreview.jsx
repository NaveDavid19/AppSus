const { Link } = ReactRouterDOM

export function MailPreview({ mails, onSetReadMail }) {

    function isRead(mail) {
        return mail.isRead ? "" : "unread"
    }

    return (

        <ul className="mail-preview">
            {mails.map(mail => (
                <Link onClick={() => onSetReadMail(mail)} key={mail.id} to={`/mail/${mail.id}`}>
                    <li>
                        <p className={isRead(mail)}>{mail.from.userName}</p>
                        <article className="mail-text">
                            <p className={isRead(mail)}>{mail.subject} - </p>
                            <p>{mail.body}</p>
                        </article>
                        <time>{mail.sentAt}</time>
                    </li>
                </Link>
            ))}
        </ul>
    );
}



