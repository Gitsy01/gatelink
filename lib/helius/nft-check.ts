/* ============================================================
   Helius — NFT Collection Ownership Check
   ============================================================ */

import { heliusRpc } from './client';

interface DASResult {
  total: number;
  limit: number;
  page: number;
  items: Array<{
    id: string;
    content: {
      metadata: {
        name: string;
      };
    };
    grouping?: Array<{
      group_key: string;
      group_value: string;
    }>;
    ownership: {
      owner: string;
    };
  }>;
}

/**
 * Check if a wallet owns any NFT from a specific collection.
 *
 * Uses Helius DAS `getAssetsByOwner` and filters by collection address.
 * Paginates through all assets if the wallet holds many.
 */
export async function checkNftOwnership(
  walletAddress: string,
  collectionAddress: string
): Promise<{ owned: number; hasAccess: boolean }> {
  let page = 1;
  let totalMatching = 0;
  let hasMore = true;

  while (hasMore) {
    const result = await heliusRpc<DASResult>('getAssetsByOwner', {
      ownerAddress: walletAddress,
      page,
      limit: 1000,
    });

    const items = result.items || [];

    for (const asset of items) {
      const isInCollection = asset.grouping?.some(
        (g) =>
          g.group_key === 'collection' &&
          g.group_value === collectionAddress
      );

      if (isInCollection) {
        totalMatching++;
      }
    }

    // If we got fewer items than the limit, no more pages
    if (items.length < 1000) {
      hasMore = false;
    } else {
      page++;
      // Safety: cap at 10 pages (10k assets)
      if (page > 10) hasMore = false;
    }
  }

  return {
    owned: totalMatching,
    hasAccess: totalMatching > 0,
  };
}
