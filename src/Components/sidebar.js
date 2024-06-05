import React from 'react';
import { Box, Flex, Text, VStack, HStack, IconButton, useDisclosure, Slide, useBreakpointValue } from '@chakra-ui/react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Sidebar = () => {
  const { isOpen, onOpen, onClose, toggle } = useDisclosure({ defaultIsOpen: true });
  const transition = useBreakpointValue({ base: 'none', md: 'slide' });

  const handleToggle = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  const handleOpenSidebar = () => {
    onOpen();
  };

  return (
    <Box>
      {/* Desktop sidebar */}
      <Slide direction="left" in={isOpen} style={{ zIndex: 4000 }} transition={transition}>
        <Flex
          as="nav"
          direction="column"
          bg="teal.500"
          width={{ base: '100%', md: '250px' }}
          height="100vh"
          position="fixed"
          left="0"
          top="11%"
          zIndex="999999999999"
          borderRight="1px solid"
          borderRadius={12}
          borderColor="gray.300"
          display={{ base: 'block', md: 'block' }}
        >
          {/* Close button/icon */}
          <IconButton
            icon={<AiOutlineClose />}
            aria-label="Close sidebar"
            onClick={handleToggle}
            alignSelf="flex-end"
            mt={2}
            ml={2}
            mb={10}

          />
          
          {/* Sidebar content */}
          <VStack spacing={4} p={4} width="100%" align="center" >
            <Text fontWeight="bold" color="white" fontSize="xl" fontFamily="Inter, sans-serif">Dashboard</Text>
            <Text color="white" fontSize="lg" fontFamily="Inter, sans-serif" _hover={{ bg: 'teal.400', cursor: 'pointer', p:"2" }}>Reports</Text>
            <Text color="white" fontSize="lg" fontFamily="Inter, sans-serif" _hover={{ bg: 'teal.400', cursor: 'pointer',p:"2" }}>Analytics</Text>
            <Text color="white" fontSize="lg" fontFamily="Inter, sans-serif" _hover={{ bg: 'teal.400', cursor: 'pointer',p:"2" }}>Settings</Text>
          </VStack>
        </Flex>
      </Slide>

      {/* Mobile bottom navigation */}
      <Flex
        as="nav"
        bg="teal.500"
        width="100%"
        position="fixed"
        bottom="0"
        left="0"
        zIndex="999"
        borderTop="1px solid"
        borderColor="gray.300"
        display={{ base: 'flex', md: 'none' }}
      >
        <HStack spacing={4} p={2} width="100%" justifyContent="space-around">
          <Text fontWeight="300" color="white" fontSize="small" fontFamily="Inter, sans-serif">Dashboard</Text>
          <Text color="white" fontSize="small" fontFamily="Inter, sans-serif" _hover={{ bg: 'teal.400', cursor: 'pointer' }}>Reports</Text>
          <Text color="white" fontSize="small" fontFamily="Inter, sans-serif" _hover={{ bg: 'teal.400', cursor: 'pointer' }}>Analytics</Text>
          <Text color="white" fontSize="small" fontFamily="Inter, sans-serif" _hover={{ bg: 'teal.400', cursor: 'pointer' }}>Settings</Text>
        </HStack>
      </Flex>

      {/* Button to open sidebar on larger screens */}
      <Box display={{ base: 'none', md: 'block' }} position="fixed" top="15%" left="4" zIndex="998">
        {!isOpen && (          
            <IconButton
            icon={isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={handleToggle}
            color="teal.500"
          />
          
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
