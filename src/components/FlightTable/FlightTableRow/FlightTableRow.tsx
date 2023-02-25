import React from "react";
import { FlightTableRowProps } from "./FlightTableRow.types";
import { TableCell, TableRow } from "@mui/material";
import { getColorByNumber, roundNumber } from "../../../utils";

export const FlightTableRow: React.FC<FlightTableRowProps> = ({ chartIndex, flightStats }) => {
  const color = getColorByNumber(chartIndex);

  return (
    <TableRow>
      <TableCell sx={ { color } }>
        { chartIndex }
      </TableCell>
      <TableCell
        sx={ { color } }
        align={ "right" }
      >
        { flightStats.timeInterval }
      </TableCell>
      <TableCell
        sx={ { color } }
        align={ "right" }
      >
        { roundNumber(flightStats.distance, 2) }
      </TableCell>
      <TableCell
        sx={ { color } }
        align={ "right" }
      >
        { roundNumber(flightStats.maxHeightPoint.y, 2) }
      </TableCell>
      <TableCell
        sx={ { color } }
        align={ "right" }
      >
        { roundNumber(flightStats.speedAtTheEnd, 2) }
      </TableCell>
    </TableRow>
  );
};
