import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from "@mui/material";
import "./App.css";
import emailjs from "@emailjs/browser"
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ProductsSidebar from "./components/ProductsSidebar";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + Number(item.price || 0), 0).toFixed(2);
  };

  const handleCheckout = async () => {
    if(!email){
      alert("Please enter your email to proceed with the order.");
      return;
    }

    setIsSending(true);

    const orderDetails = cart.map(item => `${item.name} - $${Number(item.price || 0).toFixed(2)}`).join("\n");

    const templateParams = {
      user_email: email,
      order_details: orderDetails,
      total_price: calculateTotal(),
    };

    try {
      await emailjs.send(
        "service_e5xnfyd",
        "template_62pes8m",
        templateParams,
        "8Wl0aCDFKmP3xSJgQ"
      );

      alert(`Order placed successfully! Confirmation sent to: ${email}`);
      setCart([]);
      setCartOpen(false);
      setEmail("");
    } catch (error) {
      alert("Error sending email. Please try again.");
      console.error("EmailJS Error:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Router>
      <div>
        <Navbar onOpenCart={() => setCartOpen(true)} />
        <CssBaseline />
        <Box sx={{ padding: "16px" }}>
          <Banner />
        </Box>
        <Routes>
          <Route
            path="/"
            element={
              <>
                
                <Box sx={{ display: "flex" , minHeight: "80vh"}}>
                  <ProductsSidebar onSelectType={setSelectedType} selectedType={selectedType} />
                  <ProductList selectedType={selectedType} addToCart={addToCart} />
                </Box>
              </>
            }
          />

          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Dialog open={cartOpen} onClose={() => setCartOpen(false)}>
          <DialogTitle>Shopping Cart</DialogTitle>
          <DialogContent>
            {cart.length > 0 ? (
              <>
                {cart.map((item, index) => (
                  <Typography key={index}>
                    {item.name} - ${Number(item.price || 0).toFixed(2)}
                  </Typography>
                ))}
                <Typography variant="h6" sx={{ marginTop: 2 }}>
                  Total: ${calculateTotal()}
                </Typography>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ marginTop: 2 }}
                />
              </>
            ) : (
              <Typography>Your cart is empty.</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCartOpen(false)} color="secondary">
              Close
            </Button>
            {cart.length > 0 && (
              <Button onClick={handleCheckout} color="primary">
                Checkout
              </Button>
            )}
          </DialogActions>
        </Dialog>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
