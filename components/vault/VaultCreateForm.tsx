"use client";

import { useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

type GateType = "spl_token" | "nft_collection";

type FormState = {
  title: string;
  description: string;
  gate_type: GateType;
  token_mint: string;
  protected_link: string;
};

const initialForm: FormState = {
  title: "",
  description: "",
  gate_type: "spl_token",
  token_mint: "",
  protected_link: "",
};

export default function VaultCreateForm() {
  const { publicKey, signMessage } = useWallet();
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  const canSubmit = useMemo(
    () =>
      Boolean(
        publicKey &&
          signMessage &&
          form.title &&
          form.token_mint &&
          form.protected_link
      ),
    [form.protected_link, form.title, form.token_mint, publicKey, signMessage]
  );

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submitVault(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!publicKey || !signMessage) {
      setStatus("error");
      setMessage("Connect a wallet that supports message signing first.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    setShareUrl("");

    try {
      const authMessage = `Create GateLink vault:${publicKey.toBase58()}:${Date.now()}`;
      const encodedMessage = new TextEncoder().encode(authMessage);
      const signature = await signMessage(encodedMessage);
      const authToken = `${publicKey.toBase58()}:${bs58.encode(signature)}:${authMessage}`;

      const response = await fetch("/api/vault/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create vault");
      }

      setStatus("success");
      setShareUrl(result.vault.share_url);
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  return (
    <form className="vault-form card" onSubmit={submitVault}>
      <label>
        Vault title
        <input
          required
          value={form.title}
          onChange={(event) => updateField("title", event.target.value)}
          placeholder="Holders-only alpha"
        />
      </label>

      <label>
        Description
        <textarea
          value={form.description}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="What unlocks when a holder passes the gate?"
        />
      </label>

      <label>
        Gate type
        <select
          value={form.gate_type}
          onChange={(event) => updateField("gate_type", event.target.value as GateType)}
        >
          <option value="spl_token">SPL token balance</option>
          <option value="nft_collection">NFT collection ownership</option>
        </select>
      </label>

      <label>
        Token mint or NFT collection address
        <input
          required
          value={form.token_mint}
          onChange={(event) => updateField("token_mint", event.target.value)}
          placeholder="Solana address"
        />
      </label>

      <label>
        Protected link
        <input
          required
          type="url"
          value={form.protected_link}
          onChange={(event) => updateField("protected_link", event.target.value)}
          placeholder="https://..."
        />
      </label>

      <button className="btn btn-primary" disabled={!canSubmit || status === "submitting"}>
        {status === "submitting" ? "Creating vault..." : "Create vault"}
      </button>

      {!publicKey && <p className="form-note">Connect Phantom or Backpack to create a vault.</p>}
      {status === "error" && <p className="form-error">{message}</p>}
      {status === "success" && (
        <p className="form-success">
          Vault created: <a href={shareUrl}>{shareUrl}</a>
        </p>
      )}
    </form>
  );
}
