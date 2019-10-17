import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { QrList } from './screens/QrList';
import { QrModal } from './screens/QrModal';
import { Search } from './screens/Search';
import { Payload } from './types';

const App: React.FC = () => {
  const [payload, setPayload] = useState();
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCustomEndpoint = () => {
    handleShow();
  }

  const handleSetPayload = (payload: Payload) => {
    setPayload(payload);
    handleShow();
  }

  const handleClose = () => {
    setShowQrModal(false);
    setPayload(undefined);
  }
  const handleShow = () => setShowQrModal(true);

  return (
    <Container>
      <Jumbotron>
        <h1>Parity Signer Metadata Qrs</h1>
        <p className='lead'>Easy UI for generating QRs with calls only metadata.</p>
        <p>If you don't see a network you'd like to inject types for, enter a valid websocket endpoint and we will generate it for you. </p>
      </Jumbotron>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: 20 }}>
        <Search />
        <Button onClick={handleCustomEndpoint} variant='info'>Use Custom Endpoint</Button>
      </div>
      <QrList onSetPayload={handleSetPayload}/>
      <QrModal onClose={handleClose} onShow={handleShow} payload={payload} show={showQrModal} />
    </Container>
  );
}

export default App;
