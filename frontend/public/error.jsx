import React from "react";
import Swal from 'sweetalert2';

const ErrorPage = () => {
  React.useEffect(() => {
    Swal.fire({
      icon: 'error',
      title: 'We are working on it please try again later',
      text: 'Our team has not completed this project',
      footer: '<a href="/">Go back to home</a>'
    });
  }, []);

};

export default ErrorPage;
