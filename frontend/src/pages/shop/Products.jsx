import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Products = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    // fetch data from backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:678/menu");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data); // Initially, display all items
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
      <div className="py-5 flex flex-col items-center justify-center mt-10">
        <h2 className="text-4xl font-bold mt-10">
          Explore the freshest local <span className="text-green">products</span>
        </h2>
      </div>

      <div className="flex flex-wrap justify-center my-3 mb-10">
        {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200 text-gray-700"
            }`}
            style={{ fontSize: "14px", minWidth: "30px" }} // Adjust font size and minimum width for responsiveness
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
      <div className="flex flex-wrap gap-2 md:gap-4">
          <button onClick={showAll} className={selectedCategory === "all" ? "active bg-green text-white" : "bg-gray-200 text-gray-700 rounded-md px-3 py-1"}>
            All
          </button>
          <button onClick={() => filterItems("vegetables")} className={selectedCategory === "vegetables" ? "active bg-green text-white" : "bg-gray-200 text-gray-700 rounded-md px-3 py-1"}>
            Vegetables
          </button>
          <button onClick={() => filterItems("fruits")} className={selectedCategory === "fruits" ? "active bg-green text-white" : "bg-gray-200 text-gray-700 rounded-md px-3 py-1"}>
            Fruits
          </button>
          <button onClick={() => filterItems("meat")} className={selectedCategory === "meat" ? "active bg-green text-white" : "bg-gray-200 text-gray-700 rounded-md px-3 py-1"}>
            Egg & Meat
          </button>
          <button onClick={() => filterItems("grains")} className={selectedCategory === "grains" ? "active bg-green text-white" : "bg-gray-200 text-gray-700 rounded-md px-3 py-1"}>
            Grains
          </button>
          <button onClick={() => filterItems("dairy")} className={selectedCategory === "dairy" ? "active bg-green text-white" : "bg-gray-200 text-gray-700 rounded-md px-3 py-1"}>
            Dairy Products
          </button>
          <button onClick={() => filterItems("drinks")} className={selectedCategory === "drinks" ? "active bg-green text-white" : "bg-gray-200 text-gray-700 rounded-md px-3 py-1"}>
            Fresh Drinks
          </button>
        </div>

        {/* filter options */}
        <div className="flex items-center">
          <div className="bg-green p-2 mr-2">
            <FaFilter className="text-white h-4 w-4" />
          </div>
          <select
            id="sort"
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
            className="bg-green text-white px-2 py-1 rounded-sm"
          >
            <option value="default">Default</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>
      </div>

      {/* products card */}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
        {currentItems.map((item) => (
          <div key={item._id} className="border border-green rounded-md overflow-hidden">
            {/* Example Card Content (Adjust as per your requirement) */}
            <img src={item.image} alt={item.name} className="w-full h-auto" />
            <div className="p-3">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Products;
