const EventCard = ({Title , Description , Location , Start_Date , End_Date , Image , Organiser}) => {

    const formatDate = (date) => {
        return new Date(date).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "2-digit"
        });
    };

    return (
        <div className="events-card">
            <div className="events-card-image">
                <img src={Image || "/default-event.jpg"} alt={Title}/>
            </div>
            <div className="events-card-content">
                <h2 className="events-card-title">{Title}</h2>
                <p className="events-card-description">{Description}</p>
                <div className="events-card-details">
                    <span>{formatDate(Start_Date)} - {formatDate(End_Date)}</span>
                    <span>📍 {Location}</span>
                </div>
                <div className="events-card-bottom">
                    <span className="events-card-organiser">{Organiser}</span>
                    <button className="events-card-save">🔖</button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;