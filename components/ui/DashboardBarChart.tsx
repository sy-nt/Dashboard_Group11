import { dataSampleApi } from "@/api-client";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Card, Title, BarChart, Subtitle } from "@tremor/react";
import { T_Analysis } from "@/models/dataSampleItem";
const DashboardBarChart = () => {
    
  const [chartData, setChartData] = useState<T_Analysis[]>([]);
  const { data } = useQuery({
    queryKey: "dashboardChart",
    queryFn: () => dataSampleApi.getDataForChart(),
  });
  useEffect(() => {
    let dataTmp: T_Analysis[]=[];
    if (data && data.predict) {
      for (const [key, value] of Object.entries(data.predict)) {
        dataTmp.push({
            name: key,
            data:value
        })
        ;
      }
      dataTmp.sort((a,b)=> Number(a.name)-Number(b.name))
      setChartData(dataTmp)
    }
  }, [data]);
  return (
    <Card>
      <Title>Number of predict</Title>
      <BarChart
        className="mt-6"
        data={chartData}
        index="name"
        categories={["data"]}
        colors={["blue"]}
        yAxisWidth={48}
      />
    </Card>
  );
};

export default DashboardBarChart;
