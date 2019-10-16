
import { ApiPromise, WsProvider } from '@polkadot/api/index';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

export function CustomEndpoint() {
  const [endpoint, setEndpoint] = useState();
  const [isEndpointValid, setIsEndpointValid] = useState(false);

  const handleEndpointChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (value.substr(0, 6) === 'wss://' || value.substr(0, 5) === 'ws://') {
      setIsEndpointValid(true);
    } else {
      setIsEndpointValid(false);
    }

    setEndpoint(value);
  }

  const handleGetEndpointMeta = async () => {
    const provider = new WsProvider(endpoint);
    const api = await ApiPromise.create({ provider });
    const [chain, props] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.properties()
    ]);
  
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
    <Form>
      <InputGroup className="mb-3">
        <FormControl
          aria-describedby="basic-addon3"
          isValid={isEndpointValid}
          onChange={handleEndpointChange}
          placeholder="Enter Custom RPC Endpoint here, for example: wss://kusama-rpc.polkadot.io" />
      
        <Button disabled={!isEndpointValid} onClick={handleGetEndpointMeta} variant="primary">
          Submit
        </Button>
      </InputGroup>
    </Form>
  );
}