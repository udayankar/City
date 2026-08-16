import Weather from "../../Utils/WeatherCall";
import { useContext , useEffect , useState } from "react";
import { CityContext } from "../../Utils/Context";
import { alerts } from "../../Data/alerts";
import HomeAlert from "./HomeAlert";
import HomePost from "./HomePost";
import { useSelector } from "react-redux";
import { All_Posts } from "../../Utils/API";
import { NavLink } from "react-router-dom";

const HomeMain = () => {
    const [posts , setPosts] = useState([])

    const { currentCity } = useContext(CityContext);
    const user = useSelector((store) => store.User);
    const name = user.name;
    const today = new Date();
    const hour = today.getHours();
    const formattedDate = today.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    let greeting = "";
    if (hour >= 5 && hour < 12) {
        greeting = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
        greeting = "Good Evening";
    } else {
        greeting = "Good Night";
    }

    const handle_posts = async () => {
        const result = await All_Posts("");
        console.log(result)
        if (result.success) {
            setPosts(result.data)
        }
    }

    useEffect(() => {
        handle_posts()
    } , [])

    return (
        <div className="main-cont">
            <div className="home-hero">
                <div className="hero-top">
                    <span className="hero-greet">{greeting}, {name}!</span>
                    <span className="hero-update">Here's what's happening in {currentCity} today.</span>
                </div>
                <div className="hero-mid">
                    <Weather/>
                    <div className="hero-info">
                        <span className="hero-city">📍 {currentCity}</span>
                        <span className="hero-date">📅 {formattedDate}</span>
                    </div>
                </div>
                <div className="hero-foot">
                    <button className="hero-explore">🏢 Explore City</button>
                    <button className="hero-journey">🚌 Plan Journey</button>
                    <button className="hero-report">📢 Report Issue</button>
                </div>
            </div>
            <div className="home-mid">
                <div className="home-alert">
                    <span className="home-alert-text">Live City Alerts</span>
                    <span className="home-alert-extend">View all</span>
                </div>
                <div className="home-alert-show">
                    {alerts.slice(0,3).map(alert => (
                        <HomeAlert key={alert.id} {...alert}/>
                    ))}
                </div>
            </div>
            <div className="home-foot">
                <div className="home-foot-head">
                    <span className="home-foot-tag active">For You</span>
                    <span className="home-foot-tag">Trending</span>
                    <span className="home-foot-tag">Local</span>
                    <span className="home-foot-tag">Following</span>
                </div>
                <div className="home-foot-list">
                    {posts.map(post => (
                        <HomePost key={post.ID} {...post}/>
                    ))}
                </div>
                <NavLink to="/community" className="home-foot-link">View Full Community ➡️</NavLink>
            </div>
        </div>
    )
}

export default HomeMain;