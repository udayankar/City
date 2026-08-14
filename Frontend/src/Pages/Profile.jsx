import { useState } from "react";
import { useSelector } from "react-redux";
import Edit_Profile from "./EditProfile";

const Profile = () => {

    const [editing, setEditing] = useState(false);

    const closeEditor = () => {
        setEditing(false);
    };

    const user = useSelector((store) => store.User);
    const name = user.name
    const email= user.email
    const bio = user.bio
    const dp = user.dp

    return (
        <div className="profile-page">
            <section className="profile-header">
                <div className="profile-user">
                    <img className="profile-avatar" src="xyz" alt="Profile"/>
                    <div className="profile-info">
                        <h1 className="profile-name">{name}</h1>
                        <p className="profile-email">{email}</p>
                        <p className="profile-bio-text">{bio}</p>
                        <div className="profile-meta">
                            <span>📍 Kolkata</span>
                            <span>Joined January 2026</span>
                        </div>
                    </div>
                </div>
                <button className="profile-edit" onClick={() => setEditing(true)}>Edit Profile</button>
            </section>
            <section className="profile-stats">
                <div className="stat-box">
                    <h2>18</h2>
                    <p>Posts</p>
                </div>
                <div className="stat-box">
                    <h2>426</h2>
                    <p>Followers</p>
                </div>
                <div className="stat-box">
                    <h2>198</h2>
                    <p>Following</p>
                </div>
            </section>
            <section className="my-posts">
                <h2>My Posts</h2>
                <article className="profile-post">
                    <div className="profile-post-top">
                        <div className="profile-post-user">
                            <img className="profile-post-avatar" src="xyz" alt="Profile"/>
                            <div>
                                <h3 className="profile-post-name">{name}</h3>
                                <p className="profile-post-location">Kolkata • 2 hours ago</p>
                            </div>
                        </div>
                    </div>
                    <h3 className="profile-post-title">
                        Beautiful Evening in Kolkata
                    </h3>
                    <p className="profile-post-content">
                        The city looked amazing today. There were
                        people everywhere enjoying the evening.
                    </p>
                    <div className="profile-post-actions">
                        <button className="profile-post-action">👍 52</button>
                        <button className="profile-post-action">💬 12</button>
                        <button className="profile-post-action">↗ 5</button>
                    </div>
                </article>
            </section>
            {editing && <Edit_Profile closeEditor={closeEditor}/>}
        </div>
    );
};

export default Profile;