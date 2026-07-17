import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [UserTxt, setUserTxt] = useState("");
    const [MailTxt, setEmailTxt] = useState("");
    const [PassTxt, setPassTxt] = useState("");

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
                <input className="login-email" type="text" placeholder="Email" value={MailTxt} onChange={(e) => setEmailTxt(e.target.value)}/>
                <input className="login-password" type="password" placeholder="Password" value={PassTxt} onChange={(e) => setPassTxt(e.target.value)}/>
            </div>
            <div className="login-button">
                <button className="login-submit" onClick={() => {navigate("/");}}>Sign Up</button>
            </div>
            <div className="login-end">
                <span className="login-not">Already have an account?</span>
                <span className="login-signup" onClick={() => navigate("/login")}>Log In</span>
            </div>
        </div>
    );
};

export default Signup;