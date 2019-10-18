
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { NETWORKS } from '../constants';
import { AppContext } from '../contexts/AppContext';
import { MetaInfo } from '../types';

interface Props {
  onSetPayload: (payload: MetaInfo) => void,
}

export function QrList(props: Props) {
  const { metaInfoList } = useContext(AppContext);

  console.log(metaInfoList);

  const handleShowQr = ({ currentTarget: { dataset: { id } } }: React.MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    const payload = NETWORKS[id];
    props.onSetPayload(payload);
  }

  return (
    <ListGroup>
      {
        Object.values(metaInfoList).map((network, index) => (
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

