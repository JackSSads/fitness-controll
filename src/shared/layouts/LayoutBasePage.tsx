import { Box, Typography, useTheme, IconButton, useMediaQuery, Theme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDrawerContext } from "../contexts";

interface ILayoutBasePagesProps {
    children: React.ReactNode;
    title: string;
};

export const LayoutBasePages: React.FC<ILayoutBasePagesProps> = ({ children, title }) => {

    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const theme = useTheme();

    const { toggleDrawerOpen } = useAppDrawerContext();

    return (
        <Box height={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
            <Box display={"flex"} alignItems={"center"} padding={1} height={theme.spacing(12)} gap={1}>

                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                )}

                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </Box>

            <Box>
                Barra de Ferramentas
            </Box>

            <Box>
                {children}
            </Box>
        </Box>
    );
    ;
}