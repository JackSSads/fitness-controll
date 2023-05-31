import { Box } from "@mui/material";

interface ILayoutBasePagesProps {
    children: React.ReactNode;
};

export const LayoutBasePages: React.FC<ILayoutBasePagesProps> = ({ children }) => {
    return (
        <Box>
            Teste
            
            {children}
        </Box>
    );
;}