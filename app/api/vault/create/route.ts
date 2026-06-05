/* ============================================================
   POST /api/vault/create — Create a new vault
   ============================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { createVaultSchema } from '@/lib/utils/validation';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate the request body
    const body = await request.json();
    const parsed = createVaultSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // 2. Verify wallet signature from the Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    // Expect: Bearer <publicKey>:<signature>:<message>
    const token = authHeader.slice(7);
    const [publicKeyB58, signatureB58, ...messageParts] = token.split(':');
    const message = messageParts.join(':');

    if (!publicKeyB58 || !signatureB58 || !message) {
      return NextResponse.json(
        { error: 'Invalid authorization format' },
        { status: 401 }
      );
    }

    // Verify the signature
    try {
      const publicKeyBytes = bs58.decode(publicKeyB58);
      const signatureBytes = bs58.decode(signatureB58);
      const messageBytes = new TextEncoder().encode(message);

      const isValid = nacl.sign.detached.verify(
        messageBytes,
        signatureBytes,
        publicKeyBytes
      );

      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid wallet signature' },
          { status: 401 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: 'Signature verification failed' },
        { status: 401 }
      );
    }

    // 3. Insert vault into Supabase
    const supabase = createServerClient();
    const { title, description, gate_type, token_mint, protected_link } = parsed.data;

    const { data: vault, error: insertError } = await supabase
      .from('vaults')
      .insert({
        creator_wallet: publicKeyB58,
        title,
        description: description || null,
        gate_type,
        token_mint,
        protected_link,
        is_active: true,
      })
      .select('id, title')
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create vault' },
        { status: 500 }
      );
    }

    // 4. Build the share URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const shareUrl = `${appUrl}/vault/${vault.id}`;

    return NextResponse.json(
      {
        vault: {
          id: vault.id,
          title: vault.title,
          share_url: shareUrl,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create vault error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
