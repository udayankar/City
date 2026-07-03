import { useState } from "react";

const Navbar = () => {
    const [SearchText , setSearchText] = useState("");
    const [isLoggedin , setIsLoggedin] = useState(true);

    return (
        <div className="nav-cont">
            <div className="search-cont">
                <button className="search-icon">🔍</button>
                <input type="text" placeholder="Search places, food, buses, events..." className="search-area" value={SearchText} onChange={(e) => setSearchText(e.target.value)}/>
                <button className="search-butt">Search</button>
            </div>
            <div className="city-cont">
                <button className="city-icon">📍</button>
                <select className="city-select">
                    <option>Select City</option>
                    <option>Rohtak</option>
                    <option>Panipat</option>
                    <option>Gohana</option>
                </select>
            </div>
            <div className="bell-cont">
                <button className="bell-icon">🔔</button>
            </div>
            <div className="user-cont">
                <button className="user-icon">U</button>
                <button className="user-state">{isLoggedin ? 
                    <select className="user-select">
                        <option>Udayan</option>
                        <option>Login another account</option>
                        <option>Sign Out</option>
                    </select> : "Log In"}
                </button>
            </div>
        </div>
    )
}

export default Navbar;