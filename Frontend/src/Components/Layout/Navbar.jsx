import { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CityContext } from "../../Utils/Context";
import NotifiedBell from "./Bell";
import { useSelector , useDispatch } from "react-redux";
import { outUser } from "../../Utils/UserSlice";
import { LogoutUser } from "../../Utils/API";

const Navbar = () => {
    const [searchText , setSearchText] = useState("");
    const [showMenu , setShowMenu] = useState(false);
    const [showCity , setShowCity] = useState(false);
    const cityRef = useRef(null);
    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    const {currentCity , setCurrentCity} = useContext(CityContext) || { currentCity: "Rohtak", setCurrentCity: () => {} };
    const user = useSelector((store) => store.User);
    const isLoggedIn = user.isLoggedIn;
    const name = user.name || "User";
    const dispatch = useDispatch();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cityRef.current && !cityRef.current.contains(event.target)) {
                setShowCity(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handle_logout = async () => {
        try {
            await LogoutUser();
        } finally {
            dispatch(outUser());
            setShowMenu(false);
            navigate("/");
        }
    };
    
    return (
        <header className="nav-cont">
            <div className="search-cont">
                <button className="search-icon" aria-label="Search icon">🔍</button>
                <input
                    type="text"
                    placeholder="Search places, food, buses, events..."
                    className="search-area"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    aria-label="Search places, food, buses, events"
                />
                <button className="search-butt">Search</button>
            </div>
            <div className="city" ref={cityRef}>
                <button 
                    className="city-cont" 
                    onClick={() => {setShowCity(!showCity)}}
                    aria-label={`Select city. Currently selected: ${currentCity}`}
                    aria-expanded={showCity}
                >
                    <span className="city-icon">📍</span>
                    <span className="city-select">{currentCity}</span>
                    <span className="city-arrow">▼</span>
                </button>
                { showCity && (
                <ul className="city-menu" role="menu">
                    <li className="menu-item" role="menuitem" onClick={() => {setCurrentCity("Rohtak"); setShowCity(false)}}>Rohtak</li>
                    <li className="menu-item" role="menuitem" onClick={() => {setCurrentCity("Panipat"); setShowCity(false)}}>Panipat</li>
                    <li className="menu-item" role="menuitem" onClick={() => {setCurrentCity("Gohana"); setShowCity(false)}}>Gohana</li>
                </ul>)}
            </div>
            <NavLink to="/notifications" className="bell-link" aria-label="Notifications"><NotifiedBell/></NavLink>
            <div className="user-cont" ref={userMenuRef}>
                {isLoggedIn && (
                    <span className="user-icon" aria-hidden="true">{(name && name[0] ? name[0] : "U").toUpperCase()}</span>
                )}
                {isLoggedIn ? (
                <>
                    <button 
                        className="user-profile" 
                        onClick={() => {setShowMenu(!showMenu)}}
                        aria-label="User account menu"
                        aria-expanded={showMenu}
                    >
                        <span className="user-name">{name}</span>
                        <span className="user-arrow">▼</span>
                    </button>
                    { showMenu && (
                    <ul className="user-menu" role="menu">
                        <NavLink className="profile-link" to="/profile"><li className="menu-item" role="menuitem" onClick={() => {setShowMenu(false)}}>Profile</li></NavLink>
                        <NavLink className="profile-link" to="/settings"><li className="menu-item" role="menuitem" onClick={() => {setShowMenu(false)}}>Settings</li></NavLink>
                        <li className="menu-item" role="menuitem" onClick={handle_logout}>Sign Out</li>
                    </ul> )}
                </>
                    ) : (
                    <NavLink className="login-link" to="/login">Log In</NavLink>
                    )}
            </div>
        </header>
    );
};

export default Navbar;