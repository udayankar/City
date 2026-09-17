import { useContext } from "react";
import { CityContext } from "../Utils/Context";
import CityMap from "../Components/Maps/citymap";
import { CityCoordinates } from "../Assets/CityCoordinates";

const Maps = () => {
    const { currentCity } = useContext(CityContext);
    const coords = CityCoordinates[currentCity] || CityCoordinates["Rohtak"];

    return (
        <div className="placeholder-page">
            <h1>Interactive Map - {currentCity}</h1>
            <p>Explore city locations, points of interest, and navigation.</p>
            <div style={{ marginTop: "20px" }}>
                <CityMap key={currentCity} center={coords} />
            </div>
        </div>
    );
};

export default Maps;
