import React, { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";

function ProductList({ selectedType, addToCart }) {
  const [products, setProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbarOpen(true);
  }

  /*const filteredProducts = selectedType
    ? products.filter((product) => product.product_type === selectedType)
    : products;*/

    return (
      <main style={{ flex: 1, padding: "20px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            {selectedType ? `${selectedType} Products` : "All Products"}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {products.length > 0 ? (
              products
                .filter((product) => !selectedType || product.product_type === selectedType)
                .map((product) => (
                  <div
                    key={product.product_id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "15px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      backgroundColor: "#fff",
                      textAlign: "center",
                      transition: "transform 0.2s ease-in-out",
                    }}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "contain",
                        marginBottom: "10px",
                      }}
                    />
                    <h3 style={{ fontSize: "16px", marginBottom: "5px" }}>{product.name}</h3>
                    <p style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>{product.price}$</p>
                    <button
                      style={{
                        marginTop: "10px",
                        padding: "8px 12px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: "background 0.3s, transform 0.1s",
                      }}
                      onClick={() => handleAddToCart(product)}
                      onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
                      onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))
            ) : (
              <p style={{ gridColumn: "span 4", textAlign: "center" }}>No products found.</p>
            )}
          </div>
        </div>
  
        {/* Snackbar for product added message */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message="Product added successfully!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </main>
    );
}

export default ProductList;
