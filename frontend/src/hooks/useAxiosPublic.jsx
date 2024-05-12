import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://some-domain.com/api/',
    
  });

  const useAxiosPublic = () => {
    return axiosPublic
  }

  export default useAxiosPublic;