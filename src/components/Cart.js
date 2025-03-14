import React, { useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";

const Cart = ({ cart, onCheckout, removeFromCart, clearCart }) => {
  const totalAmount = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    return sum + price;
  }, 0);
  
  const [open, setOpen] = useState(false);

  const handleCheckout = () => {
    onCheckout();
    setOpen(true);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        right: 20,
        top: 80,
        padding: 3,
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 10,
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 1,
              }}
            >
              <Box>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="body2">
                  ${parseFloat(item.price || 0).toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </Box>
          ))}
          
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Total: ${totalAmount.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, marginRight: 1 }}
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Checkout
          </Button>

          <Button
            variant="contained"
            color="error"
            sx={{ marginTop: 2 }}
            onClick={clearCart}
            disabled={cart.length === 0}
          >
            Clear Cart
          </Button>
        </>
      )}

      {/* Success Popup */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "green",
            padding: 3,
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
            Checkout Successful!
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default Cart;
