import React, { useState, useRef } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Computer, GraphicEq, Memory, Storage, Tune, Mouse, Build, SettingsInputSvideo, ClearAll } from '@mui/icons-material';

function ProductSidebar({ onSelectType }) {
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showDescription, setShowDescription] = useState(false); // To control the delay for description
  const itemRefs = useRef([]);

  const components = [
    { name: 'All', icon: <ClearAll /> },
    { name: 'CPU', icon: <Computer />, summary: 'The brain of the computer, processes instructions.' },
    { name: 'GPU', icon: <GraphicEq />, summary: 'Graphics card, used for rendering images and video.' },
    { name: 'Motherboard', icon: <SettingsInputSvideo />, summary: 'The main circuit board connecting all components.' },
    { name: 'RAM', icon: <Memory />, summary: 'Temporary storage that holds data for active processes.' },
    { name: 'Storage', icon: <Storage />, summary: 'Permanent data storage, like SSD or HDD.' },
    { name: 'Cooling', icon: <Tune />, summary: 'Cooling solutions to prevent overheating of components.' },
    { name: 'Peripherals', icon: <Mouse />, summary: 'External devices like mouse, keyboard, etc.' },
    { name: 'Accessories', icon: <Build />, summary: 'Additional items like cables, cases, etc.' },
  ];

  const handleMouseEnter = (component, index) => {
    if(component.name === "All") return;

    setHoveredComponent(component);
    setHoveredIndex(index);

    setTimeout(() => {
      setShowDescription(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    setHoveredComponent(null);
    setHoveredIndex(null);
    setShowDescription(false);
  };

  /* const handleClick = (type) => {
    if (onSelectType) {
      onSelectType(type);
    }
  }; */

  const handleClick = (type) => {
    onSelectType(type === "All" ? null : type);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '250px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0)',
        padding: '16px 20px 16px 30px',
        borderRadius: '8px',
        zIndex: 1,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Products
      </Typography>

      {components.map((component, index) => (
        <Box
          key={component.name}
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 1,
            '&:hover': {
              background: 'linear-gradient(to right, #6a11cb, #2575fc)', // Gradient background
              color: 'white',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
            },
          }}
          onMouseEnter={() => handleMouseEnter(component, index)}
          onMouseLeave={handleMouseLeave}
          ref={(el) => (itemRefs.current[index] = el)}
          onClick={() => handleClick(component.name)}
        >
          <Box sx={{ marginRight: 2 }}>
            {component.icon}
          </Box>
          <Typography variant="body1">{component.name}</Typography>
        </Box>
      ))}

      {showDescription && hoveredComponent && hoveredIndex !== null && itemRefs.current[hoveredIndex] && (
        <Box
          sx={{
            position: 'absolute',
            top: itemRefs.current[hoveredIndex].offsetTop, // Vertically position the description
            left: itemRefs.current[hoveredIndex].offsetLeft + itemRefs.current[hoveredIndex].offsetWidth + 10, // Position next to the hovered item
            width: '250px',
            padding: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
            backdropFilter: 'blur(8px)', // Apply blur effect to the description box
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

export default ProductSidebar;
