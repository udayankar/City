import HomeMain from "../Components/Layout/HomeMain";
import HomeRight from "../Components/Layout/HomeRight";
import Navbar from "../Components/Layout/Navbar";

const Home = () => {
    return (
        <div className="home-cont">
            <HomeMain/>
            <HomeRight/>
        </div>
    )
};

export default Home;