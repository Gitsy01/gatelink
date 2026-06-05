/* ============================================================
   Footer
   ============================================================ */

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          Built on{' '}
          <a
            href="https://solana.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Solana
          </a>
          {' · '}
          Powered by{' '}
          <a
            href="https://helius.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Helius
          </a>
          {' · '}
          GateLink © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
