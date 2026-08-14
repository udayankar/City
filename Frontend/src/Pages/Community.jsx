import { useState , useEffect } from "react";
import HomePost from "../Components/Layout/HomePost";
import { All_Posts } from "../Utils/API";

const Community = () => {

    const [activeTab, setActiveTab] = useState("all");
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [posts , setPosts] = useState([]);

    const handle_posts = async () => {
            const result = await All_Posts();
            console.log(result)
            if (result.success) {
                setPosts(result.data)
            }
        }
    
    useEffect(() => {
        handle_posts()
    } , [])

    return (
        <div className="comm-page">
            <div className="comm-head">
                <div className="comm-title">
                    <h1>Community</h1>
                    <p>What's happening around your city?</p>
                </div>
                <div className="comm-head-actions">
                    <div className="post-search">
                        <input className="post-search-txt" type="text" placeholder="Search posts..."/>
                        <button className="post-search-butt">🔍</button>
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
                            <strong>Recent</strong>
                            <span className="control-arrow">⬇️</span>
                        </button>
                        {sortOpen && (
                            <ul className="control-dropdown">
                                <li>Recent</li>
                                <li>Most Liked</li>
                                <li>Most Commented</li>
                                <li>Most Shared</li>
                            </ul>)}
                    </div>
                    <div className="menu-control">
                        <button className="menu-control-button" onClick={() => {setFilterOpen(!filterOpen);setSortOpen(false);}}>
                            <span>Filter</span>
                            <strong>None</strong>
                            <span className="control-arrow">⬇️</span>
                        </button>
                        {filterOpen && (
                            <ul className="control-dropdown">
                                <li>None</li>
                                <li>Food</li>
                                <li>Events</li>
                                <li>Traffic</li>
                                <li>Government</li>
                                <li>Recommendations</li>
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