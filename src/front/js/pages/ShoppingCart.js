import React, { useState, useEffect } from 'react';
import "../../styles/shoppingCart.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const API_URL = process.env.REACT_APP_BACKEND_URL || "https://effective-barnacle-r4x94x5x77g3p9ww-3001.app.github.dev"; // Asegúrate de que la URL sea correcta

// Cargar Stripe usando la variable de entorno con la clave pública
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

export const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Curso de Cerámica Básica",
            price: 4000, // Ajustado para que el precio sea en centavos
            quantity: 1,
            image: "https://example.com/ceramica.jpg"
        },
        {
            id: 2,
            name: "Iniciación a la Alfarería",
            price: 5000, // Ajustado para que el precio sea en centavos
            quantity: 1,
            image: "https://example.com/alfareria.jpg"
        },
        {
            id: 3,
            name: "Modelado Avanzado",
            price: 6000, // Ajustado para que el precio sea en centavos
            quantity: 1,
            image: "https://example.com/modelado.jpg"
        }
    ]);

    // Obtener el total del carrito
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Manejar el checkout
    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;
            if (!stripe) {
                console.error("Stripe.js no está disponible para procesar el pago.");
                return;
            }

            const response = await fetch(`${API_URL}/api/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cartItems }),
                credentials: 'include' // Incluye las credenciales si es necesario para la autenticación
            });

            if (!response.ok) {
                throw new Error("Error en la respuesta de la sesión de checkout.");
            }

            const session = await response.json();

            if (!session || !session.id) {
                console.error("No se recibió un ID de sesión de Stripe válido.");
                return;
            }

            // Redirigir al usuario al proceso de pago de Stripe
            const result = await stripe.redirectToCheckout({ sessionId: session.id });
            if (result.error) {
                alert(result.error.message);
            }
        } catch (error) {
            console.error('Error al crear la sesión de pago:', error);
        }
    };

    // Manejar el cambio de cantidad de un item
    const handleQuantityChange = (id, quantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
            )
        );
    };

    // Eliminar un item del carrito
    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    return (
        <Elements stripe={stripePromise}>
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
                                    <p>Precio: {(item.price / 100).toFixed(2)} €</p> {/* Mostrar el precio en euros con 2 decimales */}
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
                        <h3>Total: {(getTotalPrice() / 100).toFixed(2)} €</h3> {/* Mostrar el total en euros con 2 decimales */}
                        <button className="btn btn-primary" onClick={handleCheckout}>Proceder al Pago</button>
                    </div>
                )}
            </div>
        </Elements>
    );
};

export default ShoppingCart;
