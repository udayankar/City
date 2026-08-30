import { NavLink } from "react-router-dom";
import { Logo_URL } from "../../Assets/URL";
import { useState  , useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";
import { Saved } from "../../Utils/API";
import { setItems } from "../../Utils/SavedSlice";

const Sidebar = () => {
    const [showExplore , setShowExplore] = useState(false);

    const dispatch = useDispatch()
    const user = useSelector((store) => store.User)
    const isLoggedin = user.isLoggedIn
    const saved = useSelector((store) => store.Saved)
    const total = saved.posts.length + saved.events.length;

    const handle_saved = async () => {
        const response = await Saved();
        if (response.success) {
            dispatch(setItems(response.data))
        }
    }

    useEffect(() => {
        if (!isLoggedin) {
            dispatch(setItems([]));
            return;
        }
        handle_saved()
    } , [isLoggedin])

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
                    <li><NavLink to="/saved">Saved ({total})</NavLink></li>
                    <li><NavLink to="/profile">Profile</NavLink></li>
                    <li><NavLink to="/settings">Settings</NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;