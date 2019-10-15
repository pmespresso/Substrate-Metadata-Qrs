
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
    setOpenNetwork(id);
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
                    && (
                      <div style={{ height: '400' }}>
                        <QrDisplayPayload
                          address={AUTHORITY}
                          cmd={3} // sign a message
                          payload={new Bytes(network.metaCalls)}
                          size={300}
                        />
                      </div>
                    )   
                }
              </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
}