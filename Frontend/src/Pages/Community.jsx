import { useState , useEffect, useRef, useCallback, useMemo } from "react";
import HomePost from "../Components/Layout/HomePost";
import CreatePost from "../Components/Layout/CreatePost";
import { All_Posts } from "../Utils/API";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/UI/Loader";

const PAGE_SIZE = 20;

const Community = () => {

    const [activeTab, setActiveTab] = useState("all");
    const [createPostOpen , setCreatePostOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [currentsort , setCurrentsort] = useState("Recent");
    const [filterOpen, setFilterOpen] = useState(false);
    const [currrentfilter , setCurrentfilter] = useState("None");
    const [searchtxt , setSearchtxt] = useState("");
    const [posts , setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Infinite scroll state
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    // Sentinel ref for IntersectionObserver
    const sentinelRef = useRef(null);
    // Tracks whether the initial (reset) fetch is in flight so the observer doesn't
    // fire a duplicate load-more request immediately after a reset.
    const isResettingRef = useRef(false);

    const navigate = useNavigate();
    const user = useSelector((store) => store.User);
    const isLoggedin = user.isLoggedIn;

    // Fetch first page — resets all pagination state.
    // Called on mount and whenever searchtxt / isLoggedin changes.
    useEffect(() => {
        let isCurrent = true;
        isResettingRef.current = true;
        const timer = setTimeout(async () => {
            setIsLoading(true);
            setPosts([]);
            setOffset(0);
            setHasMore(true);
            try {
                const result = await All_Posts(searchtxt.trim(), PAGE_SIZE, 0);
                if (isCurrent && result.success && Array.isArray(result.data)) {
                    setPosts(result.data);
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
    } , [searchtxt , isLoggedin]);

    // Load the next page — appends to existing list without clobbering it.
    const loadMore = useCallback(async () => {
        if (!hasMore || isFetchingMore || isResettingRef.current) return;
        setIsFetchingMore(true);
        try {
            const result = await All_Posts(searchtxt.trim(), PAGE_SIZE, offset);
            if (result.success && Array.isArray(result.data)) {
                if (result.data.length === 0) {
                    setHasMore(false);
                    return;
                }
                setPosts(prev => {
                    // Deduplicate by ID in case of concurrent renders
                    const existingIds = new Set(prev.map(p => p.ID));
                    const fresh = result.data.filter(p => !existingIds.has(p.ID));
                    return [...prev, ...fresh];
                });
                setOffset(prev => prev + result.data.length);
                setHasMore(result.data.length === PAGE_SIZE);
            }
        } finally {
            setIsFetchingMore(false);
        }
    }, [hasMore, isFetchingMore, offset, searchtxt]);

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

    // After creating a post, reset to first page so the new post appears at top.
    const handle_posts = async () => {
        setIsLoading(true);
        setPosts([]);
        setOffset(0);
        setHasMore(true);
        isResettingRef.current = true;
        try {
            const result = await All_Posts(searchtxt.trim(), PAGE_SIZE, 0);
            if (result.success && Array.isArray(result.data)) {
                setPosts(result.data);
                setHasMore(result.data.length === PAGE_SIZE);
                setOffset(result.data.length);
            }
        } finally {
            setIsLoading(false);
            isResettingRef.current = false;
        }
    };

    const handle_search = () => {
        if (searchtxt.length > 0) {
            setSearchtxt("");
        }
    };

    const displayedPosts = useMemo(() => {
        let list = [...posts];

        // Client-side filter by keyword
        if (currrentfilter !== "None") {
            const filterLower = currrentfilter.toLowerCase();
            list = list.filter(p => 
                (p.Title && p.Title.toLowerCase().includes(filterLower)) ||
                (p.Content && p.Content.toLowerCase().includes(filterLower)) ||
                (p.Location && p.Location.toLowerCase().includes(filterLower))
            );
        }

        // Client-side tab filter
        if (activeTab === "trending") {
            list.sort((a, b) => (b.Likes || 0) - (a.Likes || 0));
        } else if (activeTab === "following") {
            list = list.filter(p => p.isMine || p.isSaved);
        }

        // Client-side sort
        if (currentsort === "Most Liked") {
            list.sort((a, b) => (b.Likes || 0) - (a.Likes || 0));
        } else if (currentsort === "Recent") {
            list.sort((a, b) => new Date(b.Created_at || 0) - new Date(a.Created_at || 0));
        }

        return list;
    }, [posts, currrentfilter, activeTab, currentsort]);

    return (
        <div className="comm-page">
            <div className="comm-head">
                <div className="comm-title">
                    <h1>Community</h1>
                    <p>What's happening around your city?</p>
                </div>
                <div className="comm-head-actions">
                    <div className="post-search">
                        <input className="post-search-txt" type="text" placeholder="Search posts..." value={searchtxt} onChange={(e) => setSearchtxt(e.target.value)} aria-label="Search posts"/>
                        <button className="post-search-butt" onClick={() => handle_search()} aria-label={searchtxt.length > 0 ? "Clear search" : "Search"}>{searchtxt.length > 0 ? "❌" : "🔍"}</button>
                    </div>
                    <button className="post-create-butt" onClick={() => {if (isLoggedin) {setCreatePostOpen(true);} else {navigate("/login");}}}>
                        <span>＋</span>
                        Create Post
                    </button>
                </div>
            </div>
            <div className="comm-menu">
                <div className="comm-tabs">
                    <button className={`comm-tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>All Posts</button>
                    <button className={`comm-tab ${activeTab === "trending" ? "active" : ""}`} onClick={() => setActiveTab("trending")}>Trending</button>
                    <button className={`comm-tab ${activeTab === "following" ? "active" : ""}`}onClick={() => setActiveTab("following")}>Following</button>
                </div>
                <div className="comm-controls">
                    <div className="menu-control">
                        <button className="menu-control-button" onClick={() => {setSortOpen(!sortOpen); setFilterOpen(false);}} aria-expanded={sortOpen}>
                            <span>Sort</span>
                            <strong>{currentsort}</strong>
                            <span className="control-arrow">⬇️</span>
                        </button>
                        {sortOpen && (
                            <ul className="control-dropdown">
                                <li onClick={() => {setCurrentsort("Recent"); setSortOpen(false)}}>Recent</li>
                                <li onClick={() => {setCurrentsort("Most Liked"); setSortOpen(false)}}>Most Liked</li>
                            </ul>)}
                    </div>
                    <div className="menu-control">
                        <button className="menu-control-button" onClick={() => {setFilterOpen(!filterOpen);setSortOpen(false);}} aria-expanded={filterOpen}>
                            <span>Filter</span>
                            <strong>{currrentfilter}</strong>
                            <span className="control-arrow">⬇️</span>
                        </button>
                        {filterOpen && (
                            <ul className="control-dropdown">
                                <li onClick={() => {setFilterOpen(false); setCurrentfilter("None")}}>None</li>
                                <li onClick={() => {setFilterOpen(false); setCurrentfilter("Food")}}>Food</li>
                                <li onClick={() => {setFilterOpen(false); setCurrentfilter("Events")}}>Events</li>
                                <li onClick={() => {setFilterOpen(false); setCurrentfilter("Traffic")}}>Traffic</li>
                                <li onClick={() => {setFilterOpen(false); setCurrentfilter("Recommendations")}}>Recommendations</li>
                            </ul>)}
                    </div>
                </div>
            </div>
            <main className="comm-main">
                {isLoading ? (
                    <Loader message="Loading community posts..." />
                ) : displayedPosts.length > 0 ? (
                    displayedPosts.map((post) => (<HomePost key={post.ID} {...post}/>))
                ) : (
                    <div className="empty-feed">
                        <p>No posts found. Try adjusting your search or filters.</p>
                    </div>
                )}
                {/* Sentinel element — IntersectionObserver fires loadMore when it enters view */}
                {!isLoading && (
                    <div ref={sentinelRef} style={{ height: 1 }}>
                        {isFetchingMore && <Loader message="Loading more posts..." size="small" />}
                    </div>
                )}
                {!isLoading && !hasMore && posts.length > 0 && (
                    <p className="feed-end-message">You've reached the end.</p>
                )}
            </main>
            {createPostOpen && (<CreatePost onClose={() => setCreatePostOpen(false)} onPostCreated={handle_posts}/>)}
        </div>
    );
};

export default Community;