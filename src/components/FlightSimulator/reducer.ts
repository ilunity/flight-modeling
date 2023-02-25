import { ChartData, ChartPointData, FlightStats } from "../FlightChart/FlightChart.types";
import { minimizeChartData } from "../../utils";

export type ChartDataState = Record<string, ChartPointData[]>

export type ChartAction = {
  type: "initLine";
  lineName: string;
  payload: ChartPointData;
} | {
  type: "updateLine";
  lineName: string;
  payload: ChartData
} | {
  type: "setLine";
  lineName: string;
  payload: ChartData
}

export const lineChartReducer = (state: ChartDataState, action: ChartAction) => {
  switch (action.type) {
    case "initLine":
      return {
        ...state,
        [action.lineName]: [action.payload]
      };
    case "updateLine":
      return {
        ...state,
        [action.lineName]: [
          ...state[action.lineName],
          ...action.payload
        ]
      };
    case "setLine":
      return {
        ...state,
        [action.lineName]: [
          ...minimizeChartData(action.payload)
        ]
      };
  }
};


export interface FlightStatsAction {
  type: "setStats";
  lineName: string;
  payload: FlightStats;
}

export type FlightStatsState = Record<string, FlightStats>

export const flightStatsReducer = (state: FlightStatsState, action: FlightStatsAction) => {
  switch (action.type) {
    case "setStats":
      return {
        ...state,
        [action.lineName]: action.payload
      };
  }
};
