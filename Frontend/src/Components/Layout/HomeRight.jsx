import { useContext, useState , useEffect } from "react";
import { CityContext } from "../../Utils/Context";
import HomeEvent from "./HomeEvent";
import { useDispatch } from "react-redux";
import { addItem , removeItem } from "../../Utils/SavedSlice";
import CityMap from "../Maps/citymap";
import { CityCoordinates } from "../../Assets/CityCoordinates";
import { All_Events } from "../../Utils/API";

const HomeRight = () => {
    const {currentCity , setCurrentCity} = useContext(CityContext);
    const dispatch = useDispatch();

    const [events , setEvents] = useState([]);

    const handle_events = async () => {
        const result = await All_Events();
        if (result.success) {
            setEvents(result.data)
        }
    }

    useEffect(() => {
        handle_events();
    } , []);

    return (
        <div className="right-cont">
            <div className="explore-cont">
                <div className="explore-top">
                    <span className="explore-head">Explore and Navigate</span>
                    <span className="explore-extend">View Full Map</span>
                </div>
                <div className="map-container">
                    <CityMap key={currentCity} center={CityCoordinates[currentCity]}/>
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
                    <span className="event-extend">View all</span>
                </div>
                <div className="event-list">
                    {events.map(event => (
                        <HomeEvent key={event.ID} {...event} toSave={() => dispatch(addItem(event))} notSave={() => dispatch(removeItem(event))}/>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default HomeRight;