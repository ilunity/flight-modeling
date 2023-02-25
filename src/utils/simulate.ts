import { ChartData, ChartPointData } from "../components/FlightChart/FlightChart.types";
import { FlightStats } from "../components/FlightSimulator/reducer";

export interface FlightState {
  x: number,
  y: number,
  t: number,
  vx: number,
  vy: number
}

const G = 9.81;

export const simulateStep = (currentState: FlightState, dt: number, k: number): ChartPointData => {
  let { t, x, y, vx, vy } = currentState;

  t += dt;
  const v = Math.sqrt(vx ** 2 + vy ** 2);
  vx = vx - k * vx * v * dt;
  vy = vy - (G + k * vy * v) * dt;

  x = x + vx * dt;
  y = y + vy * dt;

  currentState.t = t;
  currentState.x = x;
  currentState.y = y;
  currentState.vx = vx;
  currentState.vy = vy;

  return { x, y, t };
};


export const POINTS_PER_SECOND = 30;

interface SimulateReturn {
  chartData: ChartData,
  flightStats: FlightStats
}

export const simulate = (currentState: FlightState, dt: number, k: number): SimulateReturn => {
  const chartData: ChartData = [{
    t: currentState.t,
    x: currentState.x,
    y: currentState.y
  }];
  const interval = Math.round(1 / (dt * POINTS_PER_SECOND));

  let maxHeightPoint: ChartPointData = chartData[0];
  let run = true;
  for (let i = 0; run; i++) {
    const newChartPointData = simulateStep(currentState, dt, k);
    if (maxHeightPoint.y <= newChartPointData.y) {
      maxHeightPoint = newChartPointData;
    }

    if (newChartPointData.y <= 0) {
      newChartPointData.y = 0;
      chartData.push(newChartPointData);
      run = false;
      break;
    }

    if (i % interval === 0) {
      chartData.push(newChartPointData);
    }
  }

  const flightStats: FlightStats = {
    maxHeightPoint,
    distance: currentState.x,
    speedAtTheEnd: Math.sqrt(currentState.vx ** 2 + currentState.vy ** 2),
    timeInterval: dt
  };

  return { chartData, flightStats };
};

