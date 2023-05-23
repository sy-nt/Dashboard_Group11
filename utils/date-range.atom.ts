import { DateRangePickerValue } from "@tremor/react";
import { atom } from "recoil";

export const DateRangeState = atom({
    key: 'DateRangeState', // unique ID (with respect to other atoms/selectors)
    default: {

    } as DateRangePickerValue, // default value (aka initial value)
  });