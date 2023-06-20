import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

import { Enviroment } from "../../environment";

interface IListingToolsProps {
    textSearch?: string;
    visibleInputSearch?: boolean;
    whenChangingSearchText?: (newText: string) => void;
    textButtonNew?: string;
    visibleButtonNew?: boolean;
    whenClickButton?: () => void;
};

export const ListingTools: React.FC<IListingToolsProps> = ({
    textSearch = "",
    visibleInputSearch = false,
    whenChangingSearchText,
    textButtonNew = "Novo",
    visibleButtonNew = true,
    whenClickButton,
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

            {visibleInputSearch && (
                <TextField
                    size={"small"}
                    placeholder={Enviroment.INPUT_DE_BUSCA}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                    value={textSearch}
                    onChange={(e) => whenChangingSearchText?.(e.target.value)}
                />
            )}

            <Box flex={1} display={"flex"} justifyContent={"end"}>
                {visibleButtonNew && (

                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        endIcon={
                            <Icon>
                                <AddIcon />
                            </Icon>
                        }
                        onClick={whenClickButton}
                    >{textButtonNew}</Button>
                )}
            </Box>
        </Box>
    );
};