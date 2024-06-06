import { useState, useEffect } from "react";
import { Box, Button, Text, VStack, HStack } from "@chakra-ui/react";

const Index = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.800"
      color="yellow.400"
    >
      <VStack spacing={4}>
        <Box
          bg="black"
          borderRadius="md"
          p={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="200px"
          height="100px"
        >
          <Text fontSize="3xl" fontFamily="monospace">
            {formatTime(time)}
          </Text>
        </Box>
        <HStack spacing={4}>
          <Button
            onClick={handleStartStop}
            colorScheme={isActive ? "red" : "green"}
          >
            {isActive ? "Stop" : "Start"}
          </Button>
          <Button onClick={handleReset} colorScheme="yellow">
            Reset
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Index;