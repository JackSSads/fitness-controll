import { useEffect } from "react";
import { Routes, Route, Navigate} from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import { useAppDrawerContext } from "../contexts";
import { Dashboard } from "../../pages";

export const AppRoutes = () => {

    const { setDrawerOption } = useAppDrawerContext();

    useEffect(() => {

        setDrawerOption([
            {
                label: "Página Inicial",
                icon: <HomeIcon/>,
                path: "/"
            },
        ]);
    }, [setDrawerOption]);

    return (
        <Routes>
            <Route path="/" element={<Dashboard />}/>

            <Route path="*" element={<Navigate to={"/login"} />}/>
        </Routes>
   );
};