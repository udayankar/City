import { NavLink } from "react-router-dom";

const GuestProfile = () => {

    return (
        <div className="guest-profile">
            <div className="guest-profile-icon">👤</div>
            <h1 className="guest-profile-title">Your City Profile</h1>
            <p className="guest-profile-text">Join the community to create your profile, save places and posts, and share your experiencewith your city.</p>
            <div className="guest-profile-actions">
                <NavLink to="/login" className="guest-login">Log In</NavLink>
                <NavLink to="/signup" className="guest-signup">Sign Up</NavLink>
            </div>
            <div className="guest-benefits">
                <h2>What you can do</h2>
                <div className="guest-benefit">
                    <span>❤️</span>
                    <div>
                        <h3>Save posts</h3>
                        <p>Keep interesting posts for later.</p>
                    </div>
                </div>
                <div className="guest-benefit">
                    <span>📝</span>
                    <div>
                        <h3>Share your experience</h3>
                        <p>Create posts and tell your city story.</p>
                    </div>
                </div>
                <div className="guest-benefit">
                    <span>👥</span>
                    <div>
                        <h3>Join the community</h3>
                        <p>Connect with people around your city.</p>
                    </div>
                </div>
                <div className="guest-benefit">
                    <span>📍</span>
                    <div>
                        <h3>Personalize your profile</h3>
                        <p>Build your own identity on City.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestProfile;