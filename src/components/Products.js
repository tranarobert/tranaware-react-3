import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';
import { Box, Button } from '@mui/material';

const Products = ({ cart, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  //const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/products')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleFilterByType = (type) => {
    setSelectedType(type);
    if (type === "All"){
        setFilteredProducts(products);
    } else {
        const filtered = products.filter((product) => product.product_type === type);
        setFilteredProducts(filtered);
    }
  }

  /* const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleCheckout = () => {
    setCart([]);
  }; */

  return (
    <div className="products-container" sx={{ background: 'white' }}>
      <Box sx={{ position: 'relative' }}>
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image_url}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <h3> {`${product.product_type}`} </h3>
              <p>{`${product.manufacturer} ${product.name}`}</p>
              <p className="price">${product.price}</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
       {/* <Cart cart={cart} onCheckout={handleCheckout} /> */}
      </Box>
    </div>
  );
};

export default Products;
