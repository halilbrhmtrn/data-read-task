import React from 'react';
import { Container } from '@mui/material';
import AppAppBar from './AppBar';
import AppFooter from './Footer';
import { Box } from '@mui/material';


function Layout({ children }) {
  return (
    <>
      <AppAppBar />
      <Container component="main" maxWidth="lg" sx={{ mt: 3 }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          {children}
        </Box>
      </Container>
      <AppFooter />
    </>
  );
}


export default Layout;
