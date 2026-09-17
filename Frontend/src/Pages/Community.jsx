import { useState , useEffect, useMemo } from "react";
import HomePost from "../Components/Layout/HomePost";
import CreatePost from "../Components/Layout/CreatePost";
import { All_Posts } from "../Utils/API";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/UI/Loader";

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

    const navigate = useNavigate();
    const user = useSelector((store) => store.User);
    const isLoggedin = user.isLoggedIn;

    const handle_posts = async () => {
        setIsLoading(true);
        try {
            const result = await All_Posts(searchtxt.trim());
            if (result.success && Array.isArray(result.data)) {
                setPosts(result.data);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handle_search = () => {
        if (searchtxt.length > 0) {
            setSearchtxt("");
        }
    };
    
    useEffect(() => {
        let isCurrent = true;
        const timer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const result = await All_Posts(searchtxt.trim());
                if (isCurrent && result.success && Array.isArray(result.data)) {
                    setPosts(result.data);
                }
            } finally {
                if (isCurrent) setIsLoading(false);
            }
        }, 250);

        return () => {
            isCurrent = false;
            clearTimeout(timer);
        };
    } , [searchtxt , isLoggedin]);

    const displayedPosts = useMemo(() => {
        let list = [...posts];

        // Client-side filter
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
            // If following is selected, show user's or saved if any
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
                                <li onClick={() => {setCurrentsort("Most Commented"); setSortOpen(false)}}>Most Commented</li>
                                <li onClick={() => {setCurrentsort("Most Shared"); setSortOpen(false)}}>Most Shared</li>
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
            </main>
            {createPostOpen && (<CreatePost onClose={() => setCreatePostOpen(false)} onPostCreated={handle_posts}/>)}
        </div>
    );
};

export default Community;