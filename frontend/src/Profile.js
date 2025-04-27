import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, FormControl, FormLabel, Stack, Text, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const toast = useToast();

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
      toast({
        title: 'Success!',
        description: 'Client enrolled successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setSelectedPrograms([]); // Clear selections after enrolling
      const updatedClient = await response.json();
      setClient(updatedClient); // Update client info immediately
    } else {
      toast({
        title: 'Error!',
        description: 'There was a problem enrolling the client.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  if (!client) return <Text>Loading...</Text>;

  const enrolledProgramNames = new Set(client.programs);

  return (
    <Box p={6}>
      <Text fontSize="3xl" fontWeight="bold" mb={2}>{client.name}</Text>
      <Text>Gender: {client.gender}</Text>
      <Text>Age: {client.age}</Text>

      <Box mt={6}>
        <Text fontSize="xl" fontWeight="bold" mb={2}>Programs Enrolled:</Text>
        <ul>
          {client.programs.map((program) => (
            <li key={program}>{program}</li>
          ))}
        </ul>
      </Box>

      <FormControl mt={8}>
        <FormLabel fontSize="lg" fontWeight="bold">Select Programs to Enroll</FormLabel>
        <Stack spacing={3}>
          {programs.map((program) => (
            <Checkbox
              key={program.id}
              value={program.id}
              isChecked={selectedPrograms.includes(program.id)}
              isDisabled={enrolledProgramNames.has(program.name)}
              onChange={() => handleCheckboxChange(program.id)}
              sx={{
                _checked: {
                  bg: 'blue.500',
                  color: 'white',
                  borderColor: 'blue.500',
                },
                _hover: {
                  bg: 'blue.100',
                },
                borderRadius: 'md',
                px: 3,
                py: 2,
              }}
            >
              {program.name} {enrolledProgramNames.has(program.name) && "(Already enrolled)"}
            </Checkbox>
          ))}
        </Stack>
      </FormControl>

      <Button
        mt={6}
        colorScheme="blue"
        onClick={handleEnroll}
        isDisabled={selectedPrograms.length === 0}
      >
        Enroll Client
      </Button>
    </Box>
  );
};

export default Profile;


