import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link for navigation

const categoryItems = [
    { id: 1, title: "Fresh Potato", image: "/images/potato.png", link: "/products/663bab1879e985d94e32e03e" },
    { id: 2, title: "Fresh Tomatoes", image: "/images/tomatoo.png", link: "/products/663bade279e985d94e32e08b" },
    { id: 3, title: "Fresh Meat",  image: "/images/meat.png", link: "/products/663baa6f79e985d94e32e02c" },
    { id: 4, title: "Browse All", image: "/images/mix.png", link: "/products" },
];

const Categories = () => {
    return (
        <div className='section-container py-10 md:py-20'>
            <div className='text-center'>
                <p className='subtitle'>Customer Favorites</p>
                <h2 className='title'>Popular Categories</h2>
            </div>

            {/* category cards */}
            <div className='flex flex-col sm:flex-row flex-wrap gap-3 justify-around items-center mt-12'>
                {categoryItems.map((item, i) => (
                    <Link to={item.link} key={i}> {/* Use Link to wrap each card */}
                        <div className='shadow-lg border border-green rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition'>
                            <div className='flex w-full mx-auto item-center justify-center'>
                                <img src={item.image} alt={item.title} className='bg-[#C1F1C6] p-5 rounded-full w-30 h-29' />
                            </div>
                            <div className='mt-5 space-y-1'>
                                <h3 style={{ fontWeight: 'bold' }}>{item.title}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;