import { useState , useEffect } from "react";
import HomePost from "../Components/Layout/HomePost";
import { All_Posts } from "../Utils/API";

const Community = () => {

    const [activeTab, setActiveTab] = useState("all");
    const [sortOpen, setSortOpen] = useState(false);
    const [currentsort , setCurrentsort] = useState("Recent");
    const [filterOpen, setFilterOpen] = useState(false);
    const [currrentfilter , setCurrentfilter] = useState("None");
    const [searchtxt , setSearchtxt] = useState("");
    const [posts , setPosts] = useState([]);

    const handle_posts = async () => {
            const result = await All_Posts(searchtxt);
            console.log(result)
            if (result.success) {
                setPosts(result.data)
            }
        }

    const handle_search = () => {
        if (searchtxt.length > 0) {
            setSearchtxt("")
        } else {
            return
        }
    };
    
    useEffect(() => {
        handle_posts()
    } , [searchtxt])

    return (
        <div className="comm-page">
            <div className="comm-head">
                <div className="comm-title">
                    <h1>Community</h1>
                    <p>What's happening around your city?</p>
                </div>
                <div className="comm-head-actions">
                    <div className="post-search">
                        <input className="post-search-txt" type="text" placeholder="Search posts..." value={searchtxt} onChange={(e) => setSearchtxt(e.target.value)}/>
                        <button className="post-search-butt" onClick={() => handle_search()}>{searchtxt.length > 0 ? "❌" : "🔍"}</button>
                    </div>
                    <button className="post-create-butt">
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
                        <button className="menu-control-button" onClick={() => {setSortOpen(!sortOpen); setFilterOpen(false);}}>
                            <span>Sort</span>
                            <strong>{currentsort}</strong>
                            <span className="control-arrow">⬇️</span>
                        </button>
                        {sortOpen && (
                            <ul className="control-dropdown">
                                <li onClick={() => {setCurrentsort("Recent"); setSortOpen(!sortOpen)}}>Recent</li>
                                <li onClick={() => {setCurrentsort("Most Liked"); setSortOpen(!sortOpen)}}>Most Liked</li>
                                <li onClick={() => {setCurrentsort("Most Commented"); setSortOpen(!sortOpen)}}>Most Commented</li>
                                <li onClick={() => {setCurrentsort("Most Shared"); setSortOpen(!sortOpen)}}>Most Shared</li>
                            </ul>)}
                    </div>
                    <div className="menu-control">
                        <button className="menu-control-button" onClick={() => {setFilterOpen(!filterOpen);setSortOpen(false);}}>
                            <span>Filter</span>
                            <strong>{currrentfilter}</strong>
                            <span className="control-arrow">⬇️</span>
                        </button>
                        {filterOpen && (
                            <ul className="control-dropdown">
                                <li onClick={() => {setFilterOpen(!filterOpen); setCurrentfilter("None")}}>None</li>
                                <li onClick={() => {setFilterOpen(!filterOpen); setCurrentfilter("Food")}}>Food</li>
                                <li onClick={() => {setFilterOpen(!filterOpen); setCurrentfilter("Events")}}>Events</li>
                                <li onClick={() => {setFilterOpen(!filterOpen); setCurrentfilter("Traffic")}}>Traffic</li>
                                <li onClick={() => {setFilterOpen(!filterOpen); setCurrentfilter("Recommendations")}}>Recommendations</li>
                            </ul>)}
                    </div>
                </div>
            </div>
            <main className="comm-main">
                {posts.map((post) => (<HomePost key={post.ID} {...post}/>))}
            </main>
        </div>
    );
};

export default Community;