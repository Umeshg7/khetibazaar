import React, { useEffect, useState } from 'react';
import Cards from '../../components/Cards';

const Vegetables = () => {
  const [vegetables, setVegetables] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Show 8 items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:678/menu');
        const data = await response.json();
        const filteredVegetables = data.filter(
          (item) => item.category === 'vegetables'
        );
        setVegetables(filteredVegetables);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vegetables.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(vegetables.length / itemsPerPage); // Total pages needed

  return (
    <div>
      {/* Section containing the vegetables */}
      <div className="section-container">
      <div className="flex justify-center my-3 mt-20 pt-10">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? 'bg-green text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-10 ">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Vegetables;
