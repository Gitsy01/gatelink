# Agentic Engineering Grant Application — GateLink

Submit here: https://superteam.fun/earn/grants/agentic-engineering

## Step 1: Basics

**Project Title**
> GateLink — Token-Gated Content Vault for Solana Creators

**One Line Description**
> A no-code Solana web app where creators gate private links or files behind SPL token or NFT ownership, verified by Phantom and Helius RPC.

**TG username**
> @Cryptoshezzy

**Wallet Address**
> A82vApEoH1Cjxm46vXzHNHyTtxtWuy2Um8DtsPwrXSQf

## Step 2: Details

**Project Details**
> GateLink is a web app where creators upload private links or files that only wallets holding a specific SPL token or NFT can access. A visitor connects their Phantom wallet, signs a message to prove wallet ownership, and the app checks their token or NFT ownership on-chain. If they qualify, the protected content is revealed. If not, they see a clear lock screen explaining which token or NFT they need.
>
> The core mechanic is intentionally simple: if `tokenBalance > 0`, show the content; otherwise, keep it locked. There is no custom smart contract, no Anchor program, and no Rust. The Solana integration lives in real on-chain reads through Helius RPC and Helius DAS APIs, making the token gate the actual product mechanic rather than a decorative wallet button.
>
> The security hinge is server-side verification. The protected link is never shipped to the frontend before access is approved. A Next.js API route receives the signed wallet message, verifies the signature server-side, calls Helius to confirm SPL token balance or NFT ownership, and only then returns the private link from Supabase. This avoids the common weak version of token-gating where users can open DevTools and find the hidden URL.
>
> There are existing token-gated content projects on Solana, but most are full platforms: subscriptions, storefronts, media ecosystems, or storage products. GateLink is none of those. It is the smallest possible primitive: a server-verified, token-gated link. The key distinction is that the secret URL never reaches the browser until a wallet signature is verified and a Helius RPC ownership check passes server-side. Many simple token-gate implementations are client-side only, meaning the protected URL can be exposed in the JavaScript bundle. GateLink fixes that vulnerability with one API route.
>
> GateLink also avoids the scariest part of crypto UX: transaction approval. Viewers do not sign a transaction, spend SOL, or touch a smart contract. They only sign a message to prove wallet ownership. For creators, the flow stays dead simple: paste link, pick token or NFT collection, get shareable vault URL. Done in about 60 seconds.
>
> The stack is Next.js + TypeScript, `@solana/wallet-adapter-react` for Phantom and Backpack support, `@solana/web3.js` with Helius RPC for SPL token reads, Helius DAS for NFT collection checks, Supabase Postgres for vault metadata and encrypted links, wallet-signature auth via `signMessage`, and Vercel for deployment. AI tools will be used to compress the build: Claude/Codex will scaffold the Next.js app, generate Supabase schema and RLS policies, implement signature verification, write the Helius token/NFT checks, and build the creator + visitor UI.

**Deadline**
> 2026-06-15, 11:59 PM IST

**Proof of Work**
> Proof package includes three AI session transcripts demonstrating agentic development:
> - `codex-session.jsonl` — initial Codex session for project ideation and grant drafting.
> - `claude-session.jsonl` — Claude session for concept refinement.
> - `antigravity-session.jsonl` — Antigravity IDE session covering full architecture design, Next.js scaffolding, Supabase schema with RLS policies, Helius RPC/DAS integration, API route implementation, wallet adapter setup, and premium dark-mode UI design system.
>
> Additional materials: project idea context (`idea-context.md`), grant application (`grant-application.md`), and submission checklist (`submission-checklist.md`). Add the GitHub repository link, Vercel deployment URL, and demo video once available.

**Personal X Profile**
> https://x.com/patel_able

**Personal GitHub Profile**
> https://github.com/Gitsy01

**Colosseum Crowdedness Score**
> Colosseum Copilot search returned a Crowdedness Score of 260 for the closest matching cluster, "Solana Privacy and Identity Management." Closest references include CypherDrive, PayGate, MuultiSpace, CreatorPass, and SolDrive. TODO: take a screenshot from https://colosseum.com/copilot or https://arena.colosseum.org/copilot, upload it to a publicly accessible Google Drive file, and paste the share link here.

**AI Session Transcript**
> Attach all three session transcripts from this project folder:
> 1. `codex-session.jsonl` — Codex session (ideation & grant drafting)
> 2. `claude-session.jsonl` — Claude session (concept refinement)
> 3. `antigravity-session.jsonl` — Antigravity IDE session (full architecture & implementation)

## Step 3: Milestones

**Goals and Milestones**
> 1. By 2026-06-06: Scaffold Next.js + TypeScript app, wallet adapter setup, landing page, creator vault form, and locked visitor page.
> 2. By 2026-06-07: Create Supabase schema for vaults, encrypted links, creator wallets, token mint requirements, and access logs.
> 3. By 2026-06-08: Implement wallet `signMessage` auth and server-side signature verification in a Next.js API route.
> 4. By 2026-06-09: Implement SPL token gating with Helius `getTokenAccountsByOwner` and secure link return only after verification.
> 5. By 2026-06-10: Add NFT gating via Helius DAS `getAssetsByOwner`, filtering by collection address.
> 6. By 2026-06-11: Polish creator and visitor UX, add lock-state explanations, test happy/failed access flows, and deploy to Vercel.
> 7. By 2026-06-12: Record demo, publish GitHub repo, upload proof bundle, and submit grant assets.

**Primary KPI**
> 20 creator vaults created or 100 successful token/NFT-gated access checks during the MVP validation period.

**Final Tranche Checkbox**
> I understand that to receive the final tranche, I must submit the Colosseum project link, GitHub repository, and AI subscription receipt.

