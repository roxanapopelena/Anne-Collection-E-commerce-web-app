import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'
import { Button } from '@material-ui/core'

const stripePromise = loadStripe('pk_test_51HLFOaDfku0lGfVqzVhVcJBjy4PfaBbbgxGf1CxQrwfpU131wHXSkwOkpy5wn8C3WdByDj0KO63Ff24mpQuvbnfo00sPZvmteD')

const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);

const Checkout = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    const handleClick = async (e) => {
        e.preventDefault()

        const stripe = await stripePromise;

        try {
            const response = await axios.post(`/api/checkout/create-session`)

            if (response.status === 200) {
                const session = response.data.payload

                // When the customer clicks on the button, redirect them to Checkout.
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });

                if (result.error) {
                    // If `redirectToCheckout` fails due to a browser or network
                    // error, display the localized error message to your customer
                    // using `result.error.message`.
                }
            }
        } catch (error) {
            console.error(error)
        }
    };

    return message ? (
        <>
            <Message message={message} />
        </>
    ) : (
        <>
            <Button onClick={handleClick} variant="contained">Checkout</Button>
        </>
    );
}

export default Checkout