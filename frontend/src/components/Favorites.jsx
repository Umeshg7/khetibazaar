import React, { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Favorites = () => {
  const { user } = React.useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const response = await axiosSecure.get(`/favorites?email=${user.email}`);
          setFavorites(response.data);
        } catch (error) {
          console.error('Error fetching favorites:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error fetching favorites',
          });
        }
      }
    };

    fetchFavorites();
  }, [user, axiosSecure]);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await axiosSecure.delete(`/favorites/${favoriteId}`);
      setFavorites(favorites.filter((fav) => fav._id !== favoriteId));
      Swal.fire({
        icon: 'success',
        title: 'Removed from favorites',
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error removing favorite',
      });
    }
  };

  return (
    <div className="container mx-auto p-4 mt-20 pt-20"> 
            <h2 className="text-2xl font-semibold my-4 ">
        Your Favourite <span className="text-green">Products</span>
      </h2>
      {favorites.length === 0 ? (
        <p>No favorite products found. Start adding some!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 lg:grid-cols-4 gap-4"> {/* Four items per row on large screens */}
          {favorites.map((favorite) => (
            <div
              key={favorite._id}
              className="card shadow-xl border border-green relative mr-5 md:my-5" // Green border
            >
              <figure className="h-65 items-center"> {/* Fixed height for the image */}
                <img
                  src={favorite.image}
                  alt={favorite.name}
                  className="w-full h-full object-cover rounded-t-lg" // Object-cover for consistent image
                />
              </figure>
              <div className="card-body flex flex-col justify-end">
                <h2 className="card-title">{favorite.name}</h2>
                <div className="card-actions justify-between">
                  <Link to={`/products/${favorite.menuItemId}`}>
                    <button className="btn btn bg-green">View Product</button>
                  </Link>
                  <button
                    className="btn bg-red flex items-center justify-center text-white hover:bg-" // Green by default, red on hover
                    onClick={() => handleRemoveFavorite(favorite._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
