import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useCart = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:678/carts?email=${user?.email}`);
            return res.json();
        },
    });

    return [cart, refetch];
};

export default useCart;
