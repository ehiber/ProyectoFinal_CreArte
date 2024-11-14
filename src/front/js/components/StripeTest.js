import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

// Carga de la clave pública de Stripe desde el archivo de entorno
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

const StripeTest = () => {
    useEffect(() => {
        // Verifica si la clave de API de Stripe está definida correctamente
        if (!process.env.REACT_APP_STRIPE_API_KEY) {
            console.error("La clave API de Stripe no está configurada correctamente.");
        } else {
            console.log("Stripe API Key cargada correctamente:", process.env.REACT_APP_STRIPE_API_KEY);
        }
    }, []);

    return (
        <div>
            <h1>Prueba de Pago con Stripe</h1>
            {stripePromise ? (
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            ) : (
                <p>No se pudo cargar Stripe correctamente. Asegúrate de que la clave API sea válida.</p>
            )}
        </div>
    );
};

export default StripeTest;
