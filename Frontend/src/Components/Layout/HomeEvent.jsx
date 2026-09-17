import { useState , useEffect} from "react";
import { useDispatch , useSelector } from "react-redux";
import { addEvent , removeEvent } from "../../Utils/SavedSlice";
import { Save_Events , Unsave_Events } from "../../Utils/API";

const HomeEvent = ({ID , Title , Location , Start_Date , End_Date , Image , isSaved}) => {
    
    const [Saved , setSaved] = useState(isSaved);
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
                    dispatch(removeEvent(id));
                }
            } else {
                const result = await Save_Events(id);
                if (result.success) {
                    setSaved(true);
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
        <div className="event-body">
            <img 
                src={Image || "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&w=600&q=80"} 
                alt={Title || "Event"}
                className="event-body-img"
                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&w=600&q=80"; }}
            />
            <div className="event-info">
                <span className="event-body-name">{Title}</span>
                {(formattedStart || formattedEnd) && (
                    <span className="event-body-date">{formattedStart}{formattedEnd ? ` - ${formattedEnd}` : ""}</span>
                )}
                {Location && <span className="event-body-loc">📍{Location}</span>}
            </div>
            <button 
                className="event-like" 
                onClick={() => handle_save(ID)}
                disabled={isUpdatingSave}
                aria-label={Saved ? "Unsave event" : "Save event"}
            >
                {Saved ? "✅" : "🔖"}
            </button>
        </div>
    );
};

export default HomeEvent;