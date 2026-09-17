const Loader = ({ message = "Loading...", size = "medium" }) => {
    return (
        <div className={`loader-container loader-${size}`} role="status" aria-live="polite">
            <div className="loader-spinner" aria-hidden="true"></div>
            {message && <span className="loader-text">{message}</span>}
        </div>
    );
};

export default Loader;
