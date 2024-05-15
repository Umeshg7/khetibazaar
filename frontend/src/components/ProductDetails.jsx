import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useCart from "../hooks/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToProducts = () => {
    navigate("/products");
  };

  useEffect(() => {
    fetch(`http://localhost:678/menu/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error loading product",
          text: "An error occurred while fetching product details.",
        });
      });
  }, [id]);

  const handleAddToCart = () => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: product._id,
        name: product.name,
        quantity: 1,
        image: product.image,
        price: product.price,
        email: user.email,
      };

      axios
        .post("http://localhost:678/carts", cartItem)
        .then(() => {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product added to cart.",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || error.message;
          Swal.fire({
            position: "center",
            icon: "error",
            title: `Error adding to cart: ${errorMessage}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        title: "Please log in to add to cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log in now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="bg-white-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          {product ? (
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="w-full lg:w-1/2">
                <div
                  className="relative aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-grey"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center text-center lg:text-left w-full lg:w-1/2">
                <h2 className="text-3xl font-bold mb-4 flex items-center">
                  {product.name}
                  <button
                    onClick={handleNavigateToProducts}
                    className="btn bg-green text-white ml-4"
                  >
                    Add More
                  </button>
                </h2>

                <p className="text-lg mb-4">{product.description}</p>
                <p className="font-bold text-xl text-red mb-6">
                  Price: NPR {product.price}
                </p>
                <button
                  onClick={handleAddToCart}
                  className="btn bg-green text-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ) : (
            <p>Loading product details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import useCart from "../hooks/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToProducts = () => {
    navigate("/products"); // Navigate to the products page
  };

  useEffect(() => {
    fetch(`http://localhost:678/menu/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        Swal.fire({
          icon: "error",
          title: "Error loading product",
          text: "An error occurred while fetching product details.",
        });
      });
  }, [id]);

  const handleAddToCart = () => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: product._id,
        name: product.name,
        quantity: 1,
        image: product.image,
        price: product.price,
        email: user.email,
      };


      axios.post("http://localhost:678/carts", cartItem)
        .then(() => {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product added to cart.",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || error.message;
          Swal.fire({
            position: "center",
            icon: "error",
            title: `Error adding to cart: ${errorMessage}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        title: "Please log in to add to cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log in now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="bg-white-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          {product ? (
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="w-full lg:w-1/2">
                <div
                  className="relative aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-grey" // maintains aspect ratio
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center" // fills the container while maintaining the aspect ratio
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center text-center lg:text-left w-full lg:w-1/2">
              <h2 className="text-3xl font-bold mb-4 flex items-center">
                {product.name}
                <button 
                  onClick={handleNavigateToProducts} // Event listener for navigation
                  className="btn bg-green text-white ml-4"
                >
                  Add more
                </button>
              </h2>

                <p className="text-lg mb-4">{product.description}</p>
                <p className="font-bold text-xl text-red mb-6">Price : NPR {product.price}</p>
                <button
                  onClick={handleAddToCart}
                  className="btn bg-green text-white"
                >
                  Add to Cart
                </button>
                
              </div>
            </div>
          ) : (
            <p>Loading product details...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
