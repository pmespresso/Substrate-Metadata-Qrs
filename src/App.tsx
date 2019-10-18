import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { AppContextConsumer, AppContextProvider } from './contexts/AppContext';
import { QrList } from './screens/QrList';
import { QrModal } from './screens/QrModal';
import { Search } from './screens/Search';
import { MetaInfo } from './types';

const App: React.FC = () => {
  const [metaInfo, setMetaInfo] = useState();
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCustomEndpoint = () => {
    handleShow();
  }

  const handleSetPayload = (metaInfo: MetaInfo) => {
    setMetaInfo(metaInfo);
    handleShow();
  }

  const handleClose = () => {
    setShowQrModal(false);
    setMetaInfo(undefined);
  }
  const handleShow = () => setShowQrModal(true);

  return (
    <AppContextProvider>
      <AppContextConsumer>
        {
          metaInfoList => (
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
            <QrModal onClose={handleClose} onShow={handleShow} metaInfo={metaInfo} show={showQrModal} />
          </Container>
          )
        }
      </AppContextConsumer>
    </AppContextProvider>
  );
}

export default App;
