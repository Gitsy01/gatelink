/* ============================================================
   Helius RPC Client Wrapper
   ============================================================ */

const HELIUS_API_KEY = process.env.HELIUS_API_KEY;

function getHeliusUrl(): string {
  if (!HELIUS_API_KEY) {
    throw new Error('Missing HELIUS_API_KEY environment variable');
  }

  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
  const host =
    network === 'mainnet-beta'
      ? 'mainnet.helius-rpc.com'
      : 'devnet.helius-rpc.com';

  return `https://${host}/?api-key=${HELIUS_API_KEY}`;
}

/**
 * Make a JSON-RPC call to Helius.
 */
export async function heliusRpc<T>(
  method: string,
  params: unknown
): Promise<T> {
  const url = getHeliusUrl();

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: `gatelink-${method}-${Date.now()}`,
      method,
      params,
    }),
  });

  if (!response.ok) {
    throw new Error(`Helius RPC error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(`Helius RPC error: ${data.error.message || JSON.stringify(data.error)}`);
  }

  return data.result as T;
}
