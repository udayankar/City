import { useDispatch } from "react-redux";
import { inUser } from "../Utils/UserSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser, checkLogin } from "../Utils/API";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [MailTxt , setMailTxt] = useState("");
    const [PassTxt , setPassTxt] = useState("");
    const [error , setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clearInputs = () => {
        setMailTxt("");
        setPassTxt("");
    };

    const handle_login = async (e) => {
        if (e) e.preventDefault();
        if (isSubmitting) return;

        const trimmedEmail = MailTxt.trim();
        const trimmedPass = PassTxt.trim();

        if (!trimmedEmail) {
            setError("Email is required");
            return;
        }
        if (!trimmedPass) {
            setError("Password is required");
            return;
        }

        setIsSubmitting(true);
        setError("");

        try {
            const result = await LoginUser(trimmedEmail , trimmedPass);
            if (result.success) {
                const checkRes = await checkLogin();
                if (checkRes.success && checkRes.data) {
                    const currentUser = checkRes.data;
                    dispatch(inUser({
                        name: currentUser.Username,
                        email: currentUser.Email,
                        bio: currentUser.Bio,
                        dp: currentUser.DP
                    }));
                }
                navigate("/");
            } else {
                setPassTxt("");
                if (result?.data?.detail) {
                    if (Array.isArray(result.data.detail)) {
                        setError(result.data.detail[0]?.msg || "Login failed");
                    } else {
                        setError(result.data.detail);
                    }
                } else {
                    setError("Invalid credentials or server unavailable.");
                }
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-cont">
            <div className="login-top">
                <span>Log In</span>
            </div>
            <div className="login-option">
                <li className="login-option-menu" aria-label="Sign in with Google">G</li>
                <li className="login-option-menu" aria-label="Sign in with Facebook">f</li>
                <li className="login-option-menu" aria-label="Sign in with X">X</li>
            </div>
            <div className="login-mid">
                <span className="login-option-default">or use your email</span>
            </div>
            <form onSubmit={handle_login} className="login-form-wrapper">
                <div className="login-detail">
                    <input 
                        className="login-email" 
                        placeholder="Email address" 
                        type="email" 
                        value={MailTxt} 
                        onChange={(e) => { setMailTxt(e.target.value); setError(""); }}
                        required
                        autoComplete="email"
                    />
                    <input 
                        className="login-password" 
                        placeholder="Password" 
                        value={PassTxt} 
                        type="password" 
                        onChange={(e) => { setPassTxt(e.target.value); setError(""); }}
                        required
                        autoComplete="current-password"
                    />
                    <span className="login-forgot">Forgot your password?</span>
                </div>
                {error && <p className="login-error" role="alert">{error}</p>}
                <div className="login-button">
                    <button className="login-submit" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </div>
            </form>
            <div className="login-end">
                <span className="login-not">Don't have an account?</span>
                <span className="login-signup" role="button" tabIndex={0} onClick={() => navigate("/signup")}>Sign Up</span>
            </div>
        </div>
    );
};

export default Login;