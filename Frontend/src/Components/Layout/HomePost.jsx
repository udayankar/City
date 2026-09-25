import { useState , useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Save_Posts , Unsave_Posts , Like_Posts , Unlike_Posts } from "../../Utils/API";
import { addPost, removePost } from "../../Utils/SavedSlice";

const HomePost = ({image , ID , Username , Title , Content , Location , isSaved , isLiked , Likes , Created_at , isMine}) => {

    const [Saved , setSaved] = useState(isSaved);
    const [Liked, setLiked] = useState(isLiked);
    const [LikeCount , setLikeCount] = useState(Likes ?? 0);
    const [isUpdatingLike, setIsUpdatingLike] = useState(false);
    const [isUpdatingSave, setIsUpdatingSave] = useState(false);

    const user = useSelector((store) => store.User);
    const dispatch = useDispatch();
    const isLoggedin = user.isLoggedIn;

    // Sync props → local state when the parent re-fetches and updates this post's data.
    // Without this, React reuses the component instance (same key=ID) so useState initial
    // values become stale after any parent re-render with fresh server data.
    useEffect(() => {
        setSaved(isSaved);
    }, [isSaved]);

    useEffect(() => {
        setLiked(isLiked);
    }, [isLiked]);

    useEffect(() => {
        setLikeCount(Likes ?? 0);
    }, [Likes]);

    let time = "Recently";
    if (Created_at) {
        const now = new Date();
        const created = new Date(Created_at);
        if (!isNaN(created.getTime())) {
            const diff = Math.max(0, now - created);
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const weeks = Math.floor(days / 7);
            const months = Math.floor(days / 30);

            if (seconds < 60) {
                time = "Just now";
            } else if (minutes < 60) {
                time = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
            } else if (hours < 24) {
                time = `${hours} hour${hours > 1 ? "s" : ""} ago`;
            } else if (days < 7) {
                time = `${days} day${days > 1 ? "s" : ""} ago`;
            } else if (weeks < 5) {
                time = `${weeks} week${weeks > 1 ? "s" : ""} ago`;
            } else if (months < 12) {
                time = `${months} month${months > 1 ? "s" : ""} ago`;
            }
        }
    }

    const handle_save = async (id) => {
        if (!isLoggedin || isUpdatingSave) {
            return;
        }
        setIsUpdatingSave(true);
        try {
            if (Saved) {
                const result = await Unsave_Posts(id);
                if (result.success) {
                    setSaved(false);
                    dispatch(removePost(id));
                }
            } else {
                const result = await Save_Posts(id);
                if (result.success) {
                    setSaved(true);
                    dispatch(addPost(id));
                }
            }
        } finally {
            setIsUpdatingSave(false);
        }
    };

    const handle_like = async (id) => {
        if (!isLoggedin || isUpdatingLike) {
            return;
        }
        setIsUpdatingLike(true);
        try {
            if (Liked) {
                const result = await Unlike_Posts(id);
                if (result.success) {
                    setLikeCount(prev => Math.max(0, prev - 1));
                    setLiked(false);
                }
            } else {
                const result = await Like_Posts(id);
                if (result.success) {
                    setLiked(true);
                    setLikeCount(prev => prev + 1);
                }
            }
        } finally {
            setIsUpdatingLike(false);
        }
    };

    useEffect(() => {
        if (!isLoggedin) {
            setSaved(false);
            setLiked(false);
        }
    }, [isLoggedin]);

    return (
        <article className={`home-post ${isMine ? "my-post" : "other-post"}`}>
            <div className="home-post-top">
                <div className="home-post-user">
                    <img 
                        src={image || "https://tse3.mm.bing.net/th/id/OIP.QUM-ZOG4QTjh8yGPt9ZrkgHaHa?pid=Api&P=0&h=180"} 
                        alt={Username ? `${Username}'s avatar` : "User avatar"}
                        className="home-post-dp"
                        onError={(e) => { e.currentTarget.src = "https://tse3.mm.bing.net/th/id/OIP.QUM-ZOG4QTjh8yGPt9ZrkgHaHa?pid=Api&P=0&h=180"; }}
                    />
                    <div className="home-post-profile">
                        <span className="home-post-name">{Username || "Anonymous"}</span>
                        <span className="home-post-username">{time}</span>
                        {Location && <span className="home-post-location">📍 {Location}</span>}
                    </div>
                </div>
                <button className="home-post-menu" aria-label="Post options">⋮</button>
            </div>
            <div className="home-post-body">
                <h3 className="home-post-title">{Title}</h3>
                <p className="home-post-text">{Content}</p>
            </div>
            <div className="home-post-bottom">
                <button 
                    className={`post-action ${Liked ? "liked" : ""}`} 
                    onClick={() => handle_like(ID)} 
                    disabled={isUpdatingLike}
                    aria-label={Liked ? "Unlike post" : "Like post"}
                >
                    {Liked ? "❤️" : "👍"} {LikeCount}
                </button>
                <button 
                    className="post-action" 
                    onClick={() => handle_save(ID)} 
                    disabled={isUpdatingSave}
                    aria-label={Saved ? "Unsave post" : "Save post"}
                >
                    {Saved ? "✅ Saved" : "🔖 Save"}
                </button>
            </div>
        </article>
    );
};

export default HomePost;