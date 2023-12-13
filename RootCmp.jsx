const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./views/About.jsx"
import { Home } from "./views/Home.jsx"
import { MailIndex } from "./apps/mail/views/MailIndex.jsx"
import { NoteIndex } from "./apps/note/views/NoteIndex.jsx"
import { MailDeatils } from "./apps/mail/cmps/MailDeatils.jsx"
import { Tabs } from "./apps/mail/services/mail.service.js"

export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                    <Route path={`/mail/${Tabs.INBOX}`} element={<MailIndex />} />
                    <Route path={`/mail/${Tabs.SENT}`} element={<MailIndex />} />
                </Route>
                <Route path="/mail/:mailId" element={<MailDeatils />} />
                <Route path="/note" element={<NoteIndex />} />
            </Routes>
        </section>
    </Router>
}
