import { useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom"

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

import { useAppDrawerContext } from "../contexts";

import { Dashboard, ListagemPessoas } from "../../pages";

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
                path: "/pessoas",
                label: "Pessoas",
            },
        ]);
    }, [setDrawerOption]);

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/pessoas" element={<ListagemPessoas />} />
            {/* <Route path="/city/detalhe/:id" element={<ListagemCidades />}/> */}

            <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
    );
};