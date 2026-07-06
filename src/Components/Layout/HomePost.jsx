const HomePost = ({dp , name , username , time , loc , title , text , like , com , share}) => {
    return (
        <div className="home-post">
            <div className="home-post-top">
                <div className="home-post-user">
                    <img src={dp} className="home-post-dp"/>
                    <div className="home-post-profile">
                        <span className="home-post-name">{name}</span>
                        <span className="home-post-username">{username} • {time}</span>
                        <span className="home-post-location">📍 {loc}</span>
                    </div>
                </div>
                <button className="home-post-menu">⋮</button>
            </div>
            <div className="home-post-body">
                <span className="home-post-title">{title}</span>
                <p className="home-post-text">{text}</p>
            </div>
            <div className="home-post-bottom">
                <button className="post-action">👍 {like}</button>
                <button className="post-action">💬 {com}</button>
                <button className="post-action">🔄 {share}</button>
                <button className="post-action">🔖 Save</button>
            </div>
        </div>
    )
};

export default HomePost;