import { useNavigate, useParams } from "react-router-dom";

import { LayoutBasePages } from "../../shared/layouts";
import { DetailTools } from "../../shared/components";

export const PersonsDetails: React.FC = () => {

    const { id = "new" } = useParams<"id">();
    const navigate = useNavigate();

    const handleSave = () => {
        return;
    };

    const handleDelete = () => {
        return;
    };

    return (
        <LayoutBasePages
        title="Detalhe de Pessoa"
        toobar={
            <DetailTools 
            showButtonSaveAndClose
            textButtonNew="Nova"
            showButtonDelete={id !== "new"}
            showButtonNew={id !== "new"}

            whenCilickingButtonSaveAndClose={() => {}}
            whenCilickingButtonDelete={() => handleDelete}
            whenCilickingButtonSave={() => handleSave}
            whenCilickingButtonBack={() => navigate("/persons")}
            whenCilickingButtonNew={() => navigate("/persons/details/new")}
            />
        }
        >
            Pessoas
        </LayoutBasePages>
    );
};