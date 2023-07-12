import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { UTexField, UForm, useUForm, IUFormErrors } from "../../shared/components/forms";
import { AcademiasService } from "../../shared/services/api/academia/AcademiasService";
import { LayoutBasePages } from "../../shared/layouts";
import { DetailTools } from "../../shared/components";
import * as yup from "yup";

interface IFormData {
    email: string;
    nomeAcademia: string;
};

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    email: yup.string().required().email(),
    nomeAcademia: yup.string().required().min(3),
});

export const AcademyDetails: React.FC = () => {

    const { id = "new" } = useParams<"id">();
    const navigate = useNavigate();
    const { formRef, save, saveAndClose, isSaveAndClose } = useUForm();

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (id !== "new") {

            setIsLoading(true);

            AcademiasService.getById(Number(id))
                .then((result) => {

                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navigate("/academy");
                    } else {
                        setName(result.nomeAcademia);
                        formRef.current?.setData(result);
                    };
                });
        } else {

            formRef.current?.setData({
                email: "",
                nomeAcademia: "",
            });
        };
    }, [id]);

    const handleSave = (data: IFormData) => {

        formValidationSchema
            .validate(data, { abortEarly: false })
            .then((dadasValidated) => {

                setIsLoading(true);

                if (id === "new") {
                    AcademiasService
                        .create(dadasValidated)
                        .then((result) => {

                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {

                                if (isSaveAndClose()) {
                                    navigate("/academy");
                                } else {
                                    navigate(`/academy/details/${result}`);
                                };
                            };
                        });
                } else {

                    AcademiasService
                        .updateById(Number(id), { id: Number(id), ...dadasValidated })
                        .then((result) => {

                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {

                                if (isSaveAndClose()) {
                                    navigate("/academy");
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
            AcademiasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert("Registro apagado com sucesso");
                        navigate('/academy');
                    };
                });
        };
    };

    return (
        <LayoutBasePages
            title={id === "new" ? "Nova Academia" : name}
            toobar={
                <DetailTools
                    textButtonNew="Nova"
                    showButtonSaveAndClose
                    showButtonSave={id !== "new"}
                    showButtonDelete={id !== "new"}

                    whenCilickingButtonBack={() => navigate("/academy")}
                    whenCilickingButtonDelete={() => handleDelete(Number(id))}
                    whenCilickingButtonSave={save}
                    whenCilickingButtonNew={() => navigate("/academy/details/new")}
                    whenCilickingButtonSaveAndClose={saveAndClose}
                />
            }
        >

            <UForm ref={formRef} onSubmit={handleSave}>
                <Box m={1} display={"flex"} flexDirection={"column"} component={Paper} variant="outlined">

                    <Grid container direction={"column"} padding={2} spacing={2}>

                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant="indeterminate" />
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>

                        <Grid container item direction={"row"} spacing={2}>

                            <Grid item xs={12} md={6} lg={4} xl={2}>

                                <UTexField
                                    fullWidth
                                    disabled={isLoading}
                                    label="Nome da academia"
                                    name="nomeAcademia"
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
                    </Grid>
                </Box>
            </UForm>

        </LayoutBasePages>
    );
};