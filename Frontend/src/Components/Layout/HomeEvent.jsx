import { useState } from "react";

const HomeEvent = ({Title , Location , Start_Date , End_Date , Image , toSave , notSave}) => {
    const [isSaved , setIsSaved] = useState(false)

    const formatDate = (date) => {
        return new Date(date).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "2-digit"
        });
    };

    return (
        <div className="event-body">
            <img src={Image} className="event-body-img"></img>
            <div className="event-info">
                <span className="event-body-name">{Title}</span>
                <span className="event-body-date">{formatDate(Start_Date)} - {formatDate(End_Date)}</span>
                <span className="event-body-loc">📍{Location}</span>
            </div>
            <button className="event-like" onClick={() => {
                if (isSaved) {
                    notSave(); setIsSaved(!isSaved);
                } else {
                    toSave(); setIsSaved(!isSaved);
                }
            }}>{isSaved ? "✅" : "🔖"}</button>
        </div>
    )
}

export default HomeEvent;