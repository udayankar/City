import { useState , useEffect} from "react";
import { useDispatch , useSelector } from "react-redux";
import { addEvent , removeEvent } from "../../Utils/SavedSlice";
import { Save_Events , Unsave_Events } from "../../Utils/API";

const HomeEvent = ({ID , Title , Location , Start_Date , End_Date , Image , isSaved}) => {
    
    const [Saved , setSaved] = useState(isSaved);

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
                dispatch(removeEvent(id));
            }
        } else {
            const result = await Save_Events(id);
                if (result.success) {
                setSaved(!Saved);
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
        <div className="event-body">
            <img src={Image} className="event-body-img"></img>
            <div className="event-info">
                <span className="event-body-name">{Title}</span>
                <span className="event-body-date">{formatDate(Start_Date)} - {formatDate(End_Date)}</span>
                <span className="event-body-loc">📍{Location}</span>
            </div>
            <button className="event-like" onClick={() => {handle_save(ID)}}>{Saved ? "✅" : "🔖"}</button>
        </div>
    )
}

export default HomeEvent;