import { ListingTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

export const Dashboard = () => {
    return(
        <LayoutBasePages title="Dashboard" toobar={(<ListingTools visibleInputSearch textButtonNew="Nova"/>)} >
            Testando
        </LayoutBasePages>
    );
};