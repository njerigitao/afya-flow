import React, { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import BASE_URL from "./config";

const Programs = () => {
    const [programName, setProgramName] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(`${BASE_URL}/api/v1/programs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: programName }),
      });
  
      if (response.ok) {
        alert('Program created!');
        setProgramName(''); // Clear input field after successful submission
      } else {
        alert('Error creating program');
      }
    };
  
    return (
      <Box>
        <FormControl>
          <FormLabel>Program Name</FormLabel>
          <Input
            type="text"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleSubmit}>Create Program</Button>
      </Box>
    );
  };
  



export default Programs;
