import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">404</p>
          <h1>That entry does not exist.</h1>
        </div>
        <Link className="button button-primary" href="/">
          Back home
        </Link>
      </section>
    </main>
  );
}
