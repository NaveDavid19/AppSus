const { Link } = ReactRouterDOM

export function MailList({ mails }) {
    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <Link to={`/mail/${mail.id} `}>
                    <li key={mail.id}>
                        <h2>{mail.from.userName}</h2>
                        <h2>{mail.subject}</h2>
                        <p>{mail.body}</p>
                        <time>{mail.sentAt}</time>
                    </li>
                </Link>
            ))}
        </ul>
    );
}

