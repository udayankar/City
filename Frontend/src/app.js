import { createBrowserRouter , RouterProvider , Outlet } from "react-router-dom";
import { useContext, useState , useEffect , lazy , suspense, Suspense } from "react";
import { Provider } from "react-redux"; 
import { createRoot } from "react-dom/client";
import { useDispatch } from "react-redux";
import { inUser , outUser } from "./Utils/UserSlice";
import { CityContext } from "./Utils/Context";
import { checkLogin } from "./Utils/API";
import AppStore from "./Utils/AppStore";
import "leaflet/dist/leaflet.css";
import "./style.css";
import Navbar from "./Components/Layout/Navbar";
import Sidebar from "./Components/Layout/Sidebar";
import Home from "./Pages/Home";

const Login = lazy(() => import("./Pages/Login"));
const Signup = lazy(() => import("./Pages/Signup"));
const Profile = lazy(() => import("./Pages/Profile"));
const Community = lazy(() => import("./Pages/Community"));
const Events = lazy(() => import("./Pages/Events"));


const App = () => {
    const [currentCity, setCurrentCity] = useState("Rohtak");

    const dispatch = useDispatch()

    useEffect(() => {
        const verifyLogin = async () => {
            const result = await checkLogin();
            if (result.success) {
                const user = result.data;
                dispatch(inUser({name: user.Username , email: user.Email , bio: user.Bio , dp: user.DP}));
            } else {
                dispatch(outUser());
            }
        };
    verifyLogin();
    } , [dispatch]);

    return (
        <CityContext.Provider value={{currentCity , setCurrentCity}}>
            <div className="app-layout">
                <Sidebar />
                <div className="main-layout">
                    <Navbar />
                    <Suspense fallback={<h2>Loading...</h2>}>
                        <Outlet/>
                    </Suspense>
                </div>
            </div>
        </CityContext.Provider>
    );
};

const ProfileLayout = () => {
    return (
        <div className="app-layout">
            <Sidebar />
            <Suspense fallback={<h2>Hey There</h2>}>
                <Profile />
            </Suspense>
        </div>
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
            },
            {
                path: "/community",
                element: <Community/>
            },
            {
                path: "/events",
                element: <Events/>
            }
        ]
    },
    {
        path: "/login",
        element: 
            <Suspense fallback={<h2>Wait a min...</h2>}>
                <Login/>
            </Suspense>
    },
    {
     path: "/signup",
     element: 
        <Suspense fallback={<h2>Just a sec...</h2>}>
            <Signup/> 
        </Suspense>  
    },
    {
        path: "/profile",
        element: <ProfileLayout/>
    }
]);

const root = createRoot(document.getElementById("root"));

root.render(<Provider store={AppStore}><RouterProvider router={AppRouter} /></Provider>);