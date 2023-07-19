import { useEffect, useState } from "react";

import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

import { DetailTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

import { PessoaService } from "../../shared/services/api/pessoas/PessoasService";
import { AcademiasService } from "../../shared/services/api/academia/AcademiasService";

export const Dashboard = () => {

    const [totalCountPersons, setTotalCountPersons] = useState(0);
    const [totalCountAcademy, setTotalCountAcademy] = useState(0);
    const [isLoadingAcademy, setIsLoadingAcademy] = useState(true);
    const [isLoadingPersons, setIsLoadingPersons] = useState(true);

    useEffect(() => {

        setIsLoadingAcademy(true);
        setIsLoadingPersons(true);

        AcademiasService.getAll(1)
            .then((result) => {
                setIsLoadingAcademy(false);

                if (result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setTotalCountAcademy(result.totalCount);
                };
            });

        PessoaService.getAll(1)
            .then((result) => {
                setIsLoadingPersons(false);

                if (result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setTotalCountPersons(result.totalCount);
                };
            });
    }, []);

    return (
        <LayoutBasePages
            title="Dashboard"
            toobar={(
                <DetailTools
                    showButtonNew={false}
                    showButtonDelete={false}
                    showButtonBack={false}
                    showButtonSave={false}
                />)} >
            <Box width={"100%"} display={"flex"} >
                <Grid container mx={1}>

                    <Grid item container spacing={2}>
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de Academias
                                    </Typography>
                                    <Box p={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        {isLoadingAcademy ? (
                                            <Typography variant="h5" align="center">
                                                Carregando...
                                            </Typography>
                                        ) : (
                                            <Typography variant="h1" align="center">
                                                {totalCountAcademy}
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de Pessoas
                                    </Typography>
                                    <Box p={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        {isLoadingPersons ? (
                                            <Typography variant="h5" align="center">
                                                Carregando...
                                            </Typography>
                                        ) : (
                                            <Typography variant="h1" align="center">
                                                {totalCountPersons}
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </LayoutBasePages>
    );
};