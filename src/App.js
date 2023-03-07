import { BrowserRouter } from "react-router-dom";
import Routing from "./routing/Routing";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const theme = createTheme();
  const [appliedTheme, setAppliedTheme] = useState(theme);

  useEffect(() => {
    const handleChangeTheme = () => {
      let newTheme = localStorage.getItem("theme");
      if (newTheme === "dark") {
        let newTheme = {
          ...appliedTheme,
          palette: { ...appliedTheme?.palette, mode: "dark" },
        };
        console.log({ newTheme });
        setAppliedTheme(newTheme);
      } else {
        let newTheme = {
          ...appliedTheme,
          palette: { ...appliedTheme?.palette, mode: "light" },
        };
        setAppliedTheme(newTheme);
        console.log({ newTheme });
      }
    };

    window.addEventListener("theme", handleChangeTheme);
    return () => {
      window.removeEventListener("theme", handleChangeTheme);
    };
  }, []);

  return (
    <ThemeProvider theme={appliedTheme}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
