import { I_DataSample, I_DataSampleRes } from "@/models";
import { I_filterData } from "./../models/filterDataInput";
import axiosClient from "./axiosClient";
import { I_DataSampleItem } from "@/models/dataSampleItem";
export const dataSampleApi = {
  async getListData(search?: string, sort?: string, page?:string, limit?:string) {
    let url: string = "/data-sample/data";
    if (search || sort || page || limit) {
      url = `/data-sample/data?search=${search}&sort=${sort}&page=${page}&limit=${limit}`;
    }
    try {
      const response = await axiosClient.get<{}, I_DataSampleRes>(url);
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  async getDataItem(id:string|number){
    const url = `/data-sample/data/${id}`;
    try {
      const response = await axiosClient.get<{},I_DataSampleItem[]>(url)
      return response
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
