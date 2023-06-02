import { Toobar } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

export const Dashboard = () => {
    return(
        <LayoutBasePages title="Dashboard" toobar={(<Toobar visibleInputSearch textButtonNew="Nova"/>)} >
            Testando
        </LayoutBasePages>
    );
};