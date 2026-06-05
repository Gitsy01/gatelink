/* ============================================================
   Zod Validation Schemas
   ============================================================ */

import { z } from 'zod';

/** Base58 Solana address pattern (32-44 chars) */
const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export const createVaultSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be 100 characters or less')
    .trim(),
  description: z
    .string()
    .max(500, 'Description must be 500 characters or less')
    .trim()
    .optional()
    .default(''),
  gate_type: z.enum(['spl_token', 'nft_collection'], {
    errorMap: () => ({ message: 'Gate type must be spl_token or nft_collection' }),
  }),
  token_mint: z
    .string()
    .regex(solanaAddressRegex, 'Invalid Solana address format')
    .trim(),
  protected_link: z
    .string()
    .url('Must be a valid URL')
    .trim(),
});

export type CreateVaultInput = z.infer<typeof createVaultSchema>;

export const vaultIdSchema = z.object({
  id: z.string().uuid('Invalid vault ID'),
});
