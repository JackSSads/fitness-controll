import { Box, Button, Icon, Paper, useTheme, Divider, Skeleton } from "@mui/material";

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

    showButtonNewLoading?: boolean;
    showButtonBackLoading?: boolean;
    showButtonDeleteLoading?: boolean;
    showButtonSaveLoading?: boolean;
    showButtonSaveAndCloseLoading?: boolean;

    whenCilickingButtonNew?: () => void;
    whenCilickingButtonBack?: () => void;
    whenCilickingButtonDelete?: () => void;
    whenCilickingButtonSave?: () => void;
    whenCilickingButtonSaveAndClose?: () => void;
};

export const DetailTools: React.FC<IDetailToolsProps> = ({
    textButtonNew = "Novo",

    showButtonSave = true,
    showButtonSaveAndClose = false,
    showButtonDelete = true,
    showButtonNew = true,
    showButtonBack = true,

    showButtonSaveLoading = false,
    showButtonSaveAndCloseLoading = false,
    showButtonDeleteLoading = false,
    showButtonNewLoading = false,
    showButtonBackLoading = false,


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
            {(showButtonNew && !showButtonSaveLoading) && (
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

            {showButtonSaveLoading && (
                <Skeleton width={109} height={60} />
            )}

            {(showButtonSaveAndClose && !showButtonSaveAndCloseLoading) && (
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

            {showButtonSaveAndCloseLoading && (
                <Skeleton width={180} height={60} />
            )}

            {(showButtonDelete && !showButtonDeleteLoading) && (
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

            {showButtonDeleteLoading && (
                <Skeleton width={109} height={60} />
            )}

            {(showButtonSave && !showButtonNewLoading) && (
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

            {showButtonNewLoading && (
                <Skeleton width={109} height={60} />
            )}

            <Divider orientation="vertical" />

            {(showButtonBack && !showButtonBackLoading) && (
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

            {showButtonBackLoading && (
                <Skeleton width={109} height={60} />
            )}
        </Box>
    );
};