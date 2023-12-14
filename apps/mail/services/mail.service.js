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

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            switch (filterBy.tab) {
                case Tabs.INBOX:
                    return mails.filter(mail => mail.to === loggedinUser.email)
                case Tabs.SENT:
                    return mails.filter(mail => mail.from === loggedinUser.email)
                case Tabs.STAR:
                    return mails.filter(mail => mail.isStar)
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
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1702245600000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Momo',
                    mail: 'momo@momo.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Hey !',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1701381600000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Nave',
                    mail: 'momo@momo.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Last week updates in your shared folders ',
                body: `Activity in Shared Folders Here's what happent in your shared folders last week`,
                isRead: false,
                sentAt: 1700690400000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Dropbox',
                    mail: 'momo@momo.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Your Access to the new Bing ',
                body: `We're excited for you to preview the future of search. Your Access to the new Bing `,
                isRead: false,
                sentAt: 1699740000000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Microsof Bing',
                    mail: 'momo@momo.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Hey!',
                body: 'Test Test Test Test Test',
                isRead: true,
                sentAt: 1699730000000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Lior',
                    mail: 'lior@lior.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Testing!',
                body: 'rgegergergegeg',
                isRead: false,
                sentAt: 1676757600000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Dima',
                    mail: 'dima@dima.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Important Information Regarding Your Google Cloud Account',
                body: 'We have detected unusual activity on your Google Cloud account. Please review and take necessary actions.',
                isRead: false,
                sentAt: 1699731000000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Google Cloud Security',
                    mail: 'security@google.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Your Recent Google Cloud Access Attempt',
                body: 'We noticed an attempt to access your Google Cloud account from a new device. Confirm or deny this activity.',
                isRead: true,
                sentAt: 1699732000000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Google Cloud Support',
                    mail: 'support@googlecloud.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Action Required: Google Cloud Account Verification',
                body: 'To ensure the security of your Google Cloud account, please verify your identity through the provided link.',
                isRead: false,
                sentAt: 1699733000000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Google Cloud Team',
                    mail: 'team@googlecloud.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Account Security Alert: Unusual Google Cloud Sign-up Attempt',
                body: 'A sign-up attempt for Google Cloud from an unrecognized location was detected. Secure your account now.',
                isRead: false,
                sentAt: 1699734000000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Google Security Center',
                    mail: 'securitycenter@google.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Google Cloud: Account Access Request',
                body: 'Someone has requested access to your Google Cloud account. Review the request and take action.',
                isRead: true,
                sentAt: 1699735000000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Google Access Team',
                    mail: 'accessteam@google.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Important: Verify Your Google Cloud Account Information',
                body: 'We need you to verify and update your account information for Google Cloud. Follow the link to proceed.',
                isRead: false,
                sentAt: 1699736000000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Google Cloud Verification',
                    mail: 'verification@googlecloud.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Your Google Cloud Account: Security Notice',
                body: ` We've detected a potential security issue with your Google Cloud account. Take immediate action.`,
                isRead: false,
                sentAt: 1699737000000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Google Security Alerts',
                    mail: 'securityalerts@google.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Unauthorized Google Cloud Signup Attempt Detected',
                body: 'We blocked an unauthorized attempt to sign up for Google Cloud using your account. Review the details.',
                isRead: false,
                sentAt: 1699738000000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Google Cloud Security Team',
                    mail: 'securityteam@googlecloud.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Alert: Google Cloud Account Activity Verification',
                body: 'Verify recent activities on your Google Cloud account for security purposes. Take action if necessary.',
                isRead: true,
                sentAt: 1699739000000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Google Account Verification',
                    mail: 'accountverification@google.com'
                },
                to: 'user@appsus.com'
            },
            {
                id: utilService.makeId(),
                subject: 'Google Cloud Access Warning: Immediate Attention Required',
                body: 'Urgent: Unusual access patterns detected on your Google Cloud account. Verify and secure your account.',
                isRead: true,
                sentAt: 1699740000000,
                removedAt: null,
                isStar: false,
                from: {
                    userName: 'Google Cloud Security Center',
                    mail: 'securitycenter@googlecloud.com'
                },
                to: 'user@appsus.com'
            }
        ]
    }
    utilService.saveToStorage(MAIL_KEY, mails)
}