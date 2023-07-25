
import React from 'react';
import { Typography, Box } from '@mui/material';

function AppFooter() {
  return (
    <Box sx={{ bgcolor: 'background.default', p: 2, mt: 5 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        Halil İbrahim Turan
      </Typography>
    </Box>
  );
}

export default AppFooter;
