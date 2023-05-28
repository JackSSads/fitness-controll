import { Routes, Route, Navigate} from "react-router-dom"
import { Login } from "../../pages/login";
import { App } from "../../App";
import { useAppDrawerContext } from "../contexts";
import { useEffect } from "react";

export const AppRoutes = () => {

    const { setDrawerOption } = useAppDrawerContext();

    useEffect(() => {

        setDrawerOption([
            {
                label: "Página Inicial",
                icon: "home",
                path: "/login"
            },
        ]);
    }, []);

    return (
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={<App/>}/>

            <Route path="*" element={<Navigate to={"/login"} />}/>
        </Routes>
   );
};