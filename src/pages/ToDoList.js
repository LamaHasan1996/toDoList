import { useEffect, useState } from "react";
import Card from "../components/card/Card";
import { todoList } from "../utils/data";
import { Grid, Container, Typography, Button } from "@mui/material";
import useStyles from "../styles/pages/toDoList";
import ToDoDialog from "../components/dialog/Dialog";
import { IoAddCircleOutline } from "react-icons/io5";
import NewTaskDialog from "../components/newTaskDialog/NewTaskDialog";
import swal from "sweetalert2";
import axios from "axios";
import { FiMoon } from "react-icons/fi";
import { BiSun } from "react-icons/bi";
import { TiWeatherCloudy } from "react-icons/ti";
import Tooltip from "@mui/material/Tooltip";

function ToDoList() {
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [displayedData, setDisplayedData] = useState(null);
  const [updatedItem, setUpdatedItem] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [icon, setIcon] = useState("moon");
  const pageClasses = useStyles();

  useEffect(() => {
    if (todoList && todoList?.length > 0) {
      setData(todoList);
    }
  }, [todoList]);

  useEffect(() => {
    if (latitude && latitude) {
      getWeatherData(latitude, longitude);
    }
  }, [longitude, latitude]);

  const addNewTask = (values) => {
    if (values) {
      let payload = {
        ...values,
        id: data?.length + 1,
        checked: true,
        finishedAt: null,
        archievedAt: null,
      };
      let newArray = [...data, payload];
      setData(newArray);
      setOpenFormDialog(false);
      swal.fire("Added Successfully!", "", "success");
    }
  };
  const updateTask = (values) => {
    if (values) {
      let newArray = [];
      data?.map((item) => {
        item?.id === updatedItem?.id
          ? newArray?.push({
              ...item,
              title: values?.title,
              description: values?.description,
              createdAt: values.createdAt,
            })
          : newArray?.push(item);
      });
      setData(newArray);
      setOpenFormDialog(false);
      swal.fire("updated Successfully!", "", "success");
    }
  };
  const addToArcheive = (task) => {
    if (task) {
      let newArray = [];
      data?.map((item) => {
        item?.id === task?.id
          ? newArray?.push({
              ...item,
              archievedAt: new Date(),
              archived: true,
            })
          : newArray?.push(item);
      });
      setData(newArray);
      setOpenFormDialog(false);
      swal.fire("Added To Archive Successfully!", "", "success");
    }
  };

  const getWeatherData = async (latitude, longitude) => {
    try {
      const API_KEY = "e2156789bc333a3494dde51b5ecafa2a";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      setError(error.message);
    }
  };
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      if (latitude && longitude) {
        setLatitude(latitude);
        setLongitude(longitude);
      }
    },
    (error) => {
      setError(error.message);
    }
  );

  return (
    <Container maxWidth="xl" className={pageClasses.root}>
      <Button
        onClick={(e) => {
          const newEvent = new Event("theme");
          window.dispatchEvent(newEvent);
          let currentTheme = localStorage?.getItem("theme");
          if (!currentTheme || currentTheme === "light") {
            setIcon("moon");
            localStorage?.setItem("theme", "dark");
          } else if (currentTheme === "dark") {
            setIcon("sun");
            localStorage?.setItem("theme", "light");
          }
        }}
      >
        {icon === "sun" ? (
          <BiSun className={pageClasses.themeIcon} />
        ) : (
          <FiMoon className={pageClasses.themeIcon} />
        )}
      </Button>
      <Tooltip
        title={
          weatherData?.weather[0]?.description +
          ", Temperature: " +
          weatherData?.main?.temp
        }
      >
        <Button onClick={(e) => (window.location.href = "/weather")}>
          <TiWeatherCloudy className={pageClasses.themeIcon} />
        </Button>
      </Tooltip>
      <Typography className={pageClasses.title}>To Do List</Typography>
      <Button
        className={pageClasses.newBtn}
        onClick={(e) => setOpenFormDialog(true)}
      >
        Add New <IoAddCircleOutline />
      </Button>
      <Grid container spacing={2}>
        {data?.map((item) => (
          <Grid item md={4} sm={6} xs={12}>
            <Card
              item={item}
              setOpenDialog={setOpenDialog}
              setDisplayedData={setDisplayedData}
              data={data}
              setData={setData}
              setUpdatedItem={setUpdatedItem}
              setOpenFormDialog={setOpenFormDialog}
              addToArcheive={addToArcheive}
            />
          </Grid>
        ))}
      </Grid>
      <ToDoDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        displayedData={displayedData}
      />
      <NewTaskDialog
        openFormDialog={openFormDialog}
        setOpenFormDialog={setOpenFormDialog}
        addNewTask={addNewTask}
        updatedItem={updatedItem}
        updateTask={updateTask}
      />
    </Container>
  );
}
export default ToDoList;
