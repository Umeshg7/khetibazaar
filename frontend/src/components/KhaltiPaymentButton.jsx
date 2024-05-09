import React from 'react';
import KhaltiCheckout from 'khalti-checkout-web';
import PropTypes from 'prop-types';
import khaltiConfig from '../components/KhaltiConfig';

const KhaltiPaymentButton = ({ amount, onSuccess }) => {
  const handlePaymentClick = () => {
    const checkout = new KhaltiCheckout({
      ...khaltiConfig,
      eventHandler: {
        onSuccess: (payload) => {
          if (onSuccess) {
            onSuccess(payload);
          }
        },
        onError: (error) => {
          console.error('Payment error:', error);
        },
      },
    });

    const convertedAmount = amount * 100;

    checkout.show({ amount: convertedAmount });
  };

  // Conditionally render the button based on the amount
  if (amount > 0) {
    return (
      <button
        onClick={handlePaymentClick}
        className="btn btn-md bg-green text-white px-8 py-1"
      >
        Pay with Khalti
      </button>
    );
  }

  // If the amount is 0 or less, don't render the button
  return null; // Or return a different component/message indicating no payment is needed
};

KhaltiPaymentButton.propTypes = {
  amount: PropTypes.number.isRequired,
  onSuccess: PropTypes.func,
};

export default KhaltiPaymentButton;
