import { QrDisplayPayload } from '@polkadot/react-qr';
import { Bytes } from '@polkadot/types';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { AUTHORITY } from '../constants';
import { CustomEndpoint } from './CustomEndpoint';
import { Payload } from '../types';

interface Props {
  onClose: () => void,
  onShow: () => void,
  payload?: Payload,
  show: boolean
}

export function QrModal(props: Props) {
  const { onClose, show } = props;
  const [payload, setPayload] = useState<Payload>();

  useEffect(() => {
    setPayload(props.payload);
  }, [props])

  const handleOnChangePayload = (payload: Payload) => {
    setPayload(payload);
  }

  const handleClose = () => {
    setPayload(undefined);
    onClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {
          payload
            ? <Modal.Title>Metadata QR for {payload.chain}, v{payload.specVersion} from {payload.endpoint}...</Modal.Title>
            : <CustomEndpoint onChangePayload={handleOnChangePayload} />
        }
      </Modal.Header>
      <React.Fragment>
        <Modal.Body>
          {
            payload
              ? (
                <QrDisplayPayload
                  address={AUTHORITY}
                  cmd={3} // sign message
                  payload={new Bytes(payload.metaCalls)}
                  size={400}
                />
              ) : (
                'enter the ws endpoint above.'
              )
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </React.Fragment>
    </Modal>
  )
}