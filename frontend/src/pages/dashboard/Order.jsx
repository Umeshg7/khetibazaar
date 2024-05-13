import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Order = () => {
    const { user } = useAuth();
    console.log(user.email);
    const token = localStorage.getItem('access-token');

    const { refetch, data: orders = [], isLoading, isError, error } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:678/payments?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch orders with status ${res.status}`);
            }

            console.log("fetching successful");
            return res.json();
        },
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error fetching orders: {error.message}</p>;
    }

    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
            <div className="bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
                <div className="py-28 flex flex-col items-center justify-center">
                    <div className="text-center px-4 space-y-7">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                            Track all <span className="text-green">Your Orders</span>
                        </h2>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-green text-white rounded-sm">
                                <tr>
                                    <th>#</th>
                                    <th>Order Date</th>
                                    <th>Transaction Id</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td>{item.transactionId}</td>
                                        <td>{item.price}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <button className="btn btn-sm border-none text-red bg-transparent">Contact</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            {/* foot */}
                        </table>
                    </div>
                </div>

                <hr />

            </div>
        </div>
    );
};

export default Order;
