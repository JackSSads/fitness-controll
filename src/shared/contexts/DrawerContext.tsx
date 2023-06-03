import { createContext, useContext, useState, useCallback } from "react";

interface IDrawerContextData {
    isDrawer: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOption[];
    setDrawerOption: (newDrawerOptions: IDrawerOption[]) => void;
};

interface IDrawerOption {
    icon: React.ReactNode;
    label: string;
    path: string;
};

interface IAppDrawerProviderProps {
    children: React.ReactNode;
};

const DrawerContext = createContext({} as IDrawerContextData);

export const useAppDrawerContext = () => {
    return useContext(DrawerContext);
};

export const AppDrawerProvider: React.FC<IAppDrawerProviderProps> = ({ children }) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(() => {

        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);

    }, []);

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {

        setDrawerOptions(newDrawerOptions);

    }, []);

    return (
        <DrawerContext.Provider value={{ isDrawer: isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOption: handleSetDrawerOptions}} >
            {children}
        </DrawerContext.Provider>
    );
};