import { useState , useEffect } from "react";
import { Save_Events , Unsave_Events } from "../../Utils/API";
import { useSelector , useDispatch } from "react-redux";
import { addEvent , removeEvent } from "../../Utils/SavedSlice";

const EventCard = ({ID , Title , Description , Location , Start_Date , End_Date , Image , Organiser , isSaved , Saved_Counts}) => {

    const [Saved , setSaved] = useState(isSaved);
    const [SavedCount , setSavedCount] = useState(Saved_Counts);

    const dispatch = useDispatch();
    const user = useSelector((store) => store.User);
    const isLoggedin = user.isLoggedIn

    const formatDate = (date) => {
        return new Date(date).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "2-digit"
        });
    };

    const handle_save = async (id) => {
        if (!isLoggedin) {
            return;
        }
        if (Saved) {
            const result = await Unsave_Events(id);
            if (result.success) {
                setSaved(!Saved);
                setSavedCount(prev => prev - 1);
                dispatch(removeEvent(id));
            }
        } else {
            const result = await Save_Events(id);
            if (result.success) {
                setSaved(!Saved);
                setSavedCount(prev => prev + 1);
                dispatch(addEvent(id));
            }
        }
    };

    useEffect(() => {
        if (!isLoggedin) {
            setSaved(false);
        }
    }, [isLoggedin]);

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
                    <span className="events-card-saved-count">{SavedCount} {SavedCount === 1 ? "person" : "people"} saved this</span>
                    <button className="events-card-save" onClick={() => {handle_save(ID)}}>{Saved ? "✅" : "🔖"}</button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;