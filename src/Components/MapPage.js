import React from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent';
import axios from 'axios';

const MapPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const fetchMapData = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/map', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      navigate('/');
    }
  };

  React.useEffect(() => {
    fetchMapData();
  }, []);

  return (
    <Box padding="4">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="teal.500" // Background color for the navbar
        padding="4"
        borderRadius="md"
        marginBottom="4"
      >
        <Text fontSize="2xl" fontWeight="bold" color="white">State Data WebGIS</Text>
        <Button onClick={handleLogout} colorScheme="teal" variant="outline" color="white" _hover={{ color: 'black' }}>Logout</Button>
      </Flex>
      <Box boxShadow="md" borderRadius="md" overflow="hidden">
        <MapComponent/>
      </Box>
    </Box>
  );
};

export default MapPage;
