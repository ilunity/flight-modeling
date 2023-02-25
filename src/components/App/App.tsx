import { FlightSimulator } from "../FlightSimulator";
import { Container, CssBaseline } from "@mui/material";


const App: React.FC = () => {
  return (
    <Container maxWidth={ "xl" }>
      <CssBaseline />
      <FlightSimulator />
    </Container>
  );
};

export default App;
