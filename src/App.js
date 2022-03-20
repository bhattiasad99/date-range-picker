import React from "react";
import Calender from "./components/Calender";
import { createTheme, ThemeProvider } from "@mui/material";
function App() {
  const theme = createTheme({
    palette: {
      primary: { main: "#E015A2" },
      secondary: { main: "#251038" },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Calender />
    </ThemeProvider>
  );
}

export default App;
