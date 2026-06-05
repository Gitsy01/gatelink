'use client';

/* ============================================================
   Header — Nav bar with logo and wallet connect
   ============================================================ */

import Link from 'next/link';
import ConnectButton from '@/components/wallet/ConnectButton';
import { useWallet } from '@solana/wallet-adapter-react';

export default function Header() {
  const { publicKey } = useWallet();

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="header-logo">
          <span className="header-logo-icon">🔐</span>
          GateLink
        </Link>

        <nav className="header-nav">
          {publicKey && (
            <>
              <Link href="/create" className="header-link">
                Create Vault
              </Link>
              <Link href="/dashboard" className="header-link">
                Dashboard
              </Link>
            </>
          )}
          <ConnectButton />
        </nav>
      </div>
    </header>
  );
}
