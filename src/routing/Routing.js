import {
  default as React,
  memo,
  Suspense,
  useState,
  useEffect,
  lazy,
} from "react";
import { Paper } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
const ToDoList = lazy(() => import("../pages/ToDoList"));
const Weather = lazy(() => import("../pages/Weather"));

function Routing() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const handleChangeTheme = () => {
      let newTheme = localStorage.getItem("theme");
      if (newTheme === "dark") setDark(true);
      else setDark(false);
    };

    window.addEventListener("theme", handleChangeTheme);
    return () => {
      window.removeEventListener("theme", handleChangeTheme);
    };
  }, []);
  return (
    <Paper
      style={{
        backgroundColor: dark ? "#0a1929" : "#f1f1f1",
      }}
    >
      <Suspense fallback={<h1></h1>}>
        <Routes>
          <Route path={`/`} element={<Navigate replace to="/to-do-list" />} />
          <Route path={`/to-do-list`} element={<ToDoList />} />
          <Route path={`/weather`} element={<Weather />} />
        </Routes>
      </Suspense>
    </Paper>
  );
}

export default memo(Routing);
