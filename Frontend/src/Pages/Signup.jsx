import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupUser } from "../Utils/API";

const Signup = () => {
    const navigate = useNavigate();

    const [UserTxt, setUserTxt] = useState("");
    const [MailTxt, setEmailTxt] = useState("");
    const [PassTxt, setPassTxt] = useState("");
    const [error , setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handle_signup = async (e) => {
        if (e) e.preventDefault();
        if (isSubmitting) return;
        const trimmedUser = UserTxt.trim();
        const trimmedEmail = MailTxt.trim();
        const trimmedPass = PassTxt.trim();
        if (!trimmedUser) {
            setError("Username is required");
            return;
        }
        if (!trimmedEmail) {
            setError("Email is required");
            return;
        }
        if (!trimmedPass) {
            setError("Password is required");
            return;
        }
        if (trimmedPass.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }
        setIsSubmitting(true);
        setError("");
        try {
            const result = await SignupUser(trimmedUser, trimmedEmail, trimmedPass);
            if (result.success) {
                // Backend only sets a session cookie on /users/login, not on /users/signup.
                // Redirect to login so the user completes a real login and receives a valid cookie.
                navigate("/login");
            } else {
                setPassTxt("");
                if (result?.data?.detail) {
                    if (Array.isArray(result.data.detail)) {
                        setError(result.data.detail[0]?.msg || "Signup failed");
                    } else {
                        setError(result.data.detail);
                    }
                } else {
                    setError("Unable to create account. Please try again.");
                }
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-cont">
            <div className="login-top">
                <span>Sign Up</span>
            </div>
            <div className="login-option">
                <li className="login-option-menu" aria-label="Sign up with Google">G</li>
                <li className="login-option-menu" aria-label="Sign up with Facebook">f</li>
                <li className="login-option-menu" aria-label="Sign up with X">X</li>
            </div>
            <div className="login-mid">
                <span className="login-option-default">or create an account with email</span>
            </div>
            <form onSubmit={handle_signup} className="login-form-wrapper">
                <div className="login-detail">
                    <input 
                        className="login-email" 
                        type="text" 
                        placeholder="Username" 
                        value={UserTxt} 
                        onChange={(e) => { setUserTxt(e.target.value); setError(""); }}
                        required
                        autoComplete="username"
                    />
                    <input 
                        className="login-email" 
                        type="email" 
                        placeholder="Email address" 
                        value={MailTxt} 
                        onChange={(e) => { setEmailTxt(e.target.value); setError(""); }}
                        required
                        autoComplete="email"
                    />
                    <input 
                        className="login-password" 
                        type="password" 
                        placeholder="Password (min 8 characters)" 
                        value={PassTxt} 
                        onChange={(e) => { setPassTxt(e.target.value); setError(""); }}
                        required
                        autoComplete="new-password"
                    />
                </div>
                {error && <p className="login-error" role="alert">{error}</p>}
                <div className="login-button">
                    <button className="login-submit" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Creating account..." : "Sign Up"}
                    </button>
                </div>
            </form>
            <div className="login-end">
                <span className="login-not">Already have an account?</span>
                <span className="login-signup" role="button" tabIndex={0} onClick={() => navigate("/login")}>Log In</span>
            </div>
        </div>
    );
};

export default Signup;