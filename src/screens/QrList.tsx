
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { NETWORKS } from '../stores/MetadataStore';
import { Payload } from '../types';

interface Props {
  onSetPayload: (payload: Payload) => void,
}

export function QrList(props: Props) {

  const handleShowQr = ({ currentTarget: { dataset: { id } } }: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    const payload = NETWORKS[id];
    props.onSetPayload(payload);
  }

  return (
    <ListGroup>
      {
        Object.values(NETWORKS).map((network, index) => (
              <ListGroup.Item key={index} style={{ padding: 30 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3>{network.chain}</h3>
                  <p>{network.endpoint}</p>
                  <Button onClick={handleShowQr} data-id={network.chain}>Show Qr</Button>
                </div>
              </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
}