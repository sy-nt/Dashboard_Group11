import { I_DataSample } from '@/models';
import { I_filterData } from './../models/filterDataInput';
import axiosClient from './axiosClient';
import { I_Signup } from '@/models/auth';
export const AuthApi = {
    async signup(payload?:I_Signup){
        let url:string = "/auth/signup";
        try {
            const response = await axiosClient.post(url, payload);
            const data = response.data;
            return data;
          } catch (error) {
            console.log(error)
            return error;
          }
    }
}