import { DetailTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

export const Dashboard = () => {
    return (
        <LayoutBasePages
            title="Dashboard"
            toobar={(
                <DetailTools
                    showButtonSaveAndClose
                />)} >
            Testando
        </LayoutBasePages>
    );
};