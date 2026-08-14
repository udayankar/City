import { useState , useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Save_Posts , Unsave_Posts } from "../../Utils/API";
import { addItem , removeItem } from "../../Utils/SavedSlice";

const HomePost = ({ID , image , Username , Created_at , Location , Title , Content , likes , comments , shares , isMine}) => {

    const [isSaved , setIsSaved] = useState(false)
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
                if (isSaved) {
                    const result = await Unsave_Posts(id);
                    if (result.success) {
                        setIsSaved(!isSaved)
                        dispatch(removeItem(id))
                    }
                } else if (!isSaved) {
                    const result = await Save_Posts(id);
                    if (result.success) {
                        setIsSaved(!isSaved)
                        dispatch(addItem(id))
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
                <button className="post-action">👍 {likes}</button>
                <button className="post-action">💬 {comments}</button>
                <button className="post-action">🔄 {shares}</button>
                <button className="post-action" onClick={() => {handle_save(ID)}}>{isSaved ? "✅ Saved" : "🔖 Save"}</button>
            </div>
        </div>
    )
};

export default HomePost;