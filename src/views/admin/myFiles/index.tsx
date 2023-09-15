import { Box } from "@chakra-ui/react";
import React from "react";

import Document from "./components/Document";

export default function Files() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Document />
    </Box>
  );
}
