import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="side-nav">
            <div className="side-cont">
                <div className="brand-cont">
                    <img className="brand-icon" src="https://tse3.mm.bing.net/th/id/OIP.QUM-ZOG4QTjh8yGPt9ZrkgHaHa?pid=Api&P=0&h=180" alt="Brand Logo"></img>
                    <span className="brand-name">City</span>
                </div>
                <ul className="page-cont">
                    <li className="page"><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/community">Community</NavLink></li>
                    <li><NavLink to="/explore">Explore City</NavLink></li>
                    <li><NavLink to="/events">Events</NavLink></li>
                    <li><NavLink to="/market">Marketplace</NavLink></li>
                    <li><NavLink to="/travel">Travel and Transit</NavLink></li>
                    <li><NavLink to="/parks">Parks and Outdoors</NavLink></li>
                    <li><NavLink to="/toilets">Public Toilets</NavLink></li>
                </ul>
                <ul className="control-cont">
                    <li><NavLink to="/alerts">Alerts</NavLink></li>
                    <li><NavLink to="/saved">Saved</NavLink></li>
                    <li><NavLink to="/profile">Profile</NavLink></li>
                    <li><NavLink to="/settings">Settings</NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;