import { useState } from "react";

const HomePost = ({image , name , username , time , location , title , text , likes , comments , shares , toSave , notSave}) => {

    const [isSaved , setIsSaved] = useState(false)

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
                <button className="post-action" onClick={() => {
                    if (isSaved) {
                        notSave(); setIsSaved(!isSaved);
                    } else {
                        toSave(); setIsSaved(!isSaved);
                    }
                }}>{isSaved ? "✅ Saved" : "🔖 Save"}</button>
            </div>
        </div>
    )
};

export default HomePost;