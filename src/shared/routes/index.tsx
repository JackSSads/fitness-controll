import { useEffect } from "react";
import { Routes, Route, Navigate} from "react-router-dom"

import { useAppDrawerContext } from "../contexts";
import { Dashboard } from "../../pages";

export const AppRoutes = () => {

    const { setDrawerOption } = useAppDrawerContext();

    useEffect(() => {

        setDrawerOption([
            {
                label: "Página Inicial",
                icon: "home",
                path: "/"
            },
        ]);
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Dashboard />}/>

            <Route path="*" element={<Navigate to={"/login"} />}/>
        </Routes>
   );
};