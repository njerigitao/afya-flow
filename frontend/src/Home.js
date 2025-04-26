import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

const Home = () => {
  const [clientName, setClientName] = useState('');
  const [clientGender, setClientGender] = useState('');
  const [clientAge, setClientAge] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/clients/search?name=${searchQuery}`);
    const data = await response.json();
    setClients(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/v1/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: clientName,
        gender: clientGender,
        age: clientAge,
      }),
    });

    if (response.ok) {
      alert('Client registered!');
      setClientName('');
      setClientGender('');
      setClientAge('');
    } else {
      alert('Error registering client');
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Gender</FormLabel>
        <Input
          type="text"
          value={clientGender}
          onChange={(e) => setClientGender(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Age</FormLabel>
        <Input
          type="number"
          value={clientAge}
          onChange={(e) => setClientAge(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSubmit}>Register Client</Button>

      <FormControl>
        <FormLabel>Search for Clients</FormLabel>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSearch}>Search</Button>
      <Box>
        {clients.map((client)=> (
            <Box key={client.id}>
                <p>{client.name}</p>
            </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Home;

