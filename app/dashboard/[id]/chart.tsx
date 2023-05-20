import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {faker} from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);





export function ChartApp({ChartData}:any) {
  const labels = ChartData?.map((value:number)=> value.toString());
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: ChartData?.map((value:number)=> value),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Bar Chart',
      },
    },
  };
  return <Bar options={options} data={data} />;
}
