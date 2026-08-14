const ProfilePost = ({ID , Username , Title , Content , Location , Created_at}) => {

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

    return (
        <article className="profile-post">
            <div className="profile-post-top">
                <div className="profile-post-user">
                    <div>
                        <h3 className="profile-post-name">{Username}</h3>
                        <p className="profile-post-location">{Location} • {time}</p>
                    </div>
                </div>
            </div>
            <h3 className="profile-post-title">{Title}</h3>
            <p className="profile-post-content">{Content}.</p>
            <div className="profile-post-actions">
                <button className="profile-post-action">👍 52</button>
                <button className="profile-post-action">💬 12</button>
                <button className="profile-post-action">↗ 5</button>
            </div>
        </article>
    )
}

export default ProfilePost; 