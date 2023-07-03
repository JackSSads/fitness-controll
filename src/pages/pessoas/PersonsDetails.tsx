import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";

import { PessoaService } from "../../shared/services/api/pessoas/PessoasService";
import { UTexField } from "../../shared/components/forms";
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
            .updateById(Number(id), {id: Number(id), ...data})
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

                    whenCilickingButtonSave={ () => formRef.current?.submitForm()}
                    whenCilickingButtonSaveAndClose={() => formRef.current?.submitForm()}
                    whenCilickingButtonBack={() => navigate("/persons")}
                    whenCilickingButtonDelete={() => handleDelete(Number(id))}
                    whenCilickingButtonNew={() => navigate("/persons/details/new")}
                />
            }
        >

            <Form ref={formRef} onSubmit={handleSave}>
                <UTexField placeholder="Nome completo" name="nomeCompleto" />
                <UTexField placeholder="E-mail" name="email" />
                <UTexField placeholder="Academia" name="academia" />
            </Form>

        </LayoutBasePages>
    );
};