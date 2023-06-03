import { Button } from "@mui/material";

import { useAppDrawerContext } from "../../shared/contexts";

export const Login = () => {

    const { toggleDrawerOpen } = useAppDrawerContext();

    return (
        <Button variant="contained" color="primary" fullWidth onClick={toggleDrawerOpen}>Drawer</Button>
    );
}; 