import Weather from "../../Utils/WeatherCall";
import { useContext } from "react";
import { CityContext } from "../../Utils/Context";
import { alerts } from "../../Data/alerts";
import { posts } from "../../Data/posts";
import HomeAlert from "./HomeAlert";
import HomePost from "./HomePost";
import { useSelector } from "react-redux";

const HomeMain = () => {
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
                        <HomePost key={post.id} {...post} toSave={() => dispatch(addItem(event))} notSave={() => dispatch(removeItem(event))}/>
                    ))}
                </div>
                <button className="home-foot-link">View Full Community ➡️</button>
            </div>
        </div>
    )
}

export default HomeMain;