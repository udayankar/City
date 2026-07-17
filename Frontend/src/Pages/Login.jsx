import { useDispatch } from "react-redux";
import { inUser , outUser } from "../Utils/UserSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [MailTxt , setEmailtxt] = useState("");
    const [PassTxt , setPassTxt] = useState("");

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
                <input className="login-email" placeholder="email" type="text" value={MailTxt} onChange={(e) => setEmailtxt(e.target.value)}></input>
                <input className="login-password" placeholder="Password" value={PassTxt} type="password" onChange={(e) => setPassTxt(e.target.value)}></input>
                <span className="login-forgot">Forgot your password?</span>
            </div>
            <div className="login-button">
                <button className="login-submit" onClick={() => { dispatch(inUser({email: MailTxt , password: PassTxt})); navigate("/")}}>Login</button>
            </div>
            <div className="login-end">
                <span className="login-not">Don't have an account?</span>
                <span className="login-signup" onClick={() => navigate("/signup")}>Sign Up</span>
            </div>
        </div>
    )
};

export default Login;