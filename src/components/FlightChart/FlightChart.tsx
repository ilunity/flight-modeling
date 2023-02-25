import React, { useState } from "react";
import { FlightChartProps } from "./FlightChart.types";
import { CartesianGrid, ComposedChart, Label, Line, ResponsiveContainer, Scatter, XAxis, YAxis } from "recharts";
import { v4 as uuidv4 } from "uuid";
import { getColorByNumber, roundNumber } from "../../utils";

export const FlightChart: React.FC<FlightChartProps> = ({ chartData, flightStats }) => {
  const [tooltip, setTooltip] = useState<string>("");

  return (
    <ResponsiveContainer
      height={ 500 }
      width={ "100%" }
    >
      <ComposedChart
        margin={ { top: 10, right: 10, left: 10, bottom: 20 } }
      >
        <CartesianGrid strokeDasharray="4" />
        <XAxis
          domain={ (dataValues) => {
            const max = dataValues[1] > 300 ? roundNumber(dataValues[1]) + 1 : 300;
            return [0, max];
          } }
          dataKey={ "x" }
          name={ "range" }
          type="number"
        >
          <Label
            value="Расстояние"
            position="bottom"
          />
          { tooltip && (
            <Label
              position={ "insideLeft" }
              offset={ 40 }
            >
              { tooltip }
            </Label>
          ) }
        </XAxis>
        <YAxis
          domain={ (dataValues) => {
            const max = dataValues[1] > 150 ? roundNumber(dataValues[1]) + 1 : 150;
            return [0, max];
          } }
          dataKey={ "y" }
          name={ "height" }
          type={ "number" }
        >
          <Label
            position={ "insideLeft" }
            angle={ -90 }
          >
            Высота
          </Label>
        </YAxis>
        { Object.entries(chartData).map(([key, value]) => {
          return (
            <Line
              key={ uuidv4() }
              type={ "monotone" }
              data={ value }
              dataKey={ "y" }
              dot={ false }
              strokeWidth={ "2" }
              stroke={ getColorByNumber(+key) }
              isAnimationActive={ false }
            />
          );
        }) }
        {
          Object.entries(flightStats).map(([key, value]) => {
            const startPoint = chartData[key].at(0);
            const endPoint = chartData[key].at(-1);
            const data = [startPoint, value.maxHeightPoint, endPoint];

            return (
              <Scatter
                key={ uuidv4() }
                data={ data }
                dataKey={ "y" }
                fill={ "red" }
                shape={ "circle" }
                isAnimationActive={ false }
                onMouseEnter={ (args) => {
                  let { x, y } = args.node;
                  x = roundNumber(x, 2);
                  y = roundNumber(y, 2);
                  setTooltip(`(${ x }, ${ y })`);
                } }
                onMouseLeave={ () => setTooltip("") }
              />
            );
          })
        }
      </ComposedChart>
    </ResponsiveContainer>
  );
};
