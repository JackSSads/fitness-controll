import { Button } from "@mui/material";

import { useAppThemeContext } from "../../shared/contexts";

export const Login = () => {

    const { toggleTheme } = useAppThemeContext();

    return (
        <Button variant="contained" color="primary" fullWidth onClick={toggleTheme}>Toggle</Button>
    );
}; 