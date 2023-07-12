import { useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom"

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';

import { useAppDrawerContext } from "../contexts";

import { Dashboard, ListagemPessoas, PersonsDetails, ListagemAcademia, AcademyDetails } from "../../pages";

export const AppRoutes = () => {

    const { setDrawerOption } = useAppDrawerContext();

    useEffect(() => {

        setDrawerOption([
            {
                icon: <HomeIcon />,
                path: "/",
                label: "Página Inicial",
            },
            {
                icon: <FitnessCenterIcon />,
                path: "/academy",
                label: "Academias",
            },
            {
                icon: <PeopleIcon />,
                path: "/persons",
                label: "Pessoas",
            },
        ]);
    }, [setDrawerOption]);

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/persons" element={<ListagemPessoas />} />
            <Route path="/persons/details/:id" element={<PersonsDetails />} />
            
            <Route path="/academy" element={<ListagemAcademia />} />
            <Route path="/academy/details/:id" element={<AcademyDetails />} />

            <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
    );
};