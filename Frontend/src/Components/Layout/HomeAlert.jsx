const HomeAlert = ({icon , title , info , time}) => {
    return (
        <div className="home-alert-cont">
            <span className="home-alert-icon">{icon}</span>
            <div className="home-alert-detail">
                <span className="home-alert-name">{title}</span>
                <span className="home-alert-info">{info}</span>
                <span className="home-alert-time">{time}</span>
            </div>
        </div>
    )
};

export default HomeAlert;