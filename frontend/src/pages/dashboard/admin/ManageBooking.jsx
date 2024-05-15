import React from 'react';
import { FaUsers, FaTrashAlt,} from 'react-icons/fa';
import { GiConfirmed } from "react-icons/gi";

import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageBooking = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: orders = [] } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments/all');
            return res.data;
        },
    });

    const handleConfirm = async (item) => {
     await axiosSecure.patch(`/payments/${item._id}`)
     .then(res => {
        console.log(res.data)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Confirmed",
            showConfirmButton: false,
            timer: 1500
          });
          refetch();
     })
    }

    return (
        <div>
            <div className="flex items-center justify-between m-4 ml-20 pl-20 mt-20 ">
                <h5>All Orders</h5>
                <h5>Total Orders: {orders.length}</h5>
            </div>

            {/* User management table */}
            <div className="overflow-x-auto ml-20 pl-20">
                <table className="table table-zebra md:w-[870px]">
                    {/* Table headers */}
                    <thead className="bg-green text-white rounded-lg">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Transition Id</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Confirm Order</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((item, index) => (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{item.email}</td>
                                <td>{item.transitionId}</td>
                                <td>{item.price}</td>
                                <td>{item.status}</td>
                                <td className='text-center'>{item.status === "Confirmed" ? "done":    
                                                                    <button
                                            onClick={() => handleConfirm(item)}
                                            className="btn btn-xs bg-green text-white justify-center"
                                        >
                                            <GiConfirmed />


                                        </button>}</td>
                                <td>
                                    <button
                                        
                                        className="btn btn-xs bg-orange-500 text-white "
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBooking;
