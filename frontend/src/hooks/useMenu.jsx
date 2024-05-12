import { useQuery } from "@tanstack/react-query";
import React from "react";
import axios from "axios";

const useMenu = () => {
    /*const axiosPublic = useAxiosPublic();*/
    
    const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu');
            console.log(res.data)
            return res.data;
          },
    })

    return [menu, loading, refetch]
};

export default useMenu