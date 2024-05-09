import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'
/* eslint-disable react/prop-types */
const CheckoutForm = ({price, cart}) => {
    const stripe = useStripe();
  const elements = useElements();

    const [cardError, setCardError] = useState('') 

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.

            return;
          }

          const card = elements.getElement(CardElement);

          if (card == null) {
            return;
          }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
            //return error for handling the issues
          if (error) {
            console.log('[error]', error);
            setCardError(error.message)
          } else {
            setCardError("Success!")
            console.log('[PaymentMethod]', paymentMethod);
          }
    };
     
  return (
    <div className='flex flex-col sm:flex-row justify-start items-start gap-8 mt-20 pt-20'>
        <div className='md:w-1/2 w-full space-y-3 mt-20 ml-20 pt-10'>
            <h4 className='text-lg font-semibold'>Order summary</h4>
            <p>Total price: {price}</p>
            <p>Number of items: {cart.length}</p>
        </div>
        <div className='md:w-1/3 w-full space-y-3 card shrink-0 max-w-sm shadow-2xl bg-base-100 px-4 py-8 mt-10'>
            <h4 className='text-lg font-semibold'>Process your payment!</h4>
            <h5 className='font-medium'>Credit/Debit card</h5>
            
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
      <button type="submit" disabled={!stripe} className='btn btn-sm mt-5 w-full bg-green text-white'>
        Pay
      </button>
    </form>
    {
        cardError ? <p className='text-red italic text-xs'>{cardError}</p> : ''
    }
        </div>
    </div>
  )
}

export default CheckoutForm
