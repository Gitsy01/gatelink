'use client';

/* ============================================================
   ConnectButton — Styled wallet connect/disconnect button
   ============================================================ */

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useCallback } from 'react';

export default function ConnectButton() {
  const { publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = useCallback(() => {
    if (publicKey) {
      disconnect();
    } else {
      setVisible(true);
    }
  }, [publicKey, disconnect, setVisible]);

  const truncateAddress = (address: string) =>
    `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <button
      className={`btn ${publicKey ? 'btn-secondary' : 'btn-primary'}`}
      onClick={handleClick}
      disabled={connecting}
      id="connect-wallet-btn"
    >
      {connecting ? (
        <>
          <span className="spinner" /> Connecting…
        </>
      ) : publicKey ? (
        <>
          <span style={{ color: 'var(--color-accent)', fontSize: '10px' }}>●</span>
          {truncateAddress(publicKey.toBase58())}
        </>
      ) : (
        '🔗 Connect Wallet'
      )}
    </button>
  );
}
