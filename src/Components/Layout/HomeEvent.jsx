import { useState } from "react";

const HomeEvent = ({img , name , date , loc , toSave , notSave}) => {
    const [isSaved , setIsSaved] = useState(false)

    return (
        <div className="event-body">
            <img src={img} className="event-body-img"></img>
            <div className="event-info">
                <span className="event-body-name">{name}</span>
                <span className="event-body-date">{date}</span>
                <span className="event-body-loc">📍{loc}</span>
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