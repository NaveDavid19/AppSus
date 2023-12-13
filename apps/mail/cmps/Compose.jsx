export function Compose() {
    return <section className="compose">
        <header>New Message</header>
        <article>To <input type="text" /></article>
        <article>Subject <input type="text" /></article>
        <article><input className="compose-content" type="text" /></article>
    </section>
}