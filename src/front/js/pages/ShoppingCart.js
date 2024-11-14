import React, { useContext } from "react";
import "../../styles/shoppingCart.css";
import { Context } from "../store/appContext";

export const ShoppingCart = () => {
  const { store, actions } = useContext(Context); // Accede al store y las acciones desde Flux
  const { cartItems } = store;

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    actions.updateCart(updatedCart); // Actualiza el carrito en el store
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    actions.updateCart(updatedCart); // Actualiza el carrito en el store
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.precio?.replace(" €", "") || 0);
      const quantity = item.quantity || 1; // Asume cantidad 1 si está indefinida
      return total + price * quantity;
    }, 0);
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