import { createRoot } from "react-dom/client";
import "./style.css";
import Navbar from "./Components/Layout/Navbar";

const root = createRoot(document.getElementById("root"));

root.render(<Navbar/>);