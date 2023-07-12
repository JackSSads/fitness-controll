import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { UTexField, UForm, useUForm, IUFormErrors } from "../../shared/components/forms";
import { PessoaService } from "../../shared/services/api/pessoas/PessoasService";
import { AutoCompleteAcademy } from "./components/AutoCompleteAcademy";
import { LayoutBasePages } from "../../shared/layouts";
import { DetailTools } from "../../shared/components";
import * as yup from "yup";

interface IFormData {
    email: string;
    academia: number;
    nomeCompleto: string;
};

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    academia: yup.number().required(),
    email: yup.string().required().email(),
    nomeCompleto: yup.string().required().min(3),
});

export const PersonsDetails: React.FC = () => {

    const { id = "new" } = useParams<"id">();
    const navigate = useNavigate();
    const { formRef, save, saveAndClose, isSaveAndClose } = useUForm();

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
                email: "",
                nomeCompleto: "",
                academia: undefined

            });
        };
    }, [id]);

    const handleSave = (data: IFormData) => {

        formValidationSchema
            .validate(data, { abortEarly: false })
            .then((datasValidated) => {

                setIsLoading(true);

                if (id === "new") {
                    PessoaService
                        .create(datasValidated)
                        .then((result) => {

                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {

                                if (isSaveAndClose()) {
                                    navigate("/persons");
                                } else {
                                    navigate(`/persons/details/${result}`);
                                };
                            };
                        });
                } else {

                    PessoaService
                        .updateById(Number(id), { id: Number(id), ...datasValidated })
                        .then((result) => {

                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {

                                if (isSaveAndClose()) {
                                    navigate("/persons");
                                };
                            };
                        });
                };
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IUFormErrors = {};

                errors.inner.forEach(error => {
                    if (!error.path) return;

                    validationErrors[error.path] = error.message;
                    formRef.current?.setErrors(validationErrors);
                });

                console.log(validationErrors);
            });
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

                    whenCilickingButtonBack={() => navigate("/persons")}
                    whenCilickingButtonDelete={() => handleDelete(Number(id))}
                    whenCilickingButtonSave={save}
                    whenCilickingButtonNew={() => navigate("/persons/details/new")}
                    whenCilickingButtonSaveAndClose={saveAndClose}
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

                                <AutoCompleteAcademy isExternalLoading={isLoading} />

                            </Grid>
                        </Grid>

                    </Grid>

                </Box>
            </UForm>

        </LayoutBasePages>
    );
};