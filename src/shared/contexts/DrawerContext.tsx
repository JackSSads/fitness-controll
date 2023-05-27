import { createContext, useContext, useState, useCallback } from "react";

interface IDrawerContextData {
    isDrawer: boolean;
    toggleDrawerOpen: () => void;
};

interface IAppDrawerProviderProps {
    children: React.ReactNode
};

const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
    return useContext(DrawerContext);
};

export const AppDrawerProvider: React.FC<IAppDrawerProviderProps> = ({ children }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawerOpen = useCallback(() => {

        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);

    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawer: isDrawerOpen, toggleDrawerOpen }} >
            {children}
        </DrawerContext.Provider>
    );
};