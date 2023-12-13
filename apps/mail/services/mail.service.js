import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

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

function query() {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            return mails
        })
}
// function query(filterBy = getDefaultFilter()) {
//     return storageService.query(MAIL_KEY)
//         .then(mails => {
//             if (filterBy.txt) {
//                 const regex = new RegExp(filterBy.txt, 'i')
//                 mails = mails.filter(mail => regex.test(mail.title))
//             }
//             if (filterBy.price) {
//                 mails = mails.filter(mail => mail.listPrice.amount >= filterBy.price)
//             }
//             if (filterBy.publishedDate) {
//                 mails = mails.filter(mail => mail.publishedDate >= filterBy.publishedDate)
//             }

//             return mails
//         })
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


function getEmptyMail(title = '', amount = '') {
    return {
        title,
        listPrice: {
            amount,
        }
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
                from: {
                    userName: 'Momo',
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