import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { CityContext } from "../../Utils/Context";
import NotifiedBell from "./Bell";

const Navbar = () => {
    const [searchText , setSearchText] = useState("");
    const [isLoggedIn , setIsLoggedIn] = useState(true);
    const [showMenu , setShowMenu] = useState(false);
    const [showCity , setShowCity] = useState(false);
    const {currentCity , setCurrentCity} = useContext(CityContext);
    
    return (
        <div className="nav-cont">
            <div className="search-cont">
                <button className="search-icon">🔍</button>
                <input
                    type="text"
                    placeholder="Search places, food, buses, events..."
                    className="search-area"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button className="search-butt">Search</button>
            </div>
            <div className="city">
                <div className="city-cont" onClick={() => {setShowCity(!showCity)}}>
                <button className="city-icon">📍</button>
                <span className="city-select">{currentCity}</span>
                <span className="city-arrow">▼</span>
                </div>
                { showCity && (
                <ul className="city-menu">
                        <li className="menu-item" onClick={() => {setCurrentCity("Rohtak"); setShowCity(false)}}>Rohtak</li>
                        <li className="menu-item" onClick={() => {setCurrentCity("Panipat"); setShowCity(false)}}>Panipat</li>
                        <li className="menu-item" onClick={() => {setCurrentCity("Gohana"); setShowCity(false)}}>Gohana</li>
                </ul>)}
            </div>
            <NavLink to="/notifications" className="bell-link"><NotifiedBell/></NavLink>
            <div className="user-cont">
                <button className="user-icon">U</button>
                {isLoggedIn ? (
                <>
                    <button className="user-profile" onClick={() => {setShowMenu(!showMenu)}}>
                        <span className="user-name">Udayan</span>
                        <span className="user-arrow">▼</span>
                    </button>
                    { showMenu && (
                    <ul className="user-menu">
                        <li className="menu-item" onClick={() => {setShowMenu(false)}}>Profile</li>
                        <li className="menu-item" onClick={() => {setShowMenu(false)}}>Settings</li>
                        <li className="menu-item" onClick={() => {setShowMenu(false)}}>Sign Out</li>
                    </ul> )}
                </>
                    ) : (
                    <button className="user-state">
                        Log In
                    </button>
                    )}
            </div>
        </div>
    );
};

export default Navbar;