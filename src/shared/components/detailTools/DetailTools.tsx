import { Box, Button, Icon, Paper, useTheme, Divider, Skeleton, Typography, useMediaQuery, Theme } from "@mui/material";

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


    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
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
                    startIcon={ <Icon> <SaveIcon /> </Icon> }
                >
                    <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                        Salvar
                    </Typography>
                </Button>
            )}

            {showButtonSaveLoading && (
                <Skeleton width={109} height={60} />
            )}

            {(showButtonSaveAndClose && !showButtonSaveAndCloseLoading && !smDown && !mdDown) && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonSaveAndClose}
                    startIcon={ <Icon><SaveIcon /></Icon> }
                >
                    <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                        Salvar e fechar
                    </Typography>
                </Button>
            )}

            {(showButtonSaveAndCloseLoading  && !smDown && !mdDown) && (
                <Skeleton width={180} height={60} />
            )}

            {(showButtonDelete && !showButtonDeleteLoading) && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonDelete}
                    startIcon={ <Icon><DeleteForeverIcon /></Icon> }
                >
                    <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                        Apagar
                    </Typography>
                </Button>
            )}

            {showButtonDeleteLoading && (
                <Skeleton width={109} height={60} />
            )}

            {(showButtonSave && !showButtonNewLoading && !smDown) && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonNew}
                    startIcon={ <Icon><AddIcon /></Icon> }
                >
                    <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                        {textButtonNew}
                    </Typography>
                </Button>
            )}

            {(showButtonNewLoading  && !smDown) && (
                <Skeleton width={109} height={60} />
            )}

            
            {(showButtonBack &&
                (showButtonNew || showButtonSaveAndClose || showButtonDelete || showButtonSave)
            ) && (
                <Divider orientation="vertical" />
            )}

            {(showButtonBack && !showButtonBackLoading) && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonBack}
                    startIcon={ <Icon><ArrowBackIcon /></Icon> }
                >
                    <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                        Voltar
                    </Typography>
                </Button>
            )}

            {showButtonBackLoading && (
                <Skeleton width={109} height={60} />
            )}
        </Box>
    );
};