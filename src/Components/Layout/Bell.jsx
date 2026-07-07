const Bell = () => {
    return (
            <button className="bell-icon">🔔</button>
    )
};

const withNotification = (Bell) => {
    return ({notificationNum=2}) => {
        return (
            <div className="bell-cont">
                {notificationNum > 0 && (<span className="bell-num">{notificationNum}</span>)}
                <Bell/>
            </div>   
        )
    }
};

const NotifiedBell = withNotification(Bell)

export default NotifiedBell;