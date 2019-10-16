
import { QrDisplayPayload } from '@polkadot/react-qr';
import { Bytes } from '@polkadot/types';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { AUTHORITY } from '../constants';
import { NETWORKS } from '../stores/MetadataStore';

export function QrList() {
  const [openNetwork, setOpenNetwork] = useState();

  const handleShowQr = ({ currentTarget: { dataset: { id } } }: React.MouseEvent<HTMLElement>) => {
    if (openNetwork === id) {
      setOpenNetwork(-1);
    } else {
      setOpenNetwork(id);
    }
  }

  const renderQr = (network: any) => {
    return (
      <div style={{ height: '600' }}>
        <QrDisplayPayload
          address={AUTHORITY}
          cmd={3} // sign a message
          payload={new Bytes(network.metaCalls)}
          size={500}
        />
      </div>
    )
  }

  return (
    <ListGroup>
      {
        Object.values(NETWORKS).map((network, index) => (
              <ListGroup.Item key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3>{network.chain}</h3>
                  <p>{network.endpoint}</p>
                  <Button onClick={handleShowQr} data-id={network.chain}>Show Qr</Button>
                </div>
                {
                  openNetwork === network.chain
                    && renderQr(network)
                }
              </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
}