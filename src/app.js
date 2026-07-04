import { createRoot } from "react-dom/client";
import "./style.css";
import Navbar from "./Components/Layout/Navbar";
import Sidebar from "./Components/Layout/Sidebar";
import { createBrowserRouter , RouterProvider , Outlet } from "react-router-dom";

const App = () => {
    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-layout">
                <Navbar />
                <Outlet/>
            </div>
        </div>
    );
};

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            // {
            //     path: "/",
            //     element: </>
            // }
        ]
    }
]);

const root = createRoot(document.getElementById("root"));

root.render(<RouterProvider router={AppRouter}/> );