import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import MapPage from './Components/MapPage';
import RegisterPage from './Components/RegisterPage';
import Sidebar from './Components/sidebar'; // Import the Sidebar component
import './App.css';

const App = () => (
  <ChakraProvider>
    <Router>
      <Sidebar /> {/* Include the Sidebar component */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  </ChakraProvider>
);

export default App;
