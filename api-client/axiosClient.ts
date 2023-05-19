import axios from "axios";
import { request } from "http";
import Cookies from "js-cookie";
import { getSession } from 'next-auth/react';
const axiosClient = axios.create({
    baseURL:"http://localhost:4000",
    headers:{
        "Content-Type": "application/json",
    }
})

axiosClient.interceptors.request.use(

    async (config) => {
      const session = await getSession();
      if(session){
       config.headers.Authorization = 'Bearer ' + session.user.token
      }
      return config;
    },
    (error) => {
      // Do something with request error
      
      return Promise.reject(error);
    }
  );
  
  // Add a response interceptor
  axiosClient.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response.data;
    },
    (error) => {
      let errorMessage
      // Do something with response error
      if(error.response){
        errorMessage = error.response.data
      }else{
        errorMessage = error;
        console.log(error)
      }
      return Promise.reject(errorMessage);
    }
  );
  
  export default axiosClient