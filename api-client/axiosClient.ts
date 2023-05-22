import { error } from 'console';
import { MyCustomError } from "@/models/error";
import axios from "axios";
import { getSession, signOut } from 'next-auth/react';
const baseURL = process.env!.NEXT_PUBLIC_API_URL
const axiosClient = axios.create({
    baseURL: baseURL,
    headers:{
        "Content-Type": "application/json",
    }
})

axiosClient.interceptors.request.use(

    async (config) => {
      const session = await getSession();
      if(session){
       config.headers.Authorization = 'Bearer ' + session?.user.token
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
        const errorData = error.response.data;
        if(error.response.status === 401){
          signOut()
        }
         throw new MyCustomError(errorData.statusCode, errorData.message, errorData.error)
      }else{
        errorMessage = error;
        console.log(error)
        throw new MyCustomError(404, 'Not found', "Network error");
      }
    }
  );
  
  export default axiosClient