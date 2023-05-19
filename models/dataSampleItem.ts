export enum E_status {
    "ok"="ok",
    "fail" = "fail"
}
export interface I_DataSampleItem {
  id: number;
  name: string;
  angle_id: number;
  status: E_status;
  date:Date
  predict_result: number[];
}

export type T_Analysis = {
  name:string;
  data:number
}

export interface DataSampleItemAnalysis{
  status:T_Analysis[];
  predict: Map<string, number>;
}
