import React, { useState } from 'react';
import "../../styles/shoppingCart.css"; // Asegúrate de crear este archivo
import "../../styles/shoppingCart.css";

export const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([
        {
          id: 1,
          name: "Curso de Cerámica Básica",
          price: 40,
          quantity: 1,
          image: "https://example.com/ceramica.jpg"
        },
        {
          id: 2,
          name: "Iniciación a la Alfarería",
          price: 50,
          quantity: 1,
          image: "https://example.com/alfareria.jpg"
        },
        {
          id: 3,
          name: "Modelado Avanzado",
          price: 60,
          quantity: 1,
          image: "https://example.com/modelado.jpg"
        }
      ]);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h1 className="text-center mt-5">Tu Carrito de Compras</h1>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p className="text-center">Tu carrito está vacío.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h5>{item.name}</h5>
                <p>Precio: {item.price} €</p>
                <div>
                  <label>Cantidad:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  />
                </div>
                <button className="btn btn-danger" onClick={() => handleRemoveItem(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total: {getTotalPrice()} €</h3>
          <button className="btn btn-primary">Proceder al Pago</button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
