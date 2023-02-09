import { useState } from "react";

import WeatherApi from "../../components/WeatherApi/WeatherApi";

import weatherUtil from "../../utils/weatherUtil";

const BASE_URL =
  "https://maps.googleapis.com/maps/api/geocode/json?components=country:US";
const API_KEY = "AIzaSyBi6I_cyEBGjPYnKBnCpRvwj6SXx8iVBD8";

export default function UserForm() {
  const [zip, setZip] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState("");
  const [coordinateData, setCoordinateData] = useState({
    latitude: "",
    longitude: "",
  });

  async function makeApiCallCoordinates() {
    try {
      const getCoordinates = await fetch(
        `${BASE_URL}|postal_code:${zip}&key=${API_KEY}`
      );
      const data = await getCoordinates.json();
      console.log(data.results[0], "return API data from geocoding");
      setCoordinateData({
        latitude: data.results[0].geometry.location.lat,
        longitude: data.results[0].geometry.location.lng,
      });
    } catch (err) {
      setError(
        "Error in submitting zip code - check if it is a US zip and has 5 digits"
      );
    }
    setIsSubmitted(true);
  }

  function handleChange(e) {
    setZip(e.target.value);
    setError("");
    setIsSubmitted(false);
  }

  async function handleSubmit(e) {
    
    e.preventDefault();
    
  }

  async function handleAddToDb(weatherInfo) {
    console.log(weatherInfo, ' this is post in handleAddToDb');
    try {
        const response = await weatherUtil.create(weatherInfo);
        setWeather([response.weatherInfo, ...weather])
    } catch (err) {
        console.log(err.message)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Input your zip code: </label>
        <input
          type="text"
          name="zipcode"
          placeholder="Zip Code"
          onChange={handleChange}
          value={zip}
        />

        <br />
        <button onClick={makeApiCallCoordinates} type="submit">
          Submit
        </button>
      </form>
      {error ? (
        <>
          <h3>{error}</h3>
        </>
      ) : isSubmitted ? (
        <WeatherApi
          latitude={coordinateData.latitude}
          longitude={coordinateData.longitude}
          handleAddToDb={handleAddToDb}
        />
      ) : null}
    </>
  );
}
