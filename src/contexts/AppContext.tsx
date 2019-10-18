
import { ApiPromise, WsProvider } from '@polkadot/api';
import React, { createContext, useEffect, useState } from 'react';

import { NETWORKS } from '../constants';
import { MetaInfo, MetaInfoList } from '../types';

const DEFAULT: MetaInfo = {
  chain: '',
  endpoint: '',
  genesisHash: '',
  specVersion: 0,
  ss58Format: 0,
  tokenDecimals: 0,
  metaCalls: ''
}

export const AppContext = createContext({
  metaInfoList: [DEFAULT]
});

export const AppContextConsumer = AppContext.Consumer;

interface Props {
  children: React.ReactNode;
}

export function AppContextProvider (props: Props) {
  const [metaInfoList, setMetaInfoList] = useState<MetaInfoList>([DEFAULT]);

  const getMetaInfo = async (endpoint: string) => {
    const provider = new WsProvider(endpoint);
    const api = await ApiPromise.create({ provider });
    const [chain, props] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.properties()
    ]);

    const metaInfo = {
      chain: chain.toString(),
      endpoint,
      genesisHash: api.genesisHash.toHex(),
      specVersion: api.runtimeVersion.specVersion.toNumber(),
      ss58Format: props.ss58Format.unwrapOr(42),
      tokenDecimals: props.tokenDecimals.unwrapOr(0),
      metaCalls: Buffer.from(api.runtimeMetadata.asCallsOnly.toU8a()).toString('base64')
    }
    
    return metaInfo;
  }

  const getAllMeta = () => {
    return Promise.all(
      Object.values(NETWORKS).map(({ endpoint }) => getMetaInfo(endpoint))
    )
  }

  useEffect(() => {
    getAllMeta().then(allMeta => setMetaInfoList(allMeta));
  }, [])

  return (
    <AppContext.Provider value={{
      metaInfoList
    }}>
      {props.children}
    </AppContext.Provider>
  )

}