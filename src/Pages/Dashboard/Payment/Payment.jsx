import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";


// TODO: publishable keu

const stripePromise = loadStripe(import.meta.env.VITE_payment_Gateway_PK);


const Payment = () => {
    const { price } = useLoaderData();



    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-4">Pay Money</h1>

            <Elements stripe={stripePromise}>
                <CheckoutForm price={price}></CheckoutForm>
            </Elements>
        </div>

    );
};

export default Payment;