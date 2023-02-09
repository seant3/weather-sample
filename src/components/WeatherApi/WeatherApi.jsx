import { useState, useEffect } from "react";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "800a3f8dc7a089347269a3957e059ee1";

export default function WeatherApi({ latitude, longitude, handleAddToDb }) {
  const [weather, setWeather] = useState({
    temp: "",
    conditions: "",
  });

  async function makeApiCallWeather() {
    const getWeather = await fetch(
      `${BASE_URL}lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`
    );
    const data = await getWeather.json();
    console.log(data, "weather data from API");
    setWeather({
      temp: data.main.temp,
      conditions: data.weather[0].description,
    });

    handleAddToDb(weather);
  }

  useEffect(() => {
    makeApiCallWeather();
  }, []);

  return (
    <>
      <h3>Temperature: {weather.temp}</h3>
      <h3>Conditions: {weather.conditions}</h3>
    </>
  );
}
