import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const cardElement = elements.getElement(CardElement);

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            console.error(error);
            setIsProcessing(false);
            alert("Hubo un error con el pago.");
        } else {
            console.log("Token generado:", token);
            // Aquí puedes enviar el token al backend para completar el pago
            // Realiza una solicitud al backend para crear un pago
            setIsProcessing(false);
            alert("Pago procesado correctamente.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={isProcessing}>
                {isProcessing ? "Procesando..." : "Pagar"}
            </button>
        </form>
    );
};

export default CheckoutForm;
