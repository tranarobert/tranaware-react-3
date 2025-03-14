import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // clear
      } else {
        setStatus("Error: " + data.error);
      }
    } catch (error) {
      setStatus("Failed to send message.");
      console.error("Error:", error);
    }
  };

  const position = [44.308906756385895, 23.835107433711517];

  const customIcon = L.icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          placeholder="Your E-Mail Address"
          value={formData.email}
          fullWidth
          margin="normal"
          required
          onChange={handleChange}
        />
        <TextField
          label="Message"
          name="message"
          placeholder="Your Message"
          value={formData.message}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          required
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Send</Button>
      </form>
      {status && <p>{status}</p>}
      {/* map */}
      <Box sx={{ marginTop: 4, height: "400px" }}>
      <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={customIcon}>
          <Popup>Faculty of Automation, Computers and Electronics</Popup>
        </Marker>
      </MapContainer>
      </Box>
    </Box>
  );
};

export default Contact;
