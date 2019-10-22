import { QrDisplayPayload } from '@polkadot/react-qr';
import { Bytes } from '@polkadot/types';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import { AUTHORITY } from '../constants';
import { CustomEndpoint } from './CustomEndpoint';
import { MetaInfo } from '../types';

interface Props {
  onClose: () => void,
  onShow: () => void,
  metaInfo?: MetaInfo,
  show: boolean
}

export function QrModal(props: Props) {
  const { onClose, show } = props;
  const [metaInfo, setMetaInfo] = useState<MetaInfo>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(props.metaInfo);
    setMetaInfo(props.metaInfo);
  }, [props])

  const handleOnChangeMeta = (metaInfo: MetaInfo) => {
    setMetaInfo(metaInfo);
    setLoading(false);
  }

  const handleClose = () => {
    setMetaInfo(undefined);
    onClose();
  }

  const handleOnLoading = () => {
    setLoading(true);
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {
          metaInfo
            ? <Modal.Title>Metadata QR for {metaInfo.chain}, v{metaInfo.specVersion} from {metaInfo.endpoint}...</Modal.Title>
            : <CustomEndpoint onChangeMetaInfo={handleOnChangeMeta} onLoading={handleOnLoading} />
        }
      </Modal.Header>
      <React.Fragment>
        <Modal.Body>
          {
            metaInfo
              ? (
                <QrDisplayPayload
                  address={AUTHORITY}
                  cmd={3} // sign message
                  payload={new Bytes(metaInfo.metaCalls)}
                  size={400}
                />
              )
              : loading
                  ? <Spinner animation="grow" />
                  : null
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