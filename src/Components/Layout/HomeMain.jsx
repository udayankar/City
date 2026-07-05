const HomeMain = () => {
    return (
        <div className="main-cont">
            <div className="home-hero">
                <div className="hero-top">
                    <span className="hero-greet">Good Morning, Udayan!</span>
                    <span className="hero-update">Here's what's happening in Rohtak today.</span>
                </div>
                <div className="hero-mid">
                    <div className="hero-climate">
                        <span className="hero-temp">🌦️ 28*C</span>
                        <span className="hero-disc">Light Rain</span>
                    </div>
                    <div className="hero-info">
                        <span className="hero-city">📍 Rohtak</span>
                        <span className="hero-date">📅 Friday, 5 July 2025</span>
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
                    <div className="home-alert-cont">
                        <span className="home-alert-icon">👷‍♂️</span>
                        <div className="home-alert-detail">
                            <span className="home-alert-name">Road work on MG Road</span>
                            <span className="home-alert-info">Expect delays near Bus Stand</span>
                            <span className="home-alert-time">1h ago</span>
                        </div>
                    </div>
                    <div className="home-alert-cont">
                        <span className="home-alert-icon">👷‍♂️</span>
                        <div className="home-alert-detail">
                            <span className="home-alert-name">Road work on MG Road</span>
                            <span className="home-alert-info">Expect delays near Bus Stand</span>
                            <span className="home-alert-time">1h ago</span>
                        </div>
                    </div>
                    <div className="home-alert-cont">
                        <span className="home-alert-icon">👷‍♂️</span>
                        <div className="home-alert-detail">
                            <span className="home-alert-name">Road work on MG Road</span>
                            <span className="home-alert-info">Expect delays near Bus Stand</span>
                            <span className="home-alert-time">1h ago</span>
                        </div>
                    </div>
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
                    <div className="home-post">
                        <div className="home-post-top">
                            <div className="home-post-user">
                                <img src="/abc" className="home-post-dp"/>
                                <div className="home-post-profile">
                                    <span className="home-post-name">Rahul Kar</span>
                                    <span className="home-post-username">@kar_rahul • 2h ago</span>
                                    <span className="home-post-location">📍 Bus Stand,Rohtak</span>
                                </div>
                            </div>
                            <button className="home-post-menu">⋮</button>
                        </div>
                        <div className="home-post-body">
                            <span className="home-post-title">Heavy traffic near Bus Stand</span>
                            <p className="home-post-text">Avoid MG Road if you're travelling this evening.Traffic police have diverted vehicles because ofconstruction work.</p>
                        </div>
                        <div className="home-post-bottom">
                            <button className="post-action">👍 48</button>
                            <button className="post-action">💬 12</button>
                            <button className="post-action">🔄 Share</button>
                            <button className="post-action">🔖 Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeMain;