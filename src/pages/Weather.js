import { Box, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import useStyles from "../styles/pages/weather";

function Weather() {
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const pageClasses = useStyles();

  useEffect(() => {
    if (latitude && latitude) {
      getWeatherData(latitude, longitude);
    }
  }, [longitude, latitude]);

  const getWeatherData = async (latitude, longitude) => {
    try {
      const API_KEY = "e2156789bc333a3494dde51b5ecafa2a";
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
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
      {weatherData && weatherData?.list?.length > 0 ? (
        <>
          <Typography className={pageClasses.title}>
            {weatherData?.city?.name}
          </Typography>
          <Grid container spacing={2}>
            {weatherData?.list?.map((item) => (
              <Grid item md={4} sm={6} xs={12}>
                <Box className={pageClasses.weatherBox}>
                  <Box>
                    {" "}
                    <span className={pageClasses.label}>Date: </span>
                    {moment(item?.dt_txt)?.format("DD-MM-YYYY HH:mm")}
                  </Box>
                  <Box>
                    {" "}
                    <span className={pageClasses.label}>weather: </span>
                    {item?.weather[0]?.description}
                  </Box>
                  <Box>
                    {" "}
                    <span className={pageClasses.label}>Temperature: </span>
                    {item?.main?.temp}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        "No Data Yet"
      )}
    </Container>
  );
}
export default Weather;
