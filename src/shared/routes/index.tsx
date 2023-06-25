import { useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom"

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

import { useAppDrawerContext } from "../contexts";

import { Dashboard, ListagemPessoas, PersonsDetails } from "../../pages";

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

            <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
    );
};