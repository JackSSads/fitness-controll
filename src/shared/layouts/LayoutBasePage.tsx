import { Box, Typography, useTheme, IconButton, useMediaQuery, Theme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDrawerContext } from "../contexts";

interface ILayoutBasePagesProps {
    children: React.ReactNode;
    title: string;
    toobar?: React.ReactNode;
};

export const LayoutBasePages: React.FC<ILayoutBasePagesProps> = ({ children, title, toobar }) => {

    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
    const theme = useTheme();

    const { toggleDrawerOpen } = useAppDrawerContext();

    return (
        <Box height={"100%"} display={"flex"} flexDirection={"column"} gap={1}>
            <Box display={"flex"} alignItems={"center"} padding={1} gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} >

                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                )}

                <Typography variant={smDown ? "h5" : mdDown ? "h4" : "h3"}overflow={"hidden"} textOverflow={"ellipsis"} whiteSpace={"nowrap"}>
                    {title}
                </Typography>
            </Box>

            {toobar && (
                <Box>
                    {toobar}
                </Box>
            )}

            <Box flex={1} overflow={"auto"}>
                {children}
            </Box>
        </Box>
    );
    ;
}