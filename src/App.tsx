import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { CustomEndpoint } from './screens/CustomEndpoint';
import { QrList } from './screens/QrList';
import { Search } from './screens/Search';

const App: React.FC = () => {
  return (
    <Container>
      <Jumbotron>
        <h1>Parity Signer Metadata Qrs</h1>
        <p className='lead'>Easy UI for generating QRs with calls only metadata.</p>
        <p>If you don't see a network you'd like to inject types for, enter a valid websocket endpoint and we will generate it for you. </p>
      </Jumbotron>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Search />
        <CustomEndpoint />
      </div>
      <QrList />
    </Container>
  );
}

export default App;
