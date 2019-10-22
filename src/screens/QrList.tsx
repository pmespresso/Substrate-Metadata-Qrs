
import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { NETWORKS } from '../constants';
import { AppContext } from '../contexts/AppContext';
import { MetaInfo } from '../types';

interface Props {
  onSetMetaInfo: (metaInfo: MetaInfo) => void,
}

export function QrList(props: Props) {
  const { metaInfoList } = useContext(AppContext);

  const handleShowQr = ({ currentTarget: { dataset: { id } } }: React.MouseEvent<HTMLButtonElement>) => {
    const metaInfo = metaInfoList.find(metaInfo => metaInfo.chain === id!);
    props.onSetMetaInfo(metaInfo!);
  }

  return (
    <ListGroup>
      {
        metaInfoList.map(metaInfo => (
          <ListGroup.Item style={{ padding: 30 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{metaInfo.chain}</h3>
              <p>{metaInfo.endpoint}</p>
              <Button onClick={handleShowQr} data-id={metaInfo.chain}>Show Qr</Button>
            </div>
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
}

