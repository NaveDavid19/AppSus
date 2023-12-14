import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const Tabs = {
    INBOX: "inbox",
    SENT: "sent",
    STAR: "star",
    TRASH: "trash"
}

export const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getNextMailId,
    getPrevMailId,
    // getFilterBy,
    // setFilterBy,
    // getDefaultFilter,

}

function query(selectedTab) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            switch (selectedTab) {
                case Tabs.INBOX:
                    return mails.filter(mail => mail.to === loggedinUser.email)
                case Tabs.SENT:
                    return mails.filter(mail => mail.from === loggedinUser.email)
                case Tabs.STAR:
                    return mails.filter(mail => mail.isStar === true)
                default:
                    return mails
            }
        })
}
// function query(selectedTab, filterBy = getDefaultFilter()) {
//     return storageService.query(MAIL_KEY)
//         .then(mails => {
//             let filteredMails
//             switch (selectedTab) {
//                 case Tabs.INBOX:
//                     filteredMails = mails.filter(mail => mail.to === loggedinUser.email)
//                     filteredMails = filter(mails, filterBy, 'from')
//                     return filteredMails
//                 case Tabs.SENT:
//                     filteredMails = mails.filter(mail => mail.from === loggedinUser.email)
//                     filteredMails = filter(mails, filterBy, 'to')
//                     return filteredMails
//                 default:
//                     return mails
//             }
//         })
// }


// function filter(mails, filterBy, prop) {
//     if (filterBy[prop]) {
//         const regex = new RegExp(filterBy[prop], 'i')
//         mails = mails.filter(mail => regex.test(mail.title))
//     }
//     if (filterBy.subject) {
//         const regex = new RegExp(filterBy.subject, 'i')
//         mails = mails.filter(mail => regex.test(mail.subject))
//     }
//     if (filterBy.body) {
//         const regex = new RegExp(filterBy.body, 'i')
//         mails = mails.filter(mail => regex.test(mail.body))
//     }

//     return mails
// }

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '', body = '', to = '') {
    return {
        subject,
        body,
        to,
        isRead: true,
        sentAt: Date.now(),
        removedAt: null,
        isStar: false,
        from: loggedinUser.email,
    }
}




// function getFilterBy() {
//     return { ...filterBy }
// }

// function setFilterBy(filterBy = {}) {
//     if (filterBy.txt !== undefined) filterBy.txt = filterBy.txt
//     if (filterBy.price !== undefined) filterBy.price = filterBy.price
//     if (filterBy.publishedDate !== undefined) filterBy.publishedDate = filterBy.publishedDate
//     return filterBy
// }
// function getDefaultFilter() {
//     return { txt: '', price: '', publishedDate: '' }
// }

function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            let getMailIdx = mails.findIndex(mail => mail.id === mailId) + 1
            if (getMailIdx === mails.length) getMailIdx = 0
            return mails[getMailIdx].id
        })
}
function getPrevMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            let prevMailIdx = mails.findIndex(mails => mails.id === mailId) - 1
            if (prevMailIdx === -1) prevMailIdx = mails.length - 1
            return mails[prevMailIdx].id
        })
}

//Private functions
function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            {
                id: 'e101',
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Momo',
                    mail: 'momo@momo.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: 'e105',
                subject: 'Hey !',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Nave',
                    mail: 'momo@momo.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: 'e106',
                subject: 'Last week updates in your shared folders ',
                body: `Activity in Shared Folders Here's what happent in your shared folders last week`,
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Dropbox',
                    mail: 'momo@momo.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: 'e107',
                subject: 'Your Access to the new Bing ',
                body: `We're excited for you to preview the future of search. Your Access to the new Bing `,
                isRead: false,
                sentAt: 1551133930594,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Microsof Bing',
                    mail: 'momo@momo.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: 'e102',
                subject: 'Hey!',
                body: 'Test Test Test Test Test',
                isRead: false,
                sentAt: 1551133930595,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Lior',
                    mail: 'lior@lior.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: 'e103',
                subject: 'Testing!',
                body: 'rgegergergegeg',
                isRead: false,
                sentAt: 1551133930596,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Dima',
                    mail: 'dima@dima.com'
                },
                to: 'user@appsus.com'
            },
        ]
    }
    utilService.saveToStorage(MAIL_KEY, mails)
}