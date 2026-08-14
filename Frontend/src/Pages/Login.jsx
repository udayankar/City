import { useDispatch } from "react-redux";
import { inUser , outUser } from "../Utils/UserSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../Utils/API";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [MailTxt , setMailTxt] = useState("");
    const [PassTxt , setPassTxt] = useState("");
    const [error , setError] = useState("");

    const clearInputs = () => {
        setMailTxt("");
        setPassTxt("");
    }

    const handle_login = async () => {
        if (!MailTxt.trim()) {
            setError("Email is required");
            return;
        }
        if (!PassTxt.trim()) {
            setError("Password is required");
            return;
        }
        const result = await LoginUser(MailTxt , PassTxt)
        console.log("button")
        if (result.success) {
            const response = await fetch("http://localhost:8000/users/me", {
                credentials: "include"
            });
            const currentUser = await response.json();
            dispatch(inUser({name: currentUser.Username , email: currentUser.Email , bio: currentUser.Bio , dp: currentUser.DP}));
            navigate("/");
        } else {
            clearInputs();
            if (result.data.detail) {
                if (Array.isArray(result.data.detail)) {
                    setError(result.data.detail[0].msg);
                } else {
                    setError(result.data.detail);
                }
                return
            }
        }
    }

    return (
        <div className="login-cont">
            <div className="login-top">
                <span>Log In</span>
            </div>
            <div className="login-option">
                <li className="login-option-menu">G</li>
                <li className="login-option-menu">f</li>
                <li className="login-option-menu">X</li>
            </div>
            <div className="login-mid">
                <span className="login-option-default">or use your email</span>
            </div>
            <div className="login-detail">
                <input className="login-email" placeholder="email" type="text" value={MailTxt} onChange={(e) => setMailTxt(e.target.value)}></input>
                <input className="login-password" placeholder="Password" value={PassTxt} type="password" onChange={(e) => setPassTxt(e.target.value)}></input>
                <span className="login-forgot">Forgot your password?</span>
            </div>
            {error && <p className="login-error">{error}</p>}
            <div className="login-button">
                <button className="login-submit" onClick={handle_login}>Login</button>
            </div>
            <div className="login-end">
                <span className="login-not">Don't have an account?</span>
                <span className="login-signup" onClick={() => navigate("/signup")}>Sign Up</span>
            </div>
        </div>
    )
};

export default Login;