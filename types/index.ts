/* ============================================================
   GateLink — Shared TypeScript Types
   ============================================================ */

// ---- Database Row Types ----

export interface Vault {
  id: string;
  creator_wallet: string;
  creator_user_id: string;
  title: string;
  description: string | null;
  gate_type: 'spl_token' | 'nft_collection';
  token_mint: string;
  protected_link: string;
  is_active: boolean;
  access_count: number;
  created_at: string;
  updated_at: string;
}

/** Public vault metadata — excludes protected_link */
export type VaultPublic = Omit<Vault, 'protected_link'>;

export interface AccessLog {
  id: string;
  vault_id: string;
  wallet_address: string;
  granted: boolean;
  checked_at: string;
  gate_type: string;
  token_mint: string;
  balance_found: number;
}

// ---- API Request/Response Types ----

export interface CreateVaultRequest {
  title: string;
  description?: string;
  gate_type: 'spl_token' | 'nft_collection';
  token_mint: string;
  protected_link: string;
}

export interface CreateVaultResponse {
  vault: {
    id: string;
    title: string;
    share_url: string;
  };
}

export interface VaultMetadataResponse {
  vault: VaultPublic;
}

export interface AccessGrantedResponse {
  granted: true;
  protected_link: string;
  balance: number;
}

export interface AccessDeniedResponse {
  granted: false;
  required: {
    gate_type: 'spl_token' | 'nft_collection';
    token_mint: string;
  };
  current_balance: number;
  message: string;
}

export type AccessResponse = AccessGrantedResponse | AccessDeniedResponse;

// ---- Helius Types ----

export interface HeliusTokenAccount {
  account: {
    data: {
      parsed: {
        info: {
          tokenAmount: {
            uiAmount: number;
            amount: string;
            decimals: number;
          };
          mint: string;
          owner: string;
        };
      };
    };
  };
}

export interface HeliusAsset {
  id: string;
  content: {
    metadata: {
      name: string;
    };
    links?: {
      image?: string;
    };
  };
  grouping?: Array<{
    group_key: string;
    group_value: string;
  }>;
  ownership: {
    owner: string;
  };
}

// ---- UI State Types ----

export type VaultAccessState =
  | 'loading'
  | 'locked'
  | 'connecting'
  | 'verifying'
  | 'unlocked'
  | 'denied'
  | 'error';
