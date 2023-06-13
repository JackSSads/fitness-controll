import { useMemo, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

import { ListingTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

import { PessoaService } from "../../shared/services/api/pessoas/PessoasService";

export const ListagemPessoas: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const busca = useMemo(() => {
        return searchParams.get("busca") || "";
    }, [searchParams]);

    useEffect(() => {
        PessoaService
    }, []);

    return (
        <LayoutBasePages
            title="Listagem de pessoas"
            toobar={
                <ListingTools
                    visibleInputSearch
                    textButtonNew="Nova"
                    textSearch={busca}
                    whenChangingSearchText={text => setSearchParams({ busca: text }, { replace: true })}
                />
            }>

        </LayoutBasePages>
    )
}