import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupUser from "../Utils/API";
import { inUser } from "../Utils/UserSlice";
import { useSelector , useDispatch } from "react-redux";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [UserTxt, setUserTxt] = useState("");
    const [MailTxt, setEmailTxt] = useState("");
    const [PassTxt, setPassTxt] = useState("");
    const [error , setError] = useState("");

    const clearInputs = () => {
        setUserTxt("");
        setEmailTxt("");
        setPassTxt("");
    }

    const handle_signup = async () => {
        if (!UserTxt.trim()) {
            setError("Username is required");
            return;
        }
        if (!MailTxt.trim()) {
            setError("Email is required");
            return;
        }
        if (!PassTxt.trim()) {
            setError("Password is required");
            return;
        }
        const result = await SignupUser(UserTxt, MailTxt, PassTxt);
        console.log("button clicked")
        if (result.success) {
            dispatch(inUser({name: UserTxt , email: MailTxt,}));
            navigate("/");
        } else {
            clearInputs();
            if (result.data.detail) {
                if (Array.isArray(result.data.detail)) {
                    setError(result.data.detail[0].msg);
                } else {
                    setError(result.data.detail);
                }
                return;
            }
        }
    }

    return (
        <div className="login-cont">
            <div className="login-top">
                <span>Sign Up</span>
            </div>
            <div className="login-option">
                <li className="login-option-menu">G</li>
                <li className="login-option-menu">f</li>
                <li className="login-option-menu">X</li>
            </div>
            <div className="login-mid">
                <span className="login-option-default">or create an account with email</span>
            </div>
            <div className="login-detail">
                <input className="login-email" type="text" placeholder="Username" value={UserTxt} onChange={(e) => setUserTxt(e.target.value)}/>
                <input className="login-email" type="text" placeholder="Email" value={MailTxt} onChange={(e) => {setEmailTxt(e.target.value); setError("")}}/>
                <input className="login-password" type="password" placeholder="Password" value={PassTxt} onChange={(e) => setPassTxt(e.target.value)}/>
            </div>
            {error && <p className="login-error">{error}</p>}
            <div className="login-button">
                <button className="login-submit" onClick={handle_signup}>Sign Up</button>
            </div>
            <div className="login-end">
                <span className="login-not">Already have an account?</span>
                <span className="login-signup" onClick={() => navigate("/login")}>Log In</span>
            </div>
        </div>
    );
};

export default Signup;