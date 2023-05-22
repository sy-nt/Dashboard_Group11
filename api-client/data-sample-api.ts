import { error } from "console";
import { I_DataSample, I_DataSampleRes } from "@/models";
import { I_filterData } from "./../models/filterDataInput";
import axiosClient from "./axiosClient";
import {
  DataSampleItemAnalysis,
  I_DataSampleItem,
} from "@/models/dataSampleItem";
import { DateRangePickerValue } from "@tremor/react";
import { SetterOrUpdater } from "recoil";
export const dataSampleApi = {
  async getListData(
    search?: string,
    sort?: string,
    page?: string,
    limit?: string,
    dateRange?: DateRangePickerValue
  ) {
    let url: string = "/data-sample/data";
    if (search || sort || page || limit || dateRange) {
      const start = dateRange![0];
      const end = dateRange![1];
      if (start && end) {
        url = `/data-sample/data?search=${search}&sort=${sort}&page=${page}&limit=${limit}&dateStart=${start?.toDateString()}&dateEnd=${end?.toDateString()}`;
      } else
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
  async getDataItem(id: string | number) {
    const url = `/data-sample/data/${id}`;
    try {
      const response = await axiosClient.get<{}, I_DataSampleItem[]>(url);
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getDataForChart() {
    const url = "/data-sample-item/analytics";
    try {
      const response = await axiosClient.get<{}, DataSampleItemAnalysis>(url);
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async getDataFilterCard() {
    const url = "/data-sample/data/analysis";
    try {
      const res = await axiosClient.get<{}, { name: string; value: number }>(
        url
      );
      return res;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
