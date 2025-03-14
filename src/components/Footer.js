import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, Email, Phone } from "@mui/icons-material";

function Footer() {
  return (
    <Box 
      sx={{ 
        backgroundColor: "#333", 
        color: "white", 
        textAlign: "center", 
        padding: "16px",
        marginTop: "auto"
      }}
    >
      <Typography variant="h6">Contact Us</Typography>
      
      <Box sx={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "8px" }}>
        <IconButton href="https://facebook.com" target="_blank" sx={{ color: "white" }}>
          <Facebook />
        </IconButton>
        <IconButton href="https://twitter.com" target="_blank" sx={{ color: "white" }}>
          <Twitter />
        </IconButton>
        <IconButton href="https://instagram.com" target="_blank" sx={{ color: "white" }}>
          <Instagram />
        </IconButton>
      </Box>

      <Typography>
        <Phone sx={{ verticalAlign: "middle", marginRight: "8px" }} />
        +40 123 456 789
      </Typography>
      
      <Typography>
        <Email sx={{ verticalAlign: "middle", marginRight: "8px" }} />
        contact@tranaware.com
      </Typography>
    </Box>
  );
}

export default Footer;
