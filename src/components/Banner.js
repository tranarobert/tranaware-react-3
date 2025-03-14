import React from 'react';
import { Box, Typography } from '@mui/material';

const Banner = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(45deg, #1976d2, #9c27b0, #ff6347)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 10s ease infinite',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        
      }}
    >
      <Box
        sx={{
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          TRANAWARE
        </Typography>
        <Typography variant="h6" sx={{ marginTop: '10px' }}>
          The best PC parts for the best price.
        </Typography>
      </Box>
    </Box>
  );
};

export default Banner;
