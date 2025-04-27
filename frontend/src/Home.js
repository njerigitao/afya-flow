import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const [clientName, setClientName] = useState('');
  const [clientGender, setClientGender] = useState('');
  const [clientAge, setClientAge] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedClient, setSearchedClient] = useState(null);

  const navigate = useNavigate(); 

  // Search client by name
  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/v1/clients/search?name=${searchQuery}`);
    if (response.ok) {
      const data = await response.json();
      setSearchedClient(data);
    } else {
      alert('Client not found!');
    }
  };

  // Register new client
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
      const data = await response.json();
      
      navigate(`/profile/${data.id}`);
    } else {
      alert('Error registering client');
    }
  };

  return (
    <Box p={4}>
      <FormControl mb={4}>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Gender</FormLabel>
        <Input
          type="text"
          value={clientGender}
          onChange={(e) => setClientGender(e.target.value)}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Age</FormLabel>
        <Input
          type="number"
          value={clientAge}
          onChange={(e) => setClientAge(e.target.value)}
        />
      </FormControl>

      <Button colorScheme="teal" onClick={handleSubmit}>Register Client</Button>

      <FormControl mb={4} mt={6}>
        <FormLabel>Search for Clients</FormLabel>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </FormControl>

      <Button colorScheme="teal" onClick={handleSearch}>Search</Button>

      {searchedClient && (
        <Box mt={4}>
          <Text><strong>Name:</strong> {searchedClient.name}</Text>
          <Text><strong>Age:</strong> {searchedClient.age}</Text>
          <Text><strong>Gender:</strong> {searchedClient.gender}</Text>
          <Text><strong>Enrolled Programs:</strong></Text>
          <ul>
            {searchedClient.programs && searchedClient.programs.length > 0 ? (
              searchedClient.programs.map((program) => (
                <li key={program.id}>{program.name}</li>
              ))
            ) : (
              <Text>No programs enrolled.</Text>
            )}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default Home;

