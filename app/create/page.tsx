import VaultCreateForm from "@/components/vault/VaultCreateForm";

export default function CreateVaultPage() {
  return (
    <main className="container container-md page-section">
      <p className="eyebrow">Creator flow</p>
      <h1>Create a token-gated vault</h1>
      <p className="page-copy">
        Add a private link, choose the SPL token mint or NFT collection that
        unlocks it, then share the generated vault URL.
      </p>
      <VaultCreateForm />
    </main>
  );
}
