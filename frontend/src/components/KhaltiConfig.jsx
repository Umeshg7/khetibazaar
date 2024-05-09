const khaltiConfig = {
    publicKey:'test_public_key_a25c8328039c475eabd8ac0b67cd455e', // Use environment variable
    productIdentity: 'product-123', // Unique identity
    productName: 'Product Name', // Product or service name
    productUrl: 'http://localhost:5173/', // Your product/service URL
    eventHandler: {
      onSuccess: (payload) => {
        console.log('Payment successful:', payload);
        // After success, you would handle this in your component
      },
      onError: (error) => {
        console.error('Payment error:', error);
        // Handle error in payment
      },
    },
  };
  
  export default khaltiConfig;
  