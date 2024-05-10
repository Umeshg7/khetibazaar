import React from "react";
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
      <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-4 md:gap-8 mt-20 pt-10">

        {/* img */}
        <div className="md:w-1/2">
            <img src="/images/home.jpg" alt="" />
            <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
              <div className="bg-white px-3 py-2 rounded-2xl shadow-sm w-64 flex items-center gap-3">
                <Link to="/products/663ba8ef79e985d94e32e006" className="flex items-center gap-3">
                  {/* Image and text within the Link */}
                  <img
                    src="/images/apple.png"
                    alt="Fresh Apple"
                    style={{ width: '90px', height: '60px', borderRadius: '50%' }}
                  />
                  <div className="space-y-1">
                    <h5>Fresh Apple</h5>
                    <p className="text-red">NPR: 270/kg</p>
                  </div>
                </Link>
              </div>
            <div className="bg-white px-3 py-2 rounded-2xl shadow-sm w-64 hidden md:flex">
              <Link to="/products/663bada379e985d94e32e083"
                className="flex items-center gap-3" 
                style={{ textDecoration: 'none' }} 
              >
                <img src="/images/grains.png" alt="Grains" className="rounded-full w-20 h-20" />
                <div className="space-y-1">
                  <h5>Refined Grains</h5>
                  <p className="text-red">NPR: 150/kg</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        

        {/* texts */}
        <div className="md:w-1/2 px-4 space-y-5 md:mt-10"> {/* Add top margin to create space */}
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug"> Farmed Fresh, Delivered to Your <span className="text-green">Doorstep!</span>
          </h2>
          <p className="text-[#4A4A4A] text-xl">
          Discover Freshness from Field to Table! Enjoy Locally Grown Produce at Its Finest. Dive into Seasonal Fruits, Crisp Vegetables, and Nutrient-Packed Grains.
          </p>
          <Link to="/products"> {/* Specify the target route */}
      <button 
        className="bg-green font-semibold btn text-white px-8 py-3 rounded-full mt-6"
      >
        Order Now
      </button>
        </Link>

        </div>
        
      </div>
    </div>
  );
};

export default Banner;
