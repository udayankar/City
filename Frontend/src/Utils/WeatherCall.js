import { Weather_URL } from "../Assets/URL";
import { useContext, useState , useEffect } from "react";
import { CityContext } from "./Context";

const Weather = () => {
    const { currentCity } = useContext(CityContext) || { currentCity: "Rohtak" };
    const [weather , setWeather] = useState(null);

    useEffect(() => {
        let isCurrent = true;
        if (!currentCity) return;

        const getWeather = async () => {
            try {
                const response = await fetch(Weather_URL[0] + encodeURIComponent(currentCity) + Weather_URL[1]);
                if (!response.ok) return;
                const response_json = await response.json();
                if (isCurrent && response_json) {
                    setWeather(response_json);
                }
            } catch (err) {
                // Silently handle weather fetch failures
            }
        };

        getWeather();
        return () => { isCurrent = false; };
    }, [currentCity]);

    const tempDisplay = weather?.main?.temp != null ? `${Math.round(weather.main.temp)}°C` : "--°C";
    const desc = weather?.weather?.[0]?.description;
    const formattedDesc = desc ? desc.charAt(0).toUpperCase() + desc.slice(1) : "Weather update";

    return (
        <div className="hero-climate">
            <span className="hero-temp">🌦️ {tempDisplay}</span>
            <span className="hero-disc">{formattedDesc}</span>
        </div>
    );
};

export default Weather;