import { useContext, useState , useEffect } from "react";
import { CityContext } from "../../Utils/Context";
import HomeEvent from "./HomeEvent";
import { useDispatch } from "react-redux";
import CityMap from "../Maps/citymap";
import { CityCoordinates } from "../../Assets/CityCoordinates";
import { All_Events } from "../../Utils/API";

const HomeRight = () => {
    const {currentCity , setCurrentCity} = useContext(CityContext);

    const [events , setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handle_events = async () => {
        setIsLoading(true);
        try {
            const result = await All_Events();
            if (result.success && Array.isArray(result.data)) {
                setEvents(result.data);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let isCurrent = true;
        (async () => {
            setIsLoading(true);
            try {
                const result = await All_Events();
                if (isCurrent && result.success && Array.isArray(result.data)) {
                    setEvents(result.data);
                }
            } finally {
                if (isCurrent) setIsLoading(false);
            }
        })();
        return () => { isCurrent = false; };
    } , []);

    const coordinates = CityCoordinates[currentCity] || CityCoordinates["Rohtak"] || [28.8955, 76.6066];

    return (
        <div className="right-cont">
            <div className="explore-cont">
                <div className="explore-top">
                    <span className="explore-head">Explore and Navigate</span>
                    <span className="explore-extend">View Full Map</span>
                </div>
                <div className="map-container">
                    <CityMap key={currentCity} center={coordinates}/>
                </div>
                <div className="explore-tag">
                    <button className="explore-park">🌲 Parks</button>
                    <button className="explore-toilet">🚻 Toilets</button>
                    <button className="explore-monument">🗿 Monuments</button>
                    <button className="explore-user">💠 You are here</button>
                </div>
            </div>
            <div className="travel-cont">
                <div className="travel-top">
                    <span className="travel-head">Travel and Transit</span>
                    <span className="travel-extend">View all</span>
                </div>
                <div className="travel-body">
                    <ul className="travel-mode">
                        <li className="travel-mode-box">
                            <span className="travel-mode-icon">🛣️</span>
                            <span className="travel-mode-text">Plan Route</span>
                        </li>
                        <li className="travel-mode-box">
                            <span className="travel-mode-icon">🚌</span>
                            <span className="travel-mode-text">Bus Route</span>
                        </li>
                        <li className="travel-mode-box">
                            <span className="travel-mode-icon">🚇</span>
                            <span className="travel-mode-text">Metro Route</span>
                        </li>
                        <li className="travel-mode-box">
                            <span className="travel-mode-icon">📍</span>
                            <span className="travel-mode-text">Live Tracking</span>
                        </li>
                    </ul>
                </div>
                <div className="travel-foot">
                    <div className="travel-start">
                        <button className="travel-start-icon">🟢</button>
                        <input className="travel-start-text" type="text" placeholder="From"></input>
                    </div>
                    <button className="travel-interchange">⬆️⬇️</button>
                    <div className="travel-end">
                        <button className="travel-end-icon">🍎</button>
                        <input className="travel-end-text" type="text" placeholder="To"></input>
                    </div>
                    <button className="travel-confirm">Find Route</button>
                </div>
            </div>
            <div className="event-cont">
                <div className="event-top">
                    <span className="event-head">Upcoming Events</span>
                    <a href="/events" className="event-extend">View all</a>
                </div>
                <div className="event-list">
                    {events.length > 0 ? (
                        events.slice(0, 3).map(event => (
                            <HomeEvent key={event.ID} {...event}/>
                        ))
                    ) : (
                        <p className="empty-home-events">No upcoming events right now.</p>
                    )}
                </div>
            </div>
        </div>
    )
};

export default HomeRight;