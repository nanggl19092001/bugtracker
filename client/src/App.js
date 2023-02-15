import {Route, Routes, BrowserRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import {AppProvider } from "./Context/AppContext";


function App() {
    const [isLogin, setIsLogin] = useState(false);
    const token = localStorage.getItem("token");
    useEffect(() => {
        token ? setIsLogin(true) : setIsLogin(false);
    },[token]) 


    return(
        <AppProvider>
            <div className="font-poppins">
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login setIsLogin={setIsLogin}/>}/>
                    <Route index path="/" element={!isLogin ? <Login setIsLogin={setIsLogin}/> : <Home pages = {'dashboard'}/>}/>
                    <Route index path="/dashboard" element={!isLogin ? <Login setIsLogin={setIsLogin}/> : <Home pages = {'dashboard'}/>}/>
                    <Route index path="/ticket" element={!isLogin ? <Login setIsLogin={setIsLogin}/> : <Home pages = {'ticket'}/>}/>
                    <Route path="/project/:id" element={!isLogin ? <Login setIsLogin={setIsLogin}/> : <Home pages={'project'} />}/>
                    <Route path = "*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
            </div>
        </AppProvider>
    )
}

export default App;
