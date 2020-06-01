import { Box, CircularProgress, Container } from "@material-ui/core";
import React from "react";

const Loading: React.FC = () => {
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress size={60} />
      </Box>
    </Container>
  );
};

export default Loading;
