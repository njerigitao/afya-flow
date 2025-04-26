import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

function Profile() {
  const { id } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/clients/${id}`)
      .then(res => res.json())
      .then(setClient);
  }, [id]);

  if (!client) return <Box p={6}>Loading...</Box>;

  return (
    <Box p={6} maxW="xl" mx="auto">
      <Heading mb={4}>Client Profile</Heading>

      <Box bg="white" p={4} rounded="md" shadow="md" spaceY={2}>
        <Text><strong>Name:</strong> {client.name}</Text>
        <Text><strong>Age:</strong> {client.age}</Text>
        <Text><strong>Gender:</strong> {client.gender}</Text>
        <Text><strong>ID:</strong> {client.id}</Text>
      </Box>
    </Box>
  );
}

export default Profile;
