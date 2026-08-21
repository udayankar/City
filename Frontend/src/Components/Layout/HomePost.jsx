import { useState , useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Save_Posts , Unsave_Posts , Like_Posts , Unlike_Posts } from "../../Utils/API";
import { addItem , removeItem } from "../../Utils/SavedSlice";

const HomePost = ({image , ID , Username , Title , Content , Location , isSaved , isLiked , Likes , Created_at , isMine}) => {

    const [Saved , setSaved] = useState(isSaved);
    const [Liked, setLiked] = useState(isLiked);
    const [LikeCount , setLikeCount] = useState(Likes);

    const user = useSelector((store) => store.User);
    const dispatch = useDispatch()
    const isLoggedin = user.isLoggedIn
    
    const now = new Date();
    const created = new Date(Created_at);
    const diff = now - created;
    let time = ""

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

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

    const handle_save = async (id) => {
        if (!isLoggedin) {
            return 
        } else {
            if (Saved) {
                const result = await Unsave_Posts(id);
                if (result.success) {
                    setSaved(!Saved)
                    dispatch(removeItem(id))
                }
            } else if (!Saved) {
                const result = await Save_Posts(id);
                if (result.success) {
                    setSaved(!Saved)
                    dispatch(addItem(id))
                }
            }
        }
    };

    const handle_like = async (id) => {
        if (!isLoggedin) {
            return
        } else {
            if (Liked) {
                const result = await Unlike_Posts(id);
                if (result.success) {
                    setLikeCount(prev => prev-1);
                    setLiked(false);
                }
            } else if (!Liked) {
                const result = await Like_Posts(id);
                if (result.success) {
                    setLiked(true);
                    setLikeCount(prev => prev+1);
                }
            }
        }
    };

    return (
        <div className={`home-post ${isMine ? "my-post" : "other-post"}`}>
            <div className="home-post-top">
                <div className="home-post-user">
                    <img src={image} className="home-post-dp"/>
                    <div className="home-post-profile">
                        <span className="home-post-name">{Username}</span>
                        <span className="home-post-username">{time}</span>
                        <span className="home-post-location">📍 {Location}</span>
                    </div>
                </div>
                <button className="home-post-menu">⋮</button>
            </div>
            <div className="home-post-body">
                <span className="home-post-title">{Title}</span>
                <p className="home-post-text">{Content}</p>
            </div>
            <div className="home-post-bottom">
                <button className={`post-action ${Liked ? "liked" : ""}`} onClick={() => handle_like(ID)}>{Liked ? "❤️" : "👍"} {LikeCount}</button>
                {/* <button className="post-action">💬 {comments}</button>
                <button className="post-action">🔄 {shares}</button> */}
                <button className="post-action" onClick={() => {handle_save(ID)}}>{Saved ? "✅ Saved" : "🔖 Save"}</button>
            </div>
        </div>
    )
};

export default HomePost;