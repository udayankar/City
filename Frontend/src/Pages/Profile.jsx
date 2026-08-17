import { useState , useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import Edit_Profile from "../Components/Layout/EditProfile";
import { My_Posts , Log} from "../Utils/API";
import ProfilePost from "../Components/Layout/ProfilePost";
import GuestProfile from "../Components/Layout/GuestProfile";
import { outUser } from "../Utils/UserSlice";

const Profile = () => {

    const [editing, setEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("posts");
    const [posts , setPosts] = useState([]);

    const closeEditor = () => {
        setEditing(false);
    };

    const user = useSelector((store) => store.User);
    const dispatch = useDispatch();
    const name = user.name
    const email= user.email
    const bio = user.bio
    const dp = user.dp
    const isLoggedin = user.isLoggedIn

    const handle_logout = async () => {
        await fetch("http://localhost:8000/users/logout", {
            method: "POST",
            credentials: "include"
        });
        dispatch(outUser())
    }

    const handle_mypost = async () => {
        const response = await My_Posts();
        if (response.success) {
            setPosts(response.data)
        }
    }

    useEffect(() => {
        handle_mypost()
    } , []);

    if (!isLoggedin) {
        return <GuestProfile/>
    }

    return (
        <div className="profile-page">
            <section className="profile-header">
                <div className="profile-user">
                    <img className="profile-avatar" src={dp || "xyz"} alt="Profile"/>
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
                <div className="profile-header-actions">
                    <button className="profile-edit" onClick={() => setEditing(true)}>Edit Profile</button>
                    <button className="profile-logout" onClick={handle_logout}>Logout</button>
                </div>
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
            <section className="profile-tabs">
                <button className={`profile-tab ${activeTab === "posts" ? "active" : ""}`} onClick={() => setActiveTab("posts")}>My Posts
                </button>
                <button className={`profile-tab ${activeTab === "saved" ? "active" : ""}`} onClick={() => setActiveTab("saved")}>Saved</button>
            </section>
            <section className="profile-content">
                {activeTab === "posts" && (posts.map((post) => <ProfilePost key={post.ID} {...post}/>))}
                {activeTab === "saved" && (
                    <div className="saved-posts">
                        <p className="empty-profile-message">Your saved posts will appear here.</p>
                    </div>)}
            </section>
            {editing && <Edit_Profile closeEditor={closeEditor}/>}
        </div>
    );
};

export default Profile;