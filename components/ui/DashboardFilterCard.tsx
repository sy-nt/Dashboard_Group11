import { dataSampleApi } from "@/api-client";
import { Card, Metric, Text } from "@tremor/react";
import React from "react";
import { useQuery } from "react-query";

const DashboardFilterCard = () => {
  const { data } = useQuery({
    queryKey: "dashboardFilterCard",
    queryFn: () => dataSampleApi.getDataFilterCard(),
  });
  return (
    <Card>
      <Text>{data?.name}</Text>
      <Metric>{data?.value}</Metric>
    </Card>
  );
};

export default DashboardFilterCard;
