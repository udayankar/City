import { useContext, useState } from "react";
import { createRoot } from "react-dom/client";
import { CityContext } from "./Utils/Context";
import AppStore from "./Utils/AppStore";
import { Provider } from "react-redux"; 
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