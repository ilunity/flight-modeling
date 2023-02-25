import { Dispatch } from "react";
import { FlightState, POINTS_PER_SECOND, simulate } from "./simulate";
import { ChartAction, FlightStatsAction } from "../components/FlightSimulator/reducer";

const C = 0.15;
const RHO = 1.29;

export interface FlightParams {
  height: number,
  speed: number,
  weight: number,
  angle: number,
  size: number,
  timeInterval: number
}

const calculateFlightParams = ({ height, angle, speed }: FlightParams): FlightState => {
  const alpha = angle * Math.PI / 180;
  const cosAlpha = Math.cos(alpha);
  const sinAlpha = Math.sin(alpha);

  const vx = speed * cosAlpha;
  const vy = speed * sinAlpha;

  const initFlightData = {
    t: 0,
    x: 0,
    y: height,
    vx,
    vy
  };

  return initFlightData;
};

export interface StartFlightOptions {
  flightParams: FlightParams,
  lineName: string,
  lineChartDispatch: Dispatch<ChartAction>,
  flightStatsDispatch: Dispatch<FlightStatsAction>
  secPerFrame?: number;
  acceleration?: number;
}

export const startFlight = (
  {
    flightParams,
    lineName,
    lineChartDispatch,
    flightStatsDispatch,
    secPerFrame = 0.05,
    acceleration = 1
  }: StartFlightOptions
) => {
  const initFlightData = calculateFlightParams(flightParams);
  const k = 0.5 * (C * RHO * flightParams.size) / flightParams.weight;

  lineChartDispatch({
    type: "initLine",
    lineName,
    payload: {
      t: 0,
      x: 0,
      y: initFlightData.y
    }
  });

  const { chartData, flightStats } = simulate(initFlightData, flightParams.timeInterval, k);

  const pointsInterval = POINTS_PER_SECOND * secPerFrame * acceleration;
  const bunchIndex = {
    start: 0,
    end: 1
  };

  const next = () => {
    lineChartDispatch({
      type: "setLine",
      lineName,
      payload: chartData.slice(0, bunchIndex.end)
    });

    bunchIndex.start += pointsInterval;
    bunchIndex.end += pointsInterval;

    if (bunchIndex.end >= chartData.length) {
      lineChartDispatch({
        type: "setLine",
        lineName,
        payload: chartData
      });
      return flightStatsDispatch({
        type: "setStats",
        lineName,
        payload: flightStats
      });
    }

    lineChartDispatch({
      type: "updateLine",
      lineName,
      payload: chartData.slice(bunchIndex.start, bunchIndex.end)
    });


    setTimeout(next, secPerFrame * 1000);
  };

  next();
};
