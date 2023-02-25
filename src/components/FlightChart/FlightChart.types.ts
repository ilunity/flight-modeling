import { ChartDataState, FlightStatsState } from "../FlightSimulator/reducer";

export interface ChartPointData {
  t: number,
  x: number,
  y: number
}

export type ChartData = ChartPointData[];

export interface FlightStats {
  maxHeightPoint: ChartPointData;
  speedAtTheEnd: number;
  distance: number;
  timeInterval: number;
}

export interface FlightChartProps {
  chartData: ChartDataState;
  flightStats: FlightStatsState;
}
