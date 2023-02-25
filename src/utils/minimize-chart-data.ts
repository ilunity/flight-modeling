import { ChartData } from "../components/FlightChart/FlightChart.types";

const REDUCE_RATIO = 10;

export const minimizeChartData = (chartData: ChartData) => {
  const lastIndex = chartData.length - 1;

  return chartData.filter((value, index) => {
    return index % REDUCE_RATIO === 0 || index === lastIndex;
  });
};
