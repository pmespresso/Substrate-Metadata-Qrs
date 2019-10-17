import { u8 } from '@polkadot/types';

export interface Payload {
  chain: string,
  endpoint: string,
  genesisHash: string,
  specVersion: number | u8,
  ss58Format: number | u8,
  tokenDecimals: number | u8,
  metaCalls: string
}