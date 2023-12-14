import { utilService } from "../../../services/util.service.js";
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
        <li className={mail.isRead ? "mail" : "unread-section mail"}>
            < input className="star" checked={mail.isStar} type="checkbox" onChange={() => handleStarMail(mail, !mail.isStar)
            } />
            < Link onClick={() => handleReadMail(mail, true)} to={`/mail/details/${mail.id}`}>
                <p className={readClassName}>{displayedUserName}</p>
            </Link >
            <Link onClick={() => handleReadMail(mail, true)} to={`/mail/details/${mail.id}`}>
                <article className="mail-text">
                    <p className={readClassName}>{mail.subject} - </p>
                    <p>{mail.body}</p>
                </article>
            </Link>
            <div >
                <p>{utilService.getDate(mail.sentAt)}</p>
                <section className={mail.isRead ? "mail-btn" : "mail-btn unread-section"}>
                    <button className="delete" title="Delete" onClick={() => handleRemoveMail(mail)}><i className="fa-solid fa-trash"></i></button>
                    <button title={`Mark as ${mail.isRead ? 'unread' : 'read'}`} onClick={() => handleReadMail(mail, !mail.isRead)}><i className={mail.isRead ? "fa-regular fa-envelope" : "fa-regular fa-envelope-open"} ></i></button>
                </section>
            </div>
        </li >
    );
}



