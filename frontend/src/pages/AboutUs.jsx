
import React from 'react';
import {
  FaBox,
  FaUsers,
  FaClock,
  FaUserFriends,
  FaStar,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutUs = () => (
  <div className="container mx-auto px-4 lg:px-24 py-10">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center py-10">
      <div className="mx-auto flex items-center justify-around">
        {/* Products */}
        <div className="flex items-center space-x-5">
          <FaBox className="text-4xl mx-auto mb-2" />
          <div>
            <h3 className="text-3xl font-bold text-center">100+</h3>
            <p className="text-lg">PRODUCTS</p>
          </div>
        </div>

        {/* Satisfied Clients */}
        <div className="flex items-center space-x-5">
          <FaUsers className="text-4xl" />
          <div>
            <h3 className="text-3xl font-bold text-center">500+</h3>
            <p className="text-lg">SATISFIED CLIENTS</p>
          </div>
        </div>

        {/* Years of Experience */}
        <div className="flex items-center space-x-5">
          <FaClock className="text-4xl" />
          <div>
            <h3 className="text-3xl font-bold text-center">5+</h3>
            <p className="text-lg">YEARS OF EXPERIENCE</p>
          </div>
        </div>

        {/* Team Members */}
        <div className="flex items-center space-x-5">
          <FaUserFriends className="text-4xl" />
          <div>
            <h3 className="text-3xl font-bold text-center">4</h3>
            <p className="text-lg">TEAM MEMBERS</p>
          </div>
        </div>
      </div>
    </section>
    {/* Flex container for arranging content */}
    <div className="py-10 flex flex-col md:flex-row-reverse items-center justify-between">
      {/* Image section */}
      <div className="md:w-1/2">
        <img src="/images/aboutus.png" alt="About Us" className="w-full"/>
        <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4" />
      </div>

      {/* Text section */}
      <div className="md:w-1/2 px-4 space-y-5 md:mt-10">
        {/* Heading */}
        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
          About <span className="text-green">Us</span>
        </h2>
        {/* Description */}
        <p className="text-[#4A4A4A] text-xl">
          At Khetibazar, we are passionate about delivering the freshest local produce straight from our farms to your table. Join us on our farm-to-table journey as we celebrate the flavors of nature, carefully cultivating and delivering the finest vegetables, fruits, grains, and more. From seed to harvest, our commitment to quality and sustainability shines through in every bite.
        </p>
      </div>
    </div>


    <div className="py-10 flex flex-col md:flex-row-reverse items-center justify-between gap-4 md:gap-8">
      {/* Image section */}
      <div className="md:w-1/2 px-4 space-y-5 md:mt-10">
        {/* Heading */}
        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
        Freshness You Can Taste, Health <span className="text-green">You can trust</span>
        </h2>
        {/* Description */}
        <p className="text-[#4A4A4A] text-xl">
          At Khetibazar, we are passionate about delivering the freshest local produce straight from our farms to your table. Join us on our farm-to-table journey as we celebrate the flavors of nature, carefully cultivating and delivering the finest vegetables, fruits, grains, and more. From seed to harvest, our commitment to quality and sustainability shines through in every bite.
        </p>
      </div>

      {/* Text section */}
      <div className="md:w-1/2">
        <img src="/images/aboutus1.png" alt="About Us" />
        <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4" />
      </div>
    </div>



    {/* Call to Action Section */}
    <section className="text-center py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-4xl font-bold mb-6">Experience the Bounty of Nature with Khetibazar</h3>
        <p className="text-lg mb-8">
          Join us in discovering the joy of fresh, locally sourced produce. Explore our wide range of products and start your farm-to-table journey today.
        </p>
        <Link to = "/products">
        <button
          className="bg-green text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors duration-300"
        >
          Discover Our Products
        </button>
        </Link>
      </div>
    </section>

    {/* Customer Feedback Section */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="md:w-1/2">
        <img src="/images/rating.png" alt="" style={{ marginLeft: '70px' }} />
      </div>

      <div className="md:w-1/2">
        <div className="text-left md:w-4/5 md:pl-10">
          <p className="subtitle">Feedback</p>
          <h2 className="title">What Our Customers Say About Us</h2>
          <blockquote className="my-5 text-secondary leading-[30px]">
            “I recently started using the Khetibazaar website, and I must say, its been a life-changer for me! The variety of fresh produce available at my fingertips is incredible. From vibrant fruits to organic vegetables, I can find everything I need conveniently. What impresses me the most is the quality of the products – each item Ive received has been fresh and flavorful. The user-friendly interface makes browsing and purchasing a breeze. Thank you, Khetibazaar, for making healthy eating so accessible and enjoyable.”
          </blockquote>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12 cursor-pointer">
                  <img src="/images/rating2.png" />
                </div>
              </div>

              <div className="avatar">
                <div className="w-12 cursor-pointer">
                  <img src="/images/rating1.png" />
                </div>
              </div>

              <div className="avatar">
                <div className="w-12 cursor-pointer">
                  <img src="/images/rating3.png" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h5 className="text-lg font-semibold">Customer Feedback</h5>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span className="font-medium">4.9</span>
                <span className="text-[#807E7E]">(9.7M Reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AboutUs;