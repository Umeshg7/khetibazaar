import React from "react";

const Banner = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8">

        {/* img */}
        <div className="md:w-1/2">
          <img src="/images/home.jpg" alt="" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            <div className="bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-sm w-64">
              <img src="/images/apple.png" alt="" style={{ width: '90px', height: '60px', borderRadius: '50%' }} />
              <div className="space-y-1">
                <h5>Fresh Apple</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-green-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-green-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-green-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-green-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-green-400"
                    readOnly
                  />
                </div>
                <p className="text-red">NPR : 320/kg</p>
              </div>
            </div>
            <div className="bg-white px-3 py-2 rounded-2xl md:flex items-center gap-3 shadow-sm w-64 hidden">
              <img src="/images/grains.png" alt="" className="rounded-full w-20 h-20" />
              <div className="space-y-1">
                <h5>Refined Grains</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-green-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-green-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-green-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-green-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-green-400"
                    readOnly
                  />
                </div>
                <p className="text-red">NPR : 180-270/kg</p>
              </div>
            </div>
          </div>
        </div>

        {/* texts */}
        <div className="md:w-1/2 px-4 space-y-5 md:mt-10"> {/* Add top margin to create space */}
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug"> Farmed Fresh, Delivered to Your <span className="text-green">Doorstep!</span>
          </h2>
          <p className="text-[#4A4A4A] text-xl">
          Discover Freshness from Field to Table! Enjoy Locally Grown Produce at Its Finest. Dive into Seasonal Fruits, Crisp Vegetables, and Nutrient-Packed Grains. Shop Local, Taste Fresh, and Support Sustainable Farming. Welcome to Our place – Where Every Bite is a Delight
          </p>
          <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
            Order Now 
          </button>

        </div>
        
      </div>
    </div>
  );
};

export default Banner;