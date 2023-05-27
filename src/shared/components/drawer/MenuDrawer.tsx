import {
    Avatar,
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme,
    Button
} from "@mui/material";

import HomeIcon from '@mui/icons-material/Home';

import { useAppDrawerContext, useAppThemeContext } from "../../contexts";

interface IMenuLateralProps {
    children: React.ReactNode;
};

export const MenuDrawer: React.FC<IMenuLateralProps> = ({ children }) => {
    const { toggleTheme } = useAppThemeContext();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));

    const { isDrawer,toggleDrawerOpen } = useAppDrawerContext();

    return (
        <>
            <Drawer open={isDrawer} variant={smDown ? "temporary" : "permanent"} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(26)} height={"100%"} display={"flex"} flexDirection={"column"}>

                    <Box width={"100%"} height={theme.spacing(20)} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <Avatar
                            alt="Remy Sharp"
                            src="https://scontent.fnat18-1.fna.fbcdn.net/v/t39.30808-1/338925105_1822570114811222_4826913868484575657_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=DLMBSZzywJwAX8RCUzj&_nc_ht=scontent.fnat18-1.fna&oh=00_AfDXk5eTLbWCI2_HuRxxgLr89xtmsvsgRzyn3SFsWNog-w&oe=6476C324"
                            sx={{ height: theme.spacing(12), width: theme.spacing(12) }} />
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component={"nav"}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Página inicial" />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
                <Button variant="contained" color="primary" onClick={toggleTheme}>Tema</Button>
            </Drawer>

            <Box height={"100vh"} marginLeft={smDown ? 0 : theme.spacing(26)}>
                {children}
            </Box>
        </>
    );
};