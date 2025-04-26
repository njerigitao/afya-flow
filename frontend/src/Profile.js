import React, { useState, useEffect } from 'react';
import { Box, Button, Select, FormControl, FormLabel } from '@chakra-ui/react';
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

  if (!client) return <p>Loading...</p>;

  return (
    <Box>
      <h2>{client.name}</h2>
      <p>Gender: {client.gender}</p>
      <p>Age: {client.age}</p>
      <h3>Programs Enrolled:</h3>
      <ul>
        {client.programs.map((program) => (
          <li key={program}>{program}</li>
        ))}
      </ul>
      <FormControl>
        <FormLabel>Enroll in Programs</FormLabel>
        <Select
          multiple
          value={selectedPrograms}
          onChange={(e) =>
            setSelectedPrograms([...e.target.selectedOptions].map((option) => option.value))
          }
        >
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleEnroll}>Enroll Client</Button>
    </Box>
  );
};

export default Profile;

