
import { ApiPromise, WsProvider } from '@polkadot/api/index';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import { DEFAULT_LOCAL } from '../constants';
import { Payload } from '../types';

interface Props {
  onChangePayload: (payload: Payload) => void;
}

export function CustomEndpoint(props: Props) {
  const { onChangePayload } = props;
  const [endpoint, setEndpoint] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleEndpointChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(value);
  }

  const handleGetEndpointMeta = async () => {
    const provider = new WsProvider(endpoint);
    const api = await ApiPromise.create({ provider });
    const [chain, props] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.properties()
    ]);

    const payload = {
      chain: chain.toString(),
      endpoint,
      genesisHash: api.genesisHash.toHex(),
      specVersion: api.runtimeVersion.specVersion.toNumber(),
      ss58Format: props.ss58Format.unwrapOr(42),
      tokenDecimals: props.tokenDecimals.unwrapOr(0),
      metaCalls: Buffer.from(api.runtimeMetadata.asCallsOnly.toU8a()).toString('base64')
    }

    onChangePayload(payload);
  
    // output the chain info, for easy re-use
    console.error(`
    // Generated via 'yarn run chain:info ${endpoint}'
      \n
      \n export default {
      \n  chain: '${chain.toString()}',
      \n  genesisHash: '${api.genesisHash.toHex()}',
      \n  specVersion: ${api.runtimeVersion.specVersion.toNumber()},
      \n  ss58Format: ${props.ss58Format.unwrapOr(42)},
      \n  tokenDecimals: ${props.tokenDecimals.unwrapOr(0)},
      \n  tokenSymbol: '${props.tokenSymbol.unwrapOr('UNIT')}',
      \n  metaCalls: '${Buffer.from(api.runtimeMetadata.asCallsOnly.toU8a()).toString('base64')}'
      \n};`);
  
    // show any missing types
    api.runtimeMetadata.getUniqTypes(false);
  }

  return (
    <div style={{ width: '100%' }}>
      <input
        onChange={handleEndpointChange}
        value={endpoint}
        placeholder="Enter Custom RPC Endpoint here, for example: wss://kusama-rpc.polkadot.io" />
    
      <Button onClick={handleGetEndpointMeta} variant="warning">
        Submit
      </Button>
      <div style={{ display: 'flex', margin: 10, padding: 10, justifyContent: 'space-between' }}>
        <label>Preset Endpoints: </label>
        <Button onClick={() => setEndpoint(DEFAULT_LOCAL)} variant="secondary">localhost:9944</Button>
      </div>
      {error}
    </div>
  );
}