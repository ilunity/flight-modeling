import React, { Reducer, useReducer, useState } from "react";
import { Box, Stack } from "@mui/material";
import { FlightChart } from "../FlightChart";
import { FlightParams, startFlight } from "../../utils";
import {
  ChartAction,
  ChartDataState,
  FlightStatsAction,
  flightStatsReducer,
  FlightStatsState,
  lineChartReducer
} from "./reducer";
import { FlightForm } from "../FlightForm";
import { FlightTable } from "../FlightTable";


export const FlightSimulator: React.FC = () => {
  const [lineChartState, lineChartDispatch] = useReducer<Reducer<ChartDataState, ChartAction>>(lineChartReducer, {});
  const [flightStats, flightStatsDispatch] = useReducer<Reducer<FlightStatsState, FlightStatsAction>>(flightStatsReducer, {});
  const [nextChartName, setNextChartName] = useState<number>(1);

  const handleStart = (flightParams: FlightParams) => {
    startFlight({
        flightParams,
        lineName: `${ nextChartName }`,
        lineChartDispatch,
        flightStatsDispatch,
        acceleration: 10
      }
    );

    setNextChartName(prevState => prevState + 1);
  };


  return (
    <Stack>
      <Box
        sx={ {
          display: "flex",
          direction: "row",
          justifyContent: "center",
          mt: 5,
          mb: 2
        } }
      >
        <FlightForm onSubmit={ handleStart } />
        <FlightChart
          chartData={ lineChartState }
          flightStats={ flightStats }
        />
      </Box>
      <FlightTable flightStats={ flightStats } />
    </Stack>
  );
};
