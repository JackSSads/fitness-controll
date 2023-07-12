import { createContext, useContext, useState, useCallback, useMemo } from "react";

import { ThemeProvider, Box } from "@mui/material";

import { DarkTheme, LightTheme } from "../themes";

interface IThemeContextData {
    themeName: "light" | "dark";
    toggleTheme: () => void;
};

interface IAppThemeProviderProps {
    children: React.ReactNode
};

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {

    const [themeName, setThemeName] = useState<"dark" | "light">("dark");

    const toggleTheme = useCallback(() => {

        setThemeName(oldThemeName => oldThemeName === "dark" ? "light" : "dark");

    }, []);

    const theme = useMemo(() => {
        if (themeName === "light") return LightTheme;

        return DarkTheme
    }, [themeName])

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }} >
            <ThemeProvider theme={theme}>
                <Box width={"100vw"} height={"100vh"} bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};