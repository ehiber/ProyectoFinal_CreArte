import React, { useState, useEffect } from "react";
import "../../styles/shoppingCart.css";

export const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Cargar el carrito desde localStorage si existe
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCartItems(storedCart);
    }
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.precio.replace(" €", "")) * item.quantity,
      0
    );
  };

  return (
    <div className="cart-container">
      <h1 className="text-center mt-5">Tu Carrito de Compras</h1>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="text-center">Tu carrito está vacío.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <h5>{item.nombre}</h5>
              <p>Precio: {item.precio}</p>
              <div>
                <label htmlFor={`quantity-${item.id}`}>Cantidad:</label>
                <input
                  type="number"
                  id={`quantity-${item.id}`}
                  value={item.quantity || 1}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  min="1"
                />
              </div>
              <button onClick={() => handleRemoveItem(item.id)}>
                Eliminar del carrito
              </button>
            </div>
          ))
        )}
      </div>
      <div className="total-price">
        <h3>Total: {getTotalPrice()} €</h3>
      </div>
    </div>
  );
};

export default ShoppingCart;
