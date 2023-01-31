import {Route, Routes, BrowserRouter, redirect, Navigate} from "react-router-dom"
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Logout from "./pages/Logout";
import { AppProvider } from "./Context/AppContext";

function App() {
    const token = localStorage.getItem('token')
    return(
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/" element={token ? <Home/> : <Login/>}/>
                    <Route path = "*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </AppProvider>
    )
}

export default App;
