
import { ApiPromise, WsProvider } from '@polkadot/api/index';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

export function Search() {
  const [input, setInput] = useState();

  const handleInputChanged = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    console.log(value);
    setInput(value);
  }

  return (
    <Form>
      <InputGroup className="mb-3">
        <FormControl
          aria-describedby="basic-addon3"
          onChange={handleInputChanged}
          placeholder="Search for the network you want to decode." />
      
        <Button variant="primary">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
}