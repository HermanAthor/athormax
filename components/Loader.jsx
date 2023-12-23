import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

function Loader() {
  return (
    <div>
      <Box className="w-full h-screen flex justify-center items-center bg-gradient-to-b from-black via-[#2f1163] to-[#0d0d71]">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          label="Loading..."
        />
      </Box>
    </div>
  );
}

export default Loader;
