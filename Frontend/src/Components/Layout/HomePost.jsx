import { useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Save_Posts , Unsave_Posts } from "../../Utils/API";
import { addItem , removeItem } from "../../Utils/SavedSlice";

const HomePost = ({id , image , name , username , time , location , title , text , likes , comments , shares}) => {

    const [isSaved , setIsSaved] = useState(false)

    const user = useSelector((store) => store.User);
    const dispatch = useDispatch()
    const isLoggedin = user.isLoggedIn

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
        <div className="home-post">
            <div className="home-post-top">
                <div className="home-post-user">
                    <img src={image} className="home-post-dp"/>
                    <div className="home-post-profile">
                        <span className="home-post-name">{name}</span>
                        <span className="home-post-username">{username} • {time}</span>
                        <span className="home-post-location">📍 {location}</span>
                    </div>
                </div>
                <button className="home-post-menu">⋮</button>
            </div>
            <div className="home-post-body">
                <span className="home-post-title">{title}</span>
                <p className="home-post-text">{text}</p>
            </div>
            <div className="home-post-bottom">
                <button className="post-action">👍 {likes}</button>
                <button className="post-action">💬 {comments}</button>
                <button className="post-action">🔄 {shares}</button>
                <button className="post-action" onClick={() => {handle_save(id)}}>{isSaved ? "✅ Saved" : "🔖 Save"}</button>
            </div>
        </div>
    )
};

export default HomePost;