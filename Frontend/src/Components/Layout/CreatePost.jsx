import { useState } from "react";
import { useSelector } from "react-redux";
import { Add_Post } from "../../Utils/API";

const CreatePost = ({ onClose , onPostCreated }) => {

    const user = useSelector((store) => store.User);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [location, setLocation] = useState("");
    const [createMessage, setCreateMessage] = useState("");
    const [createError, setCreateError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const maxCharacters = 500;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting || !title.trim() || !content.trim()) {
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await Add_Post(title.trim() , content.trim() , location.trim());
            if (response && response.success) {
                setCreateError(false);
                setCreateMessage("Post published successfully!");
                setTitle("");
                setContent("");
                setLocation("");
                if (typeof onPostCreated === "function") {
                    await onPostCreated();
                }
                setTimeout(() => {
                    if (typeof onClose === "function") onClose();
                }, 1000);
            } else {
                setCreateError(true);
                setCreateMessage(response?.error || "Failed to publish post. Please try again.");
            }
        } catch (err) {
            setCreateError(true);
            setCreateMessage("An error occurred while publishing.");
        } finally {
            setIsSubmitting(false);
            setTimeout(() => {
                setCreateMessage("");
            }, 3000);
        }
    };

    return (
        <div className="create-post-overlay" onClick={onClose}>
            <div className="create-post-card" onClick={(e) => e.stopPropagation()}>
                <div className="create-post-header">
                    <div>
                        <h2>Create Post</h2>
                        <p>Share something with your city.</p>
                    </div>
                    <button className="create-post-close" onClick={onClose} aria-label="Close dialog">❌</button>
                </div>
                {createMessage && (<p className={createError ? "create-error" : "create-success"}>{createMessage}</p>)}
                <form className="create-post-form" onSubmit={handleSubmit}>
                    <div className="create-post-user">
                        <img 
                            src={user.dp || user.DP || "https://tse3.mm.bing.net/th/id/OIP.QUM-ZOG4QTjh8yGPt9ZrkgHaHa?pid=Api&P=0&h=180"} 
                            className="create-post-user-dp" 
                            alt={user.name ? `${user.name}'s profile` : "User profile"}
                            onError={(e) => { e.currentTarget.src = "https://tse3.mm.bing.net/th/id/OIP.QUM-ZOG4QTjh8yGPt9ZrkgHaHa?pid=Api&P=0&h=180"; }}
                        />
                        <div className="create-post-user-info">
                            <span className="create-post-user-name">{user.name}</span>
                            <span className="create-post-user-location">Posting to your city community</span>
                        </div>
                    </div>
                    <div className="create-post-field">
                        <label>Title</label>
                        <input type="text" placeholder="Give your post a clear title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100}/>
                    </div>
                    <div className="create-post-field">
                        <div className="create-post-label-row">
                            <label>What's happening?</label>
                            <span>{content.length}/{maxCharacters}</span>
                        </div>
                        <textarea placeholder="Share an update, ask a question, recommend a place..." value={content} onChange={(e) => {if (e.target.value.length <= maxCharacters) {setContent(e.target.value);}}}/>
                    </div>
                    <div className="create-post-options">
                        <div className="create-post-field">
                            <label>Location</label>
                            <div className="create-post-location">
                                <span>📍</span>
                                <input type="text" placeholder="Where is this about?" value={location} onChange={(e) => setLocation(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div className="create-post-actions">
                        <button type="button" className="create-post-cancel" onClick={onClose} disabled={isSubmitting}>Cancel</button>
                        <button type="submit" className="create-post-submit" disabled={isSubmitting || !title.trim() || !content.trim()}>
                            {isSubmitting ? "Publishing..." : "Publish Post"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;