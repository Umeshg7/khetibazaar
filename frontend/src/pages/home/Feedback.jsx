/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaStar } from "react-icons/fa";

const Feedback = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img src="/images/rating.png" alt="" style={{ marginLeft: '70px' }} /> {/* Added style to add gap */}
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5 md:pl-10"> {/* Added style to adjust text alignment and reduce right margin */}
            <p className="subtitle">Feedback</p>
            <h2 className="title">What Our Customers Say About Us</h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
              “I recently started using the Khetibazaar website, and I must say, it's been a life-changer for me!
               The variety of fresh produce available at my fingertips is incredible. From vibrant fruits to organic
                vegetables, I can find everything I need conveniently. What impresses me the most is the quality of 
                the products – each item I've received has been fresh and flavorful, just like they were picked from
                 the farm. Plus, the user-friendly interface makes browsing and purchasing a breeze. Thank you, Khetibazaar, 
                 for making healthy eating so accessible and enjoyable!"
            </blockquote>
           
           {/* avater */}

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
              <div className="flex items-center gap-2"><FaStar className="text-yellow-400"/> <span className="font-medium">4.9</span> <span className="text-[#807E7E]">(9.7M Reviews)</span></div>
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
