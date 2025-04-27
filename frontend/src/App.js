import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { Box, Flex, Heading, Link, Spacer } from "@chakra-ui/react";
import Home from "./Home";
import Programs from "./Programs";
import Profile from "./Profile";

function App() {
  return (
    <Box minH="100vh" bg="gray.100">
      <Flex as="nav" bg="blue.600" color="white" p={4} align="center">
        <Heading size="md">Afya Flow</Heading>
        <Spacer />
        <Flex gap={4}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "underline" }}>
            Home
          </Link>
          <Link as={RouterLink} to="/programs" _hover={{ textDecoration: "underline" }}>
            Programs
          </Link>
          <Link as={RouterLink} to="/profile/1" _hover={{ textDecoration: "underline"}}>
          Enroll
          </Link>
        </Flex>
      </Flex>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </Box>
  );
}

export default App;

