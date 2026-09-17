import { useState, useEffect } from "react";
import EventCard from "../Components/Layout/EventCard";
import { All_Events } from "../Utils/API";
import Loader from "../Components/UI/Loader";

const Events = () => {

    const [activeTab, setActiveTab] = useState("upcoming");
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentSort, setCurrentSort] = useState("Soonest");
    const [currentFilter, setCurrentFilter] = useState("None");
    const [searchTxt, setSearchTxt] = useState("");
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const category = currentFilter === "None" ? "" : currentFilter;

    const handle_events = async () => {
        setIsLoading(true);
        try {
            const result = await All_Events(searchTxt.trim() , category , currentSort);
            if (result.success && Array.isArray(result.data)) {
                setEvents(result.data);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        if (searchTxt.length > 0) {
            setSearchTxt("");
        }
    };

    useEffect(() => {
        let isCurrent = true;
        const timer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const result = await All_Events(searchTxt.trim() , category , currentSort);
                if (isCurrent && result.success && Array.isArray(result.data)) {
                    setEvents(result.data);
                }
            } finally {
                if (isCurrent) setIsLoading(false);
            }
        }, 250);

        return () => {
            isCurrent = false;
            clearTimeout(timer);
        };
    }, [searchTxt, currentFilter, currentSort]);

    return (
        <div className="events-page">
            <div className="events-head">
                <div className="events-title">
                    <h1>Events</h1>
                    <p>Discover Events about to be around your city</p>
                </div>
                <div className="events-head-actions">
                    <div className="events-search">
                        <input className="events-search-txt" type="text" placeholder="Search events..." value={searchTxt} onChange={(e) => setSearchTxt(e.target.value)} aria-label="Search events"/>
                        <button className="events-search-butt" onClick={handleSearch} aria-label={searchTxt.length > 0 ? "Clear search" : "Search"}>{searchTxt.length > 0 ? "❌" : "🔍"}</button>
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
                    <button className={`events-tab ${activeTab === "ongoing" ? "active" : ""}`} onClick={() => setActiveTab("ongoing")}>Ongoing</button>
                    <button className={`events-tab ${activeTab === "past" ? "active" : ""}`} onClick={() => setActiveTab("past")}>Past</button>
                </div>
                <div className="events-controls">
                    <div className="events-control">
                        <button className="events-control-button" onClick={() => {setSortOpen(!sortOpen); setFilterOpen(false);}} aria-expanded={sortOpen}>
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
                        <button className="events-control-button" onClick={() => {setFilterOpen(!filterOpen); setSortOpen(false);}} aria-expanded={filterOpen}>
                            <span>Filter</span>
                            <strong>{currentFilter}</strong>
                            <span className="events-control-arrow">⬇️</span>
                        </button>
                        {filterOpen && (
                            <ul className="events-dropdown">
                                <li onClick={() => {setCurrentFilter("None"); setFilterOpen(false);}}>None</li>
                                <li onClick={() => {setCurrentFilter("Community"); setFilterOpen(false);}}>Community</li>
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
                {isLoading ? (
                    <Loader message="Loading events..." />
                ) : events.length > 0 ? (
                    events.map((event) => (<EventCard key={event.ID} {...event}/>))
                ) : (
                    <div className="empty-feed">
                        <p>No events found. Check back later or try adjusting filters.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Events;