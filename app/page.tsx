import Link from "next/link";

const steps = [
  "Paste a private link or file URL",
  "Choose an SPL token mint or NFT collection",
  "Share the vault URL with your community",
];

const differentiators = [
  "Server-side signature verification",
  "Helius SPL token and NFT ownership checks",
  "No Rust, Anchor, custom programs, or transaction signing",
];

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">Secure token-gated links for Solana creators</p>
        <h1>Paste a link. Pick a token. Share a gated vault.</h1>
        <p className="hero-copy">
          GateLink lets creators reveal private links only after a visitor signs
          a wallet message and passes an on-chain SPL token or NFT ownership
          check. The secret URL never reaches the browser until the server says
          yes.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/create">
            Create a vault
          </Link>
          <a className="btn btn-secondary" href="/docs/grant-application.md">
            View grant docs
          </a>
        </div>
      </section>

      <section className="grid-3">
        {steps.map((step, index) => (
          <article className="card" key={step}>
            <span className="step">0{index + 1}</span>
            <h2>{step}</h2>
            <p>
              A focused creator flow that stays simple enough to demo in a
              minute and secure enough to avoid frontend-only token gates.
            </p>
          </article>
        ))}
      </section>

      <section className="panel">
        <div>
          <p className="eyebrow">Why it wins</p>
          <h2>Secure by design, not by trust.</h2>
        </div>
        <ul className="check-list">
          {differentiators.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
