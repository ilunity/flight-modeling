import { FlightParams } from "../../utils";

export interface FlightFormProps {
  onSubmit: (flightParams: FlightParams) => void;
}
