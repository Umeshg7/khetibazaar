import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link for navigation

const categoryItems = [
    { id: 1, title: "Fresh Potato", description: "( Versatile ingredients for any dish )", image: "/images/potato.png", link: "/products/642c155b2c4774f05c36ee017" },
    { id: 2, title: "Fresh Tomatoes", description: "( Fresh, Vibrant and Nutritious )", image: "/images/tomatoo.png", link: "/products/642c155b2c4774f05c36ee0100" },
    { id: 3, title: "Fresh Meat", description: "( Fresh Meat from our farm. )", image: "/images/meat.png", link: "/products/642c155b2c4774f05c36ee013" },
    { id: 4, title: "Browse All", description: "(367 Items)", image: "/images/mix.png", link: "/products" },
];

const Categories = () => {
    return (
        <div className='section-container py-16'>
            <div className='text-center'>
                <p className='subtitle'>Customer Favorites</p>
                <h2 className='title'>Popular Categories</h2>
            </div>

            {/* category cards */}
            <div className='flex flex-col sm:flex-row flex-wrap gap-3 justify-around items-center mt-12'>
                {categoryItems.map((item, i) => (
                    <Link to={item.link} key={i}> {/* Use Link to wrap each card */}
                        <div className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition'>
                            <div className='flex w-full mx-auto item-center justify-center'>
                                <img src={item.image} alt={item.title} className='bg-[#C1F1C6] p-5 rounded-full w-30 h-29' />
                            </div>
                            <div className='mt-5 space-y-1'>
                                <h3 style={{ fontWeight: 'bold' }}>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;