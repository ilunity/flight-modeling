import React from "react";
import { FlightTableProps } from "./FlightTable.types";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { FlightTableRow } from "./FlightTableRow";

export const FlightTable: React.FC<FlightTableProps> = ({ flightStats }) => {
  return (
    <Table size={ "small" }>
      <TableHead>
        <TableRow>
          <TableCell>№</TableCell>
          <TableCell align="right">Шаг времени</TableCell>
          <TableCell align="right">Расстояние</TableCell>
          <TableCell align="right">Максимальная высота</TableCell>
          <TableCell align="right">Скорость в конечной точке</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { Object.entries(flightStats).map(([key, value]) => (
          <FlightTableRow key={ uuidv4() } chartIndex={ +key } flightStats={ value } />
        )) }
      </TableBody>
    </Table>
  );
};
