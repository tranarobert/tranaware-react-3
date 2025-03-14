import React, { useState, useRef } from 'react';
import { Menu, MenuItem, Button, Box, Typography, Divider } from '@mui/material';
import { Computer, GraphicEq, Memory, Storage, Tune, Mouse, Build, SettingsInputSvideo } from '@mui/icons-material';

function ProductDropdown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const itemRefs = useRef([]);
  
  const components = [
    { name: 'CPU', icon: <Computer />, summary: 'The brain of the computer, processes instructions.' },
    { name: 'GPU', icon: <GraphicEq />, summary: 'Graphics card, used for rendering images and video.' },
    { name: 'Motherboard', icon: <SettingsInputSvideo />, summary: 'The main circuit board connecting all components.' },
    { name: 'RAM', icon: <Memory />, summary: 'Temporary storage that holds data for active processes.' },
    { name: 'Storage', icon: <Storage />, summary: 'Permanent data storage, like SSD or HDD.' },
    { name: 'Cooling', icon: <Tune />, summary: 'Cooling solutions to prevent overheating of components.' },
    { name: 'Peripherals', icon: <Mouse />, summary: 'External devices like mouse, keyboard, etc.' },
    { name: 'Accessories', icon: <Build />, summary: 'Additional items like cables, cases, etc.' },
    { name: 'Kits', icon: <Build />, summary: 'Pre-packaged components or bundles for building PCs.' },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMouseEnter = (component, index) => {
    setHoveredComponent(component);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredComponent(null);
    setHoveredIndex(null);
  };

  return (
    <Box sx={{ padding: 2, position: 'relative' }}>
      {/* Button to trigger dropdown menu */}
      <Button
        variant="contained"
        color="primary"
        onMouseEnter={handleMenuOpen}
        sx={{
          marginBottom: 2,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        Products
      </Button>

      {/* Dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onMouseLeave={handleMenuClose}
        sx={{
          minWidth: 200,
          '& .MuiMenu-paper': {
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        {components.map((component, index) => (
          <MenuItem
            key={component.name}
            onMouseEnter={() => handleMouseEnter(component, index)}
            onMouseLeave={handleMouseLeave}
            sx={{
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
            ref={(el) => (itemRefs.current[index] = el)} // Save reference of each item
          >
            {component.icon}
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              {component.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>

      {/* Description Box on Hover */}
      {hoveredComponent && hoveredIndex !== null && itemRefs.current[hoveredIndex] && (
        <Box
          sx={{
            position: 'absolute',
            top: itemRefs.current[hoveredIndex].offsetTop, // Vertically position the description
            left: itemRefs.current[hoveredIndex].offsetLeft + itemRefs.current[hoveredIndex].offsetWidth + 10, // Position next to the hovered item
            width: '250px',
            padding: 2,
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            transition: 'all 0.3s ease-in-out',
            zIndex: 1,
          }}
        >
          <Typography variant="h6">{hoveredComponent.name}</Typography>
          <Divider sx={{ marginY: 1 }} />
          <Typography variant="body2">{hoveredComponent.summary}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default ProductDropdown;
