import { useState, useEffect } from "react";
import EventCard from "../Components/Layout/EventCard";
import { All_Events } from "../Utils/API";

const Events = () => {

    const [activeTab, setActiveTab] = useState("upcoming");
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentSort, setCurrentSort] = useState("Soonest");
    const [currentFilter, setCurrentFilter] = useState("None");
    const [searchTxt, setSearchTxt] = useState("");
    const [events, setEvents] = useState([]);

    const handleEvents = async () => {
        const result = await All_Events();
        console.log(result);
        if (result.success) {
            setEvents(result.data);
        }
    };

    const handleSearch = () => {
        if (searchTxt.length > 0) {
            setSearchTxt("");
        }
    };

    useEffect(() => {
        handleEvents();
    }, []);

    return (
        <div className="events-page">
            <div className="events-head">
                <div className="events-title">
                    <h1>Events</h1>
                    <p>Discover Events about to be around your city</p>
                </div>
                <div className="events-head-actions">
                    <div className="events-search">
                        <input className="events-search-txt" type="text" placeholder="Search events..." value={searchTxt}onChange={(e) => setSearchTxt(e.target.value)}/>
                        <button className="events-search-butt" onClick={handleSearch}>{searchTxt.length > 0 ? "❌" : "🔍"}</button>
                    </div>
                    <button className="events-create-butt">
                        <span>＋</span>
                        Create Event
                    </button>
                </div>
            </div>
            <div className="events-menu">
                <div className="events-tabs">
                    <button className={`events-tab ${ activeTab === "upcoming" ? "active" : ""}`} onClick={() => setActiveTab("upcoming")}>Upcoming</button>
                    <button className={`events-tab ${activeTab === "ongoing" ? "active" : ""}`} onClick={() => setActiveTab("ongoing")}
                    >Ongoing</button>
                    <button className={`events-tab ${activeTab === "past" ? "active" : ""}`} onClick={() => setActiveTab("past")}
                    >Past</button>
                </div>
                <div className="events-controls">
                    <div className="events-control">
                        <button className="events-control-button" onClick={() => {setSortOpen(!sortOpen); setFilterOpen(false);}}>
                            <span>Sort</span>
                            <strong>{currentSort}</strong>
                            <span className="events-control-arrow">⬇️</span>
                        </button>
                        {sortOpen && (
                            <ul className="events-dropdown">
                                <li onClick={() => {setCurrentSort("Soonest");setSortOpen(false);}}>Soonest</li>
                                <li onClick={() => {setCurrentSort("Latest");setSortOpen(false);}}>Latest</li>
                                <li onClick={() => {setCurrentSort("A-Z");setSortOpen(false);}}>A-Z</li>
                            </ul>
                        )}
                    </div>
                    <div className="events-control">
                        <button className="events-control-button" onClick={() => {setFilterOpen(!filterOpen); setSortOpen(false);}}>
                            <span>Filter</span>
                            <strong>{currentFilter}</strong>
                            <span className="events-control-arrow">⬇️</span>
                        </button>
                        {filterOpen && (
                            <ul className="events-dropdown">
                                <li onClick={() => {setCurrentFilter("None"); setFilterOpen(false);}}>None</li>
                                <li onClick={() => {setCurrentFilter("Community"); setFilterOpen(false);}}
                                >Community</li>
                                <li onClick={() => {setCurrentFilter("Education");setFilterOpen(false);}}>Education</li>
                                <li onClick={() => {setCurrentFilter("Arts");setFilterOpen(false);}}>Arts</li>
                                <li onClick={() => {setCurrentFilter("Sports");setFilterOpen(false);}}>Sports</li>
                                <li onClick={() => {setCurrentFilter("Health");setFilterOpen(false);}}>Health</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <main className="events-main">
                {events.map((event) => (<EventCard key={event.ID} {...event}/>))}
            </main>
        </div>
    );
};

export default Events;