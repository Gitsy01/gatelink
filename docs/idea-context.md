# GateLink Idea Context

## Project Title

GateLink — Token-Gated Content Vault for Solana Creators

## One-Line Description

A no-code Solana web app where creators gate private links or files behind SPL token or NFT ownership, verified by Phantom and Helius RPC.

## What It Does

GateLink lets creators upload links or file references that only qualified Solana wallets can access. The creator defines the access rule by choosing an SPL token mint or NFT collection. A visitor connects their wallet, signs a message, and GateLink checks ownership on-chain before revealing the content.

## Differentiators

- **Secure by design, not by trust**: the private link never appears in the frontend bundle before access is approved.
- **Server-verified access**: a Next.js API route verifies the wallet signature and checks Helius ownership data before returning content.
- **No Rust, no Anchor, no wallet drain**: visitors sign a message, not a transaction, so they spend no SOL and avoid scary approval prompts.
- **Dead-simple creator flow**: paste link, pick token or NFT collection, get shareable vault URL.
- **Narrow primitive, not platform bloat**: GateLink focuses on secure token-gated links instead of trying to become a full creator economy platform.

The product answers a simple creator need:

- Can I give holders-only access without building a smart contract?
- Can I support both SPL token holders and NFT collectors?
- Can I keep the private link hidden from frontend code?
- Can I deploy this cheaply with free-tier-friendly infrastructure?

## Technical Flow

1. Creator creates a vault with title, gated asset type, token mint or NFT collection, and protected link.
2. Vault metadata and encrypted/private link reference are stored in Supabase.
3. Visitor opens the vault page and connects Phantom or Backpack.
4. Visitor signs a message with `signMessage` to prove wallet ownership.
5. Next.js API route verifies the signed message server-side.
6. API route calls Helius RPC `getTokenAccountsByOwner(walletAddress, { mint })` for SPL token checks.
7. For NFT gates, API route calls Helius DAS `getAssetsByOwner` and filters by collection address.
8. If access passes, the API returns the protected link from Supabase.
9. If access fails, the frontend shows a lock screen explaining the required token or NFT.

## Tech Stack

- **Frontend**: Next.js + TypeScript.
- **Wallet**: `@solana/wallet-adapter-react`.
- **Chain reads**: `@solana/web3.js` + Helius RPC.
- **NFT reads**: Helius DAS API.
- **Database**: Supabase Postgres.
- **Auth**: Wallet signature via `signMessage`.
- **Deploy**: Vercel + Supabase.

## AI-Assisted Build Plan

Claude/Codex will be used to scaffold the Next.js app, generate the Supabase schema and RLS policies, write the Helius RPC token ownership check, implement server-side signature verification, build the NFT collection gating flow, and polish the UI.

This is a strong fit for the Agentic Engineering Grant because the AI tools directly compress implementation time while the Solana integration remains real: wallet signatures and on-chain ownership checks are the core product mechanic.

## Security Model

The link is never exposed in frontend code before verification. A user cannot simply open DevTools and grab the private URL because the content only comes back from Supabase after the server verifies:

- The wallet signed the expected message.
- The signature belongs to the connected wallet address.
- The wallet holds the required SPL token or NFT.

This is the core technical gap GateLink targets. Many lightweight token gates only hide content client-side, which means the URL can still leak through bundled JavaScript or network responses. GateLink makes the server the gatekeeper.

## MVP Success Criteria

- A creator can create a token-gated vault.
- A visitor can connect a wallet and sign a message.
- SPL token ownership gating works through Helius RPC.
- NFT collection gating works through Helius DAS.
- Protected content is only returned after server-side verification.
- The app is deployed on Vercel with Supabase as the database.
