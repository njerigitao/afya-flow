import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Input, Link, List, ListItem, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Home() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/clients")
      .then(res => res.json())
      .then(setClients);
  }, []);

  const addClient = async () => {
    await fetch("http://localhost:5000/api/v1/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age: 30, gender: "Female" }),
    });
    window.location.reload();
  };

  return (
    <Box p={6} maxW="xl" mx="auto">
      <Heading mb={4}>Clients</Heading>

      <Flex mb={4} gap={2}>
        <Input
          placeholder="Enter client name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button colorScheme="blue" onClick={addClient}>
          Add
        </Button>
      </Flex>

      <List spacing={2}>
        {clients.map((c) => (
          <ListItem key={c.id}>
            <Flex bg="white" p={3} rounded="md" shadow="md" align="center">
              <Box>{c.name}</Box>
              <Spacer />
              <Link as={RouterLink} to={`/profile/${c.id}`} color="blue.500" fontWeight="bold">
                View
              </Link>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Home;
