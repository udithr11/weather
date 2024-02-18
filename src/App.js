import "./App.css";
import React, { useState } from "react";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import WeatherCard from "./components/WeatherCard";

const API_KEY = "99b04f642e6bf11f47129a45400bd310";
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

function App() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(`${API_URL}?q=${cityName}&appid=${API_KEY}`);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData([...weatherData, data]);
      setLocation("");
    } catch (error) {
      prompt(error)
      setError(error.message);
    }
  };

  const handleDelete = (index) => {
    const newData = [...weatherData];
    newData.splice(index, 1);
    setWeatherData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(location);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

 
  
  
  return (
    
      <div className=  {` h-screen ${darkMode ? 'bg-blue-100' : 'bg-gray-200'}`}>
        <div className=" bg-blue-2003 flex justify-center items-center ml-9">
          <p className="mt-20 font-bold text-2xl">Weather App</p>
          <div>
            {darkMode ? (
              <IoMdSunny onClick={toggleDarkMode} className="text-yellow-500 mt-20 text-xl cursor-pointer" />
            ) : (
              <IoMdMoon onClick={toggleDarkMode} className="text-white mt-20 text-xl cursor-pointer" />
            )}
          </div>
        </div>
        <div>
        <form className="" onSubmit={handleSubmit}>
          <div className="flex justify-center ">
            <input
              className="shadow  appearance-none rounded-l-3xl w-4/6 py-2 px-3  text-gray-700 "
              type="text"
              placeholder="Enter location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 shadow hover:bg-blue-700  text-white font-bold py-2 px-3 rounded-r-3xl "
            >
              Add
            </button>
            <button
              type="button"
              onClick={toggleDarkMode}
              className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl shadow"
            >
              {darkMode ? "Night Mode" : "Day Mode"}
            </button>
          </div>
        </form>
        </div>
        <div className="flex flex-wrap p-5">
        {weatherData.map((data, index) => (
          <WeatherCard
            key={index}
            location={data.name}
            temperature={data.main.temp}
            weather={data.weather[0].main}
            onDelete={() => handleDelete(index)}
            darkMode={darkMode} 
          />
        ))}
      </div>
      </div>
    
  );
}

export default App;
