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
