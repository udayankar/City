import { useState , useEffect } from "react";
import { Save_Events , Unsave_Events } from "../../Utils/API";
import { useSelector , useDispatch } from "react-redux";
import { addEvent , removeEvent } from "../../Utils/SavedSlice";

const EventCard = ({ID , Title , Description , Location , Start_Date , End_Date , Image , Organiser , isSaved , Saved_Counts}) => {

    const [Saved , setSaved] = useState(isSaved);
    const [SavedCount , setSavedCount] = useState(Saved_Counts ?? 0);
    const [isUpdatingSave, setIsUpdatingSave] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((store) => store.User);
    const isLoggedin = user.isLoggedIn;

    const formatDate = (date) => {
        if (!date) return "";
        const parsed = new Date(date);
        if (isNaN(parsed.getTime())) return String(date);
        return parsed.toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "2-digit"
        });
    };

    const handle_save = async (id) => {
        if (!isLoggedin || isUpdatingSave) {
            return;
        }
        setIsUpdatingSave(true);
        try {
            if (Saved) {
                const result = await Unsave_Events(id);
                if (result.success) {
                    setSaved(false);
                    setSavedCount(prev => Math.max(0, prev - 1));
                    dispatch(removeEvent(id));
                }
            } else {
                const result = await Save_Events(id);
                if (result.success) {
                    setSaved(true);
                    setSavedCount(prev => prev + 1);
                    dispatch(addEvent(id));
                }
            }
        } finally {
            setIsUpdatingSave(false);
        }
    };

    useEffect(() => {
        if (!isLoggedin) {
            setSaved(false);
        }
    }, [isLoggedin]);

    const formattedStart = formatDate(Start_Date);
    const formattedEnd = formatDate(End_Date);

    return (
        <article className="events-card">
            <div className="events-card-image">
                <img 
                    src={Image || "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&w=600&q=80"} 
                    alt={Title || "Event"}
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&w=600&q=80"; }}
                />
            </div>
            <div className="events-card-content">
                <h2 className="events-card-title">{Title}</h2>
                <p className="events-card-description">{Description}</p>
                <div className="events-card-details">
                    {(formattedStart || formattedEnd) && (
                        <span>{formattedStart}{formattedEnd ? ` - ${formattedEnd}` : ""}</span>
                    )}
                    {Location && <span>📍 {Location}</span>}
                </div>
                <div className="events-card-bottom">
                    <span className="events-card-organiser">{Organiser || "Community"}</span>
                    <span className="events-card-saved-count">{SavedCount} {SavedCount === 1 ? "person" : "people"} saved this</span>
                    <button 
                        className="events-card-save" 
                        onClick={() => handle_save(ID)} 
                        disabled={isUpdatingSave}
                        aria-label={Saved ? "Unsave event" : "Save event"}
                    >
                        {Saved ? "✅" : "🔖"}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default EventCard;