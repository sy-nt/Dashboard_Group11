import React, { useState } from "react";
import {
  DateRangePicker as DatePicker,
  DateRangePickerValue,
} from "@tremor/react";
import { useRecoilState } from "recoil";
import { DateRangeState } from "@/utils/date-range.atom";
import { Box, Icon } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
const DateRangePicker = () => {
  const [value, setValue] = useRecoilState(DateRangeState);
  return (
    <Box className="relative">
      <Box className="p-1 absolute top-[1px] left-[56%] z-10 cursor-pointer" hidden={!value[0]} onClick={()=>{setValue([null])}}><SmallCloseIcon/></Box>
      <DatePicker
        className=" min-w-[22rem] mx-auto"
        value={value}
        onValueChange={setValue}
        dropdownPlaceholder="Select"
      />
    </Box>
    
  );
};

export default DateRangePicker;
