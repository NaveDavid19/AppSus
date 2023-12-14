import { mailService, loggedinUser } from "../services/mail.service.js";
const { Link } = ReactRouterDOM

export function MailPreview({ mail, onUpdateMail, onRemoveMail }) {
    const readClassName = mail.isRead ? "" : "unread";
    const displayedUserName = (mail.from === loggedinUser.email) ? mail.to : mail.from.userName;

    function handleReadMail(mail, isRead) {
        const readMail = {
            ...mail,
            isRead: isRead
        }
        mailService.save(readMail).then(onUpdateMail)
    }
    function handleStarMail(mail, isStar) {
        const readMail = {
            ...mail,
            isStar: isStar
        }
        mailService.save(readMail).then(onUpdateMail)
    }
    function handleRemoveMail(mailToRemove) {
        mailService.remove(mailToRemove.id).then(() => onRemoveMail(mailToRemove))
    }

    return (
        <li className="mail">
            <input className="star" checked={mail.isStar} type="checkbox" onChange={() => handleStarMail(mail, !mail.isStar)} />
            <Link onClick={() => handleReadMail(mail, true)} to={`/mail/${mail.id}`}>
                <p className={readClassName}>{displayedUserName}</p>
            </Link>
            <Link onClick={() => handleReadMail(mail, true)} to={`/mail/${mail.id}`}>
                <article className="mail-text">
                    <p className={readClassName}>{mail.subject} - </p>
                    <p>{mail.body}</p>
                </article>
            </Link>
            <div className="mail-btn">
                <p>{mail.sentAt}</p>
                <button className="delete" onClick={() => handleRemoveMail(mail)}>delete</button>
                <input checked={mail.isRead} type="checkbox" onChange={() => handleReadMail(mail, !mail.isRead)} />
            </div>
        </li>
    );
}



