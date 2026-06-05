/* ============================================================
   Helius — SPL Token Balance Check
   ============================================================ */

import { heliusRpc } from './client';

interface TokenAccountResult {
  value: Array<{
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
  }>;
}

/**
 * Check if a wallet holds any amount of a specific SPL token.
 *
 * Uses Helius-enhanced `getTokenAccountsByOwner` with the mint filter.
 * Returns the total UI-denominated balance across all token accounts.
 */
export async function checkSplTokenBalance(
  walletAddress: string,
  tokenMint: string
): Promise<{ balance: number; hasAccess: boolean }> {
  const result = await heliusRpc<TokenAccountResult>(
    'getTokenAccountsByOwner',
    [
      walletAddress,
      { mint: tokenMint },
      { encoding: 'jsonParsed' },
    ]
  );

  const accounts = result.value || [];

  let totalBalance = 0;
  for (const account of accounts) {
    const uiAmount = account.account.data.parsed.info.tokenAmount.uiAmount;
    totalBalance += uiAmount || 0;
  }

  return {
    balance: totalBalance,
    hasAccess: totalBalance > 0,
  };
}
