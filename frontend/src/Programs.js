import { useEffect, useState } from "react";
import { Box, Heading, List, ListItem } from "@chakra-ui/react";

function Programs() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/programs")
      .then(res => res.json())
      .then(setPrograms);
  }, []);

  return (
    <Box p={6} maxW="xl" mx="auto">
      <Heading mb={4}>Programs</Heading>

      <List spacing={2}>
        {programs.map((p) => (
          <ListItem key={p.id} bg="white" p={3} rounded="md" shadow="md">
            {p.name}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Programs;
