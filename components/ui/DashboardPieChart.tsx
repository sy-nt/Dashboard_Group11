import { Card, Title, DonutChart } from "@tremor/react";
import "@/styles/globals.css";
import { useQuery } from "react-query";
import { dataSampleApi } from "@/api-client";
import { useEffect } from "react";
import { Legend } from "@tremor/react";

const DashboardPieChart = () => {
  const { data } = useQuery({
    queryKey: "dashboardChart",
    queryFn: () => dataSampleApi.getDataForChart(),
  });

  return (
    <Card>
      <Title>Status</Title>
      {!!data && (
        <>
          <DonutChart
            className="mt-6"
            data={data.status}
            category="data"
            index="name"
            variant="pie"
            colors={["blue", "gray"]}
          />
          {data?.status&&<Legend
            className="mt-3"
            categories={data?.status.map((data=>data.name))}
            colors={["blue", "gray"]}
          />}
        </>
      )}
    </Card>
  );
};

export default DashboardPieChart;
