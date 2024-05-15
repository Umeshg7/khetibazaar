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
            <div className='flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 mt-8 md:mt-12 lg:mt-16'>
                {categoryItems.map((item, i) => (
                    <Link to={item.link} key={i} className='flex-shrink-0 w-64 md:w-auto'> {/* Use Link to wrap each card */}
                        <div className='shadow-lg border border-green rounded-md bg-white px-6 py-8 text-center cursor-pointer hover:-translate-y-4 transition'>
                            <div className='flex justify-center'>
                                <img src={item.image} alt={item.title} className='bg-[#C1F1C6] p-5 rounded-full w-24 h-24' />
                            </div>
                            <div className='mt-4'>
                                <h3 className='font-bold text-lg'>{item.title}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
