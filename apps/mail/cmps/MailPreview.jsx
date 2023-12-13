const { Link } = ReactRouterDOM



export function MailPreview({ mails, onSetReadMail }) {
    return (
        <ul className="mail-preview">
            {mails.map(mail => (
                <Link onClick={() => onSetReadMail(mail)} key={mail.id} to={`/mail/${mail.id}`}>
                    <li>
                        <h2>{mail.from.userName}</h2>
                        <div className="mail-text">
                            <h2>{mail.subject} - </h2>
                            <p>{mail.body}</p>
                        </div>
                        <time>{mail.sentAt}</time>
                    </li>
                </Link>
            ))}
        </ul>
    );
}



