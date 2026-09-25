import { useState, useEffect, useRef, useCallback } from "react";
import EventCard from "../Components/Layout/EventCard";
import { All_Events } from "../Utils/API";
import Loader from "../Components/UI/Loader";

const PAGE_SIZE = 20;

const Events = () => {

    const [activeTab, setActiveTab] = useState("upcoming");
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [currentSort, setCurrentSort] = useState("Soonest");
    const [currentFilter, setCurrentFilter] = useState("None");
    const [searchTxt, setSearchTxt] = useState("");
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Infinite scroll state
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    // Sentinel ref for IntersectionObserver
    const sentinelRef = useRef(null);
    // Prevents observer from firing a load-more during the reset fetch
    const isResettingRef = useRef(false);

    const category = currentFilter === "None" ? "" : currentFilter;

    const handleSearch = () => {
        if (searchTxt.length > 0) {
            setSearchTxt("");
        }
    };

    // Fetch first page — resets all pagination state.
    // Runs on mount and whenever search/filter/sort changes.
    useEffect(() => {
        let isCurrent = true;
        isResettingRef.current = true;
        const timer = setTimeout(async () => {
            setIsLoading(true);
            setEvents([]);
            setOffset(0);
            setHasMore(true);
            try {
                const result = await All_Events(searchTxt.trim(), category, currentSort, PAGE_SIZE, 0);
                if (isCurrent && result.success && Array.isArray(result.data)) {
                    setEvents(result.data);
                    setHasMore(result.data.length === PAGE_SIZE);
                    setOffset(result.data.length);
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                    isResettingRef.current = false;
                }
            }
        }, 250);

        return () => {
            isCurrent = false;
            clearTimeout(timer);
        };
    }, [searchTxt, currentFilter, currentSort]);

    // Load the next page — appends without clobbering the existing list.
    const loadMore = useCallback(async () => {
        if (!hasMore || isFetchingMore || isResettingRef.current) return;
        setIsFetchingMore(true);
        try {
            const result = await All_Events(searchTxt.trim(), category, currentSort, PAGE_SIZE, offset);
            if (result.success && Array.isArray(result.data)) {
                if (result.data.length === 0) {
                    setHasMore(false);
                    return;
                }
                setEvents(prev => {
                    // Deduplicate by ID in case of concurrent renders
                    const existingIds = new Set(prev.map(e => e.ID));
                    const fresh = result.data.filter(e => !existingIds.has(e.ID));
                    return [...prev, ...fresh];
                });
                setOffset(prev => prev + result.data.length);
                setHasMore(result.data.length === PAGE_SIZE);
            }
        } finally {
            setIsFetchingMore(false);
        }
    }, [hasMore, isFetchingMore, offset, searchTxt, category, currentSort]);

    // IntersectionObserver: triggers loadMore when the sentinel enters the viewport.
    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { rootMargin: "200px" }
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [loadMore]);

    // Client-side tab filtering (upcoming / ongoing / past) applied after load
    const displayedEvents = events.filter(event => {
        if (activeTab === "all") return true;
        const now = new Date();
        const start = new Date(event.Start_Date);
        const end = new Date(event.End_Date);
        if (activeTab === "upcoming") return start > now;
        if (activeTab === "ongoing") return start <= now && end >= now;
        if (activeTab === "past") return end < now;
        return true;
    });

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
                ) : displayedEvents.length > 0 ? (
                    displayedEvents.map((event) => (<EventCard key={event.ID} {...event}/>))
                ) : (
                    <div className="empty-feed">
                        <p>No events found. Check back later or try adjusting filters.</p>
                    </div>
                )}
                {/* Sentinel element — IntersectionObserver fires loadMore when it enters view */}
                {!isLoading && (
                    <div ref={sentinelRef} style={{ height: 1 }}>
                        {isFetchingMore && <Loader message="Loading more events..." size="small" />}
                    </div>
                )}
                {!isLoading && !hasMore && events.length > 0 && (
                    <p className="feed-end-message">You've reached the end.</p>
                )}
            </main>
        </div>
    );
};

export default Events;