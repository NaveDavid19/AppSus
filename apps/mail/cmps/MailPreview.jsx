import { mailService, loggedinUser } from "../services/mail.service.js";
const { Link } = ReactRouterDOM
const { useState, useEffect } = React

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
    function handleRemoveMail(mailToRemove) {
        mailService.remove(mailToRemove.id).then(() => onRemoveMail(mailToRemove))
    }

    return (
        <ul className="mail-preview">
            <li>
                <Link onClick={() => handleReadMail(mail, true)} to={`/mail/${mail.id}`}>
                    <p className={readClassName}>{displayedUserName}</p>
                    <article className="mail-text">
                        <p className={readClassName}>{mail.subject} - </p>
                        <p>{mail.body}</p>
                    </article>
                    <time>{mail.sentAt}</time>
                </Link>
                <button onClick={() => handleRemoveMail(mail)}>delete</button>
                <input checked={mail.isRead} type="checkbox" onChange={() => handleReadMail(mail, !mail.isRead)} />
            </li>
        </ul>
    );
}



