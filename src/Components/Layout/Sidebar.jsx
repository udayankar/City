import { NavLink } from "react-router-dom";
import { Logo_URL } from "../../Assets/URL";
import { useState } from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const [showExplore , setShowExplore] = useState(false);

    const SaveLen = useSelector((store) => store.Saved.length);
    console.log(SaveLen);

    return (
        <div className="side-nav">
            <div className="side-cont">
                <div className="brand-cont">
                    <img className="brand-icon" src={Logo_URL} alt="Brand Logo"></img>
                    <span className="brand-name">City</span>
                </div>
                <ul className="page-cont">
                    <li className="page"><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/community">Community</NavLink></li>
                    <li>
                        <button className="expand-btn" onClick={() => setShowExplore(!showExplore)}>
                            <span>Explore City</span>
                            <span>{showExplore ? "⬆️" : "⬇️"}</span>
                        </button>
                        {showExplore && (
                        <ul className="submenu">
                            <li><NavLink to="/events">Events</NavLink></li>
                            <li><NavLink to="/market">Marketplace</NavLink></li>
                            <li><NavLink to="/travel">Travel and Transit</NavLink></li>
                            <li><NavLink to="/parks">Parks and Outdoors</NavLink></li>
                            <li><NavLink to="/toilets">Public Toilets</NavLink></li>
                        </ul>)}
                    </li>
                </ul>
                <ul className="control-cont">
                    <li><NavLink to="/alerts">Alerts</NavLink></li>
                    <li><NavLink to="/saved">Saved ({SaveLen})</NavLink></li>
                    <li><NavLink to="/profile">Profile</NavLink></li>
                    <li><NavLink to="/settings">Settings</NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;