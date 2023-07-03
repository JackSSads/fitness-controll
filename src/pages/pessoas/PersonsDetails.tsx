import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormHandles } from "@unform/core";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { PessoaService } from "../../shared/services/api/pessoas/PessoasService";
import { UTexField, UForm } from "../../shared/components/forms";
import { LayoutBasePages } from "../../shared/layouts";
import { DetailTools } from "../../shared/components";

interface IFormData {
    email: string;
    nomeCompleto: string;
    academia: number;
};

export const PersonsDetails: React.FC = () => {

    const { id = "new" } = useParams<"id">();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (id !== "new") {
            setIsLoading(true);
            PessoaService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate("/persons");
                    } else {
                        setName(result.nomeCompleto);
                        formRef.current?.setData(result);
                    };
                });
        } else {
            formRef.current?.setData({
                nomeCompleto: "",
                email: "",
                academia: ""
            });
        };
    }, [id]);

    const handleSave = (data: IFormData) => {

        setIsLoading(true);

        if (id === "new") {
            PessoaService
                .create(data)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        navigate(`/persons/details/${result}`);
                    };
                });
        } else {
            PessoaService
                .updateById(Number(id), { id: Number(id), ...data })
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert(result.message);
                    };
                });
        };
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Realmente deseja excluir esse resgistro?")) {
            PessoaService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert("Registro apagado com sucesso");
                        navigate('/persons');
                    };
                });
        };
    };


    return (
        <LayoutBasePages
            title={id === "new" ? "Nova Pessoa" : name}
            toobar={
                <DetailTools
                    textButtonNew="Nova"
                    showButtonSaveAndClose
                    showButtonSave={id !== "new"}
                    showButtonDelete={id !== "new"}

                    whenCilickingButtonSave={() => formRef.current?.submitForm()}
                    whenCilickingButtonSaveAndClose={() => formRef.current?.submitForm()}
                    whenCilickingButtonBack={() => navigate("/persons")}
                    whenCilickingButtonDelete={() => handleDelete(Number(id))}
                    whenCilickingButtonNew={() => navigate("/persons/details/new")}
                />
            }
        >

            <UForm ref={formRef} onSubmit={handleSave}>
                <Box m={1} display={"flex"} flexDirection={"column"} component={Paper} variant="outlined">

                    <Grid container direction={"column"} padding={2} spacing={2}>

                        <Grid item>
                            {isLoading && (
                                <LinearProgress variant="indeterminate" />
                            )}
                        </Grid>

                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>

                        <Grid container item direction={"row"} spacing={2}>

                            <Grid item xs={12} md={6} lg={4} xl={2}>

                                <UTexField
                                    fullWidth
                                    disabled={isLoading}
                                    label="Nome competo"
                                    name="nomeCompleto"
                                    onChange={e => setName(e.target.value)} />

                            </Grid>
                        </Grid>

                        <Grid container item direction={"row"} spacing={2}>
                            <Grid item xs={12} md={6} lg={4} xl={2}>

                                <UTexField
                                    fullWidth
                                    disabled={isLoading}
                                    label="E-mail"
                                    name="email" />

                            </Grid>
                        </Grid>

                        <Grid container item direction={"row"} spacing={2}>
                            <Grid item xs={12} md={6} lg={4} xl={2}>

                                <UTexField
                                    fullWidth
                                    disabled={isLoading}
                                    label="Academia"
                                    name="academia" />

                            </Grid>
                        </Grid>

                    </Grid>

                </Box>
            </UForm>

        </LayoutBasePages>
    );
};