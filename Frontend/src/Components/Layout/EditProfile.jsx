import { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import { Edit_Profile as EditProfileAPI , Edit_Password } from "../../Utils/API";
import { useDispatch } from "react-redux";
import { inUser } from "../../Utils/UserSlice";

const Edit_Profile = ({closeEditor}) => {

    const dispatch = useDispatch();
    const user = useSelector((store) => store.User);
    const Org_name = user.name
    const Org_email = user.email
    const Org_bio = user.bio

    const [editMessage, setEditMessage] = useState("");
    const [editError, setEditError] = useState(false);
    const [profilechanged , setProfilechanged] = useState(false);
    const [passchanged , setPasschanged] = useState(false);
    const [changePassword , setChangePassword] = useState(false);
    const [currpass , setCurrpass] = useState("");
    const [newpass , setNewpass] = useState("");
    const [confirmpass , setConfirmpass] = useState("");
    const [username , setUsername] = useState(Org_name);
    const [bio , setBio] = useState(Org_bio);

    const handle_edit = async () => {
        const payload = {};
        let profileChanged = false;
        let passwordChanged = false;

        if (username !== Org_name) {
            payload.Username = username;
            profileChanged = true;
        }
        if (bio !== Org_bio) {
            payload.Bio = bio;
            profileChanged = true;
        }
        if (profileChanged) {
            const response = await EditProfileAPI(payload);
            if (response.success) {
                dispatch(inUser({name: username , bio: bio}));
            } else {
                setEditError(true);
                setEditMessage("Couldn't update your profile.");
                return;
            }
        }
        if (currpass || newpass || confirmpass) {
            const passwordResult = await handle_pass();
            if (!passwordResult) {
                return;
            }
        }
        if (!profileChanged && !currpass && !newpass && !confirmpass) {
            setEditError(false);
            setEditMessage("No changes were made.");
            return;
        }   
        setEditError(false);
        setEditMessage("Changes saved successfully!");
    };

    const handle_pass = async () => {
        if (!currpass || !newpass || !confirmpass) {
            setEditMessage("All password fields are required.");
            setEditError(true);
            return false;
        }
        if (newpass !== confirmpass) {
            setEditMessage("New Password didnt match.");
            setEditError(true);
            return false;
        }
        const payload = {
            CurrPass : currpass,
            NewPass : newpass
        }
        const response = await Edit_Password(payload)
        if (response.success) {
            setEditMessage("Password changed successfully!")
            setEditError(false)
            setCurrpass("")
            setNewpass("")
            setConfirmpass("")
            return true;
        } else {
            setEditError(true)
            console.log(response.error)
            setEditMessage("Couldn't update your password.")
            return false;
        }
    };

    useEffect( () => {
        if (!editMessage) return;

        const timer = setTimeout(() => {
            setEditMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    } , [editMessage]);

    return (
        <>
            <div className="profile-overlay" onClick={closeEditor}></div>
            <aside className="profile-drawer">
                <div className="profile-drawer-head">
                    <div>
                        <h2>Edit Profile</h2>
                        <p>Update your account information</p>
                    </div>
                    <button className="profile-drawer-close" onClick={closeEditor}>×</button>
                </div>
                {editMessage && (
                <p className={editError ? "profile-error" : "profile-success"}>
                {editMessage}</p>
                )}
                <div className="profile-drawer-body">
                    <div className="profile-picture-edit">
                        <img className="profile-drawer-avatar" src="xyz" alt="Profile"/>
                        <button className="change-picture">Change Picture</button>
                    </div>
                    <div className="profile-form-section">
                        <h3>Basic Information</h3>
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <label>Bio</label>
                        <textarea className="profile-bio" placeholder="Tell people something about yourself..." value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                    </div>
                    <div className="profile-password">
                        <button className="password-toggle" onClick={() =>setChangePassword(!changePassword)}>
                            <span>Change Password</span>
                            <span>{changePassword ? "⌃" : "⌄"}</span>
                        </button>
                        {changePassword && (
                            <div className="password-section">
                                <input type="password" placeholder="Current Password" value={currpass} onChange={(e) => setCurrpass(e.target.value)}/>
                                <input type="password" placeholder="New Password" value={newpass} onChange={(e) => setNewpass(e.target.value)}/>
                                <input type="password" placeholder="Confirm Password" value={confirmpass} onChange={(e) => setConfirmpass(e.target.value)}/>
                            </div>
                        )}
                    </div>
                </div>
                <div className="profile-drawer-footer">
                    <button className="profile-cancel" onClick={closeEditor}>Cancel</button>
                    <button className="profile-save" onClick={handle_edit}>Save Changes</button>
                </div>
            </aside>
         </>
    )
};

export default Edit_Profile;