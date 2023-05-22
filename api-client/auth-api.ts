import { error } from 'console';
import { I_DataSample } from '@/models';
import { I_filterData } from './../models/filterDataInput';
import axiosClient from './axiosClient';
import { I_Signup } from '@/models/auth';
import {MyCustomError} from "@/models/error"
export const AuthApi = {
    async signup(payload?:I_Signup){
        let url:string = "/auth/signup";
        try {
            const response = await axiosClient.post(url, payload);
            const data = response.data;
            return data;
          } catch (error) {
            
            if(error instanceof MyCustomError) {
              return error
            }
            return {
              statusCode:404,
              message:"Unknown error!",
              error:"Network error"
            };
          }
    }
}