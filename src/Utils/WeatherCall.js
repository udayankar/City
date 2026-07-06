import { Weather_URL } from "../Assets/URL";
import { useContext, useState , useEffect } from "react";
import { CityContext } from "../Context";

const Weather = () => {
    const { currentCity } = useContext(CityContext);
    const [weather , setWeather] = useState(null);

    useEffect(() => { if (currentCity) {getWeather()} } , [currentCity]);

    const getWeather = async () => {
        const response = await fetch(Weather_URL[0] + currentCity + Weather_URL[1])
        const response_json = await response.json()
        setWeather(response_json)
    };

    return (
        <div className="hero-climate">
            <span className="hero-temp">🌦️ {weather?.main?.temp}*C</span>
            <span className="hero-disc">{weather?.weather?.[0]?.description?.charAt(0).toUpperCase() + weather?.weather?.[0]?.description?.slice(1)}</span>
        </div>
    )
};

export default Weather;