import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "@unform/web";

import { DetailTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";
import { PessoaService } from "../../shared/services/api/pessoas/PessoasService";
import { UTexField } from "../../shared/components/forms";

export const PersonsDetails: React.FC = () => {

    const { id = "new" } = useParams<"id">();
    const navigate = useNavigate();

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
                        console.log(result);
                    };
                });
        };
    }, [id]);

    const handleSave = () => {
        return;
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
                    showButtonNew={id !== "new"}
                    showButtonDelete={id !== "new"}

                    whenCilickingButtonSave={() => handleSave}
                    whenCilickingButtonSaveAndClose={() => { }}
                    whenCilickingButtonBack={() => navigate("/persons")}
                    whenCilickingButtonDelete={() => handleDelete(Number(id))}
                    whenCilickingButtonNew={() => navigate("/persons/details/new")}
                />
            }
        >

            <Form onSubmit={(datas) => console.log(datas)}>

                <UTexField name="nomeCompleto" />
                <button type="submit">Enviar</button>

            </Form>

        </LayoutBasePages>
    );
};