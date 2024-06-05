import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/map');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the registration page
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
      <VStack as="form" onSubmit={handleSubmit} spacing={4} width="300px">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <Button type="submit" colorScheme="teal" width="100%">Login</Button>
        {error && <Text color="red.500">{error}</Text>}
        <Text fontSize="sm">
          Don't have an account?{' '}
          <Link onClick={handleRegisterClick} color="teal.500">
            Register
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default LoginPage;
