import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaUsers, FaBox, FaClipboardList } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get('/adminStats');
      return res.data;
    },
  });
  return (
    <div className='w-full md:w-[870px] mx-auto px-4 mt-20 ml-20 pl-20'>
      <h2 className='text-2xl font-semibold my-4'>Hi, {user.displayName}</h2>

      <div className="stats stats-vertical lg:stats-horizontal shadow">
        <div className="stat bg-emerald-200">
          <div className="stat-title">Revenue</div>
          <div className="flex items-center">
            <div className="stat-value">{stats.revenue}</div>
            <div className="stat-icon text-green"><MdOutlineAttachMoney  size={40} /></div>
          </div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat bg-orange-200">
          <div className="stat-title">All Users</div>
          <div className="flex items-center">
            <div className="stat-value pr-5">{stats.users}</div>
            <div className="stat-icon text-green"><FaUsers size={25} /></div>
          </div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat bg-indigo-300">
          <div className="stat-title">Product Items</div>
          <div className="flex items-center">
            <div className="stat-value pr-5">{stats.ProductsItems}</div>
            <div className="stat-icon text-green"><FaBox size={20} /></div>
          </div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>

        <div className="stat bg-purple-300">
          <div className="stat-title">All orders</div>
          <div className="flex items-center">
            <div className="stat-value pr-5">{stats.orders}</div>
            <div className="stat-icon text-green"><FaClipboardList size={20} /></div>
          </div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;
