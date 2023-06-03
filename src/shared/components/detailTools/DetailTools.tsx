import { Box, Button, Icon, Paper, useTheme } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const DetailTools: React.FC = () => {

    const theme = useTheme();

    return (
        <Box
            height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            display={"flex"}
            gap={1}
            alignItems={"center"}
            component={Paper}
        >

            <Button
                variant="contained"
                color="primary"
                disableElevation
                startIcon={
                    <Icon>
                        <SaveIcon />
                    </Icon>
                }
            >Salvar</Button>

            <Button
                variant="outlined"
                color="primary"
                disableElevation
                startIcon={
                    <Icon>
                        <SaveIcon />
                    </Icon>
                }
            >Salvar e voltar</Button>

            <Button
                variant="outlined"
                color="primary"
                disableElevation
                startIcon={
                    <Icon>
                        <DeleteForeverIcon />
                    </Icon>
                }
            >Apagar</Button>

            <Button
                variant="outlined"
                color="primary"
                disableElevation
                startIcon={
                    <Icon>
                        <AddIcon />
                    </Icon>
                }
            >Novo</Button>

            <Button
                variant="outlined"
                color="primary"
                disableElevation
                startIcon={
                    <Icon>
                        <ArrowBackIcon />
                    </Icon>
                }
            >Voltar</Button>
        </Box>
    );
};