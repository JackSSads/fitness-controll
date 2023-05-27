import { Routes, Route, Navigate} from "react-router-dom"
import { Login } from "../../pages/login";
import { Home } from "../../pages/home";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={<Home/>}/>

            <Route path="*" element={<Navigate to={"/login"} />}/>
        </Routes>
   );
};