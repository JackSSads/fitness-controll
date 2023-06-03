import { Box, Button, Icon, Paper, useTheme, Divider } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface IDetailToolsProps {
    textButtonNew?: string;

    showButtonNew?: boolean;
    showButtonBack?: boolean;
    showButtonDelete?: boolean;
    showButtonSave?: boolean;
    showButtonSaveAndClose?: boolean;

    whenCilickingButtonNew?: () => void;
    whenCilickingButtonBack?: () => void;
    whenCilickingButtonDelete?: () => void;
    whenCilickingButtonSave?: () => void;
    whenCilickingButtonSaveAndClose?: () => void;
};

export const DetailTools: React.FC<IDetailToolsProps> = ({
    textButtonNew = "Novo",

    showButtonNew = true,
    showButtonBack = true,
    showButtonDelete = true,
    showButtonSave = true,
    showButtonSaveAndClose = false,

    whenCilickingButtonNew,
    whenCilickingButtonBack,
    whenCilickingButtonDelete,
    whenCilickingButtonSave,
    whenCilickingButtonSaveAndClose,
}) => {

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
            {showButtonNew && (
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonSave}
                    startIcon={
                        <Icon>
                            <SaveIcon />
                        </Icon>
                    }
                >Salvar</Button>
            )}

            {showButtonSaveAndClose && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonSaveAndClose}
                    startIcon={
                        <Icon>
                            <SaveIcon />
                        </Icon>
                    }
                >Salvar e voltar</Button>
            )}

            {showButtonDelete && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonDelete}
                    startIcon={
                        <Icon>
                            <DeleteForeverIcon />
                        </Icon>
                    }
                >Apagar</Button>
            )}

            {showButtonSave && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonNew}
                    startIcon={
                        <Icon>
                            <AddIcon />
                        </Icon>
                    }
                >{textButtonNew}</Button>
            )}

            <Divider orientation="vertical" />

            {showButtonBack && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonBack}
                    startIcon={
                        <Icon>
                            <ArrowBackIcon />
                        </Icon>
                    }
                >Voltar</Button>
            )}
        </Box>
    );
};