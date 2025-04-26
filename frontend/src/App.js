import { Routes, Route, Link as RouterLink } from "react-router-dom";
import { Box, Flex, Heading, Link, Spacer } from "@chakra-ui/react";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Profile from "./pages/Profile";

function App() {
  return (
    <Box minH="100vh" bg="gray.100">
      <Flex as="nav" bg="blue.600" color="white" p={4} align="center">
        <Heading size="md">Afya Flow</Heading>
        <Spacer />
        <Flex gap={4}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "underline" }}>
            Clients
          </Link>
          <Link as={RouterLink} to="/programs" _hover={{ textDecoration: "underline" }}>
            Programs
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

