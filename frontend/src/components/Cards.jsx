import React, { useContext, useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import axios from 'axios';
/* eslint-disable react/prop-types */
const Cards = ({ item }) => {
  const { name, image, price, description, _id } = item;
  const { user } = useContext(AuthContext);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const handleHeartClick = async (event) => {
    event.stopPropagation(); // Prevent event bubbling

    if (!user) {
      Swal.fire({
        title: 'Please log in to mark as favorite',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
      return;
    }

    if (isHeartFilled) {
      try {
        const existingFavorite = await axiosSecure.get(
          `/favorites?email=${user.email}`
        );

        const itemToDelete = existingFavorite.data.find(
          (fav) => fav.menuItemId === _id
        );

        if (itemToDelete) {
          await axiosSecure.delete(`/favorites/${itemToDelete._id}`);
          setIsHeartFilled(false);

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Removed from favorites!',
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error removing from favorites!',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } else {
      try {
        const favoriteItem = {
          menuItemId: _id,
          name,
          description,
          image,
          email: user.email,
        };

        await axiosSecure.post('/favorites', favoriteItem);
        setIsHeartFilled(true);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Added to favorites!',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error adding to favorites!',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  useEffect(() => {
    if (user) {
      axiosSecure
        .get(`/favorites?email=${user.email}`) // Corrected endpoint
        .then((response) => {
          const isFavorite = response.data.some(
            (fav) => fav.menuItemId === _id
          );
          setIsHeartFilled(isFavorite);
        })
        .catch((error) => {
          console.error('Error fetching favorites:', error);
        });
    }
  }, [user, _id, axiosSecure]);

  const handleAddToCart = (item) => {
    if (user && user.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };

      axios
        .post('http://localhost:678/carts', cartItem)
        .then((response) => {
          if (response) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Food added to the cart.',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          const errorMessage = error.response?.data?.message || error.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        title: 'Please log in to order the food',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  const shortDescription = description.length > 90 ? `${description.slice(0, 90)}...` : description;

  return (
    <div className="card shadow-xl border border-green relative mr-2 md:my-4">
      {/* Heart icon with click handler */}
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? 'text-rose-500' : 'text-white'
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>

      {/* Link to the product's detail page */}
      <Link to={`/products/${_id}`}> {/* Correct way to link to a specific product */}
        <figure>
          <img src={image} alt="#" className="hover:scale-105 transition-all duration-300 md:h-72 mt-5" />
        </figure>
      </Link>

      <div className="card-body">
        <Link to={`/products/${_id}`}>
          <h2 className="card-title">{name}</h2>
        </Link>

        <p>{shortDescription}</p>

        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">NPR :</span> {price}
          </h5>

          <button
            onClick={() => handleAddToCart(item)}
            className="btn bg-green text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
