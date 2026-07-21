import { useContext, useState , useEffect } from "react";
import { createRoot } from "react-dom/client";
import { CityContext } from "./Utils/Context";
import AppStore from "./Utils/AppStore";
import { Provider , useSelector , useDispatch } from "react-redux"; 
import { inUser , outUser } from "./Utils/UserSlice";
import "./style.css";
import Navbar from "./Components/Layout/Navbar";
import Sidebar from "./Components/Layout/Sidebar";
import Rightbar from "./Components/Layout/HomeRight";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { createBrowserRouter , RouterProvider , Outlet } from "react-router-dom";

const App = () => {
    const [currentCity, setCurrentCity] = useState("Select your city");
    const dispatch = useDispatch();

    useEffect(() => {
        async function checkLogin() {
            const response = await fetch("http://localhost:8000/users/me", {
                credentials: "include"
            });
            if (response.ok) {
                const user = await response.json();
                dispatch(inUser({
                    name: user.Username,
                    email: user.Email
                }));
            } else {
                dispatch(outUser());
            }
        }
        checkLogin();
    }, []);

    return (
        <CityContext.Provider value={{currentCity , setCurrentCity}}>
            <div className="app-layout">
                <Sidebar />
                <div className="main-layout">
                    <Navbar />
                    <Outlet/>
                </div>
            </div>
        </CityContext.Provider>
    );
};

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            }
        ]
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
     path: "/signup",
     element: <Signup/>   
    }
]);

const root = createRoot(document.getElementById("root"));

root.render(<Provider store={AppStore}><RouterProvider router={AppRouter} /></Provider>);