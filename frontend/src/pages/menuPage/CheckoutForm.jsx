import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // Correctly call the function

  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // New state to track processing status
  const { user } = useAuth();

  useEffect(() => {
    if (typeof price !== 'number' || price < 1) {
      console.log("Price is less than 1 or not a number");
      return;
    }

    axiosSecure.post('/create-payment-intent', { price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
      });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || isProcessing) {
      return;
    }

    setIsProcessing(true); // Disable the submit button during processing

    const card = elements.getElement(CardElement);

    if (card == null) {
      setIsProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.error("Error creating payment method:", error);
      setCardError(error.message);
      setIsProcessing(false); // Re-enable the button
      return;
    } else {
      setCardError('');
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || 'Unknown',
            email: user?.email || 'Unknown',
          },
        },
      }
    );

    setIsProcessing(false); // Re-enable the button after processing

    if (confirmError) {
      console.error(confirmError);
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      const paymentInfo = {
        email: user.email,
        transactionId: paymentIntent.id,
        price,
        quantity: cart.length,
        status: 'Order pending',
        itemName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
        menuItems: cart.map((item) => item.menuItemID),
      };
console.log(paymentInfo)
      axiosSecure.post('/payments', paymentInfo)
        .then((res) => {
          console.log(res.data);
          alert("Payment Successful!");
          navigate('/order'); // Redirect to order page
        });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8 mt-20 pt-20">
      <div className="md:w-1/2 w-full space-y-3 mt-20 ml-20 pt-10">
        <h4 className="text-lg font-semibold">Order summary</h4>
        <p>Total price: {price}</p>
        <p>Number of items: {cart.length}</p>
      </div>
      <div className="md:w-1/3 w-full space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8 mt-10">
        <h4 className="text-lg font-semibold">Process your payment!</h4>
        <h5 className="font-medium">Credit/Debit card</h5>

        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe || isProcessing} // Disable during processing
            className="btn btn-sm mt-5 w-full bg-green text-white"
          >
            {isProcessing ? 'Processing...' : 'Pay'}
          </button>
          {cardError && <p className="text-red italic text-xs">{cardError}</p>}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
