import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, FormControl, FormLabel, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  useEffect(() => {
    const fetchClient = async () => {
      const response = await fetch(`http://localhost:5000/api/v1/clients/${id}`);
      const data = await response.json();
      setClient(data);
    };

    const fetchPrograms = async () => {
      const response = await fetch('http://localhost:5000/api/v1/programs');
      const data = await response.json();
      setPrograms(data);
    };

    fetchClient();
    fetchPrograms();
  }, [id]);

  const handleCheckboxChange = (programId) => {
    if (selectedPrograms.includes(programId)) {
      setSelectedPrograms(selectedPrograms.filter((id) => id !== programId));
    } else {
      setSelectedPrograms([...selectedPrograms, programId]);
    }
  };

  const handleEnroll = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/clients/${id}/enroll`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ program_ids: selectedPrograms }),
    });

    if (response.ok) {
      alert('Client enrolled!');
    } else {
      alert('Error enrolling client');
    }
  };

  if (!client) return <Text>Loading...</Text>;

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold">{client.name}</Text>
      <Text>Gender: {client.gender}</Text>
      <Text>Age: {client.age}</Text>

      <Text mt={4} fontSize="lg" fontWeight="bold">Programs Enrolled:</Text>
      <ul>
        {client.programs.map((program) => (
          <li key={program}>{program}</li>
        ))}
      </ul>

      <FormControl mt={6}>
        <FormLabel>Select Programs to Enroll</FormLabel>
        <Stack spacing={2}>
          {programs.map((program) => (
            <Checkbox
              key={program.id}
              value={program.id}
              isChecked={selectedPrograms.includes(program.id)}
              onChange={() => handleCheckboxChange(program.id)}
            >
              {program.name}
            </Checkbox>
          ))}
        </Stack>
      </FormControl>

      <Button mt={4} colorScheme="blue" onClick={handleEnroll}>
        Enroll Client
      </Button>
    </Box>

   
  );
};

export default Profile;

