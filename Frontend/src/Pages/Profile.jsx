import { useState , useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import Edit_Profile from "../Components/Layout/EditProfile";
import { My_Posts, LogoutUser } from "../Utils/API";
import ProfilePost from "../Components/Layout/ProfilePost";
import GuestProfile from "../Components/Layout/GuestProfile";
import { outUser } from "../Utils/UserSlice";
import Loader from "../Components/UI/Loader";

const Profile = () => {

    const [editing, setEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("posts");
    const [posts , setPosts] = useState([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(false);

    const closeEditor = () => {
        setEditing(false);
    };

    const user = useSelector((store) => store.User);
    const dispatch = useDispatch();
    const name = user.name;
    const email= user.email;
    const bio = user.bio;
    const dp = user.dp;
    const isLoggedin = user.isLoggedIn;

    const handle_logout = async () => {
        try {
            await LogoutUser();
        } finally {
            dispatch(outUser());
        }
    };

    const handle_mypost = async () => {
        setIsLoadingPosts(true);
        try {
            const response = await My_Posts();
            if (response && response.success && Array.isArray(response.data)) {
                setPosts(response.data);
            }
        } finally {
            setIsLoadingPosts(false);
        }
    };

    useEffect(() => {
        if (isLoggedin) {
            handle_mypost();
        }
    } , [isLoggedin]);

    if (!isLoggedin) {
        return <GuestProfile/>
    }

    return (
        <div className="profile-page">
            <section className="profile-header">
                <div className="profile-user">
                    <img 
                        className="profile-avatar" 
                        src={dp || "https://tse3.mm.bing.net/th/id/OIP.QUM-ZOG4QTjh8yGPt9ZrkgHaHa?pid=Api&P=0&h=180"} 
                        alt={`${name || "User"}'s profile`}
                        onError={(e) => { e.currentTarget.src = "https://tse3.mm.bing.net/th/id/OIP.QUM-ZOG4QTjh8yGPt9ZrkgHaHa?pid=Api&P=0&h=180"; }}
                    />
                    <div className="profile-info">
                        <h1 className="profile-name">{name}</h1>
                        <p className="profile-email">{email}</p>
                        {bio && <p className="profile-bio-text">{bio}</p>}
                        <div className="profile-meta">
                            <span>Joined {new Date().getFullYear()}</span>
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
                    <h2>{posts.length}</h2>
                    <p>Posts</p>
                </div>
                <div className="stat-box">
                    <h2>0</h2>
                    <p>Followers</p>
                </div>
                <div className="stat-box">
                    <h2>0</h2>
                    <p>Following</p>
                </div>
            </section>
            <section className="profile-tabs">
                <button className={`profile-tab ${activeTab === "posts" ? "active" : ""}`} onClick={() => setActiveTab("posts")}>My Posts
                </button>
                <button className={`profile-tab ${activeTab === "saved" ? "active" : ""}`} onClick={() => setActiveTab("saved")}>Saved</button>
            </section>
            <section className="profile-content">
                {activeTab === "posts" && (
                    isLoadingPosts ? (
                        <Loader message="Loading your posts..." />
                    ) : posts.length > 0 ? (
                        posts.map((post) => <ProfilePost key={post.ID} {...post}/>)
                    ) : (
                        <div className="empty-profile-posts">
                            <p className="empty-profile-message">You haven't created any posts yet.</p>
                        </div>
                    )
                )}
                {activeTab === "saved" && (
                    <div className="saved-posts">
                        <p className="empty-profile-message">Your saved posts will appear here.</p>
                    </div>
                )}
            </section>
            {editing && <Edit_Profile closeEditor={closeEditor}/>}
        </div>
    );
};

export default Profile;