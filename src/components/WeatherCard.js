import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { RiFahrenheitFill } from "react-icons/ri";

const WeatherCard = ({ location, temperature, weather, onDelete,darkMode }) => {
    const celsiusToFahrenheit = (celsius) => (celsius * 9/5) + 32;
    const [isCelsius, setIsCelsius] = useState(true);

    const toggleDegree = () => {
        setIsCelsius(!isCelsius);
    };

    return (
        <div className={`w-[22%]  shadow-lg rounded-lg overflow-hidden m-4 ${darkMode ? 'bg-white' : 'bg-slate-200'}`}>
            <div className="p-4 ">
                <h2 className="text-xl font-semibold">{location}</h2>
                <p className="text-gray-600 text-4xl font-bold">{isCelsius ? (temperature - 273.15).toFixed(1) + '°C' : celsiusToFahrenheit(temperature - 273.15).toFixed(1) + '°F'}</p>
                <p className="text-gray-600">{weather}</p>
            </div>
            <div className="flex justify-center p-4"> 
                <RiFahrenheitFill className='text-blue-500 text-xl ml-4' onClick={toggleDegree} >{isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius'}</RiFahrenheitFill>
                <MdDeleteForever className='text-red-500 text-xl ml-4' onClick={onDelete}/>
            </div>
        </div>
    );
};

export default WeatherCard;

