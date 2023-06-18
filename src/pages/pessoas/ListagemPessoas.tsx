import { useMemo, useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { ListingTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

import { IListagemPessoa, PessoaService } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";

export const ListagemPessoas: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [rows , setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount  , setTotalCount ] = useState(0);

    const busca = useMemo(() => {
        return searchParams.get("busca") || "";
    }, [searchParams]);


    useEffect(() => {
        debounce(() => {
            PessoaService.getAll(1, busca)
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    } else {
                        console.log(result);

                        setTotalCount(result.totalCount);
                        setRows(result.data);
                    };
                });
        });
    }, [busca]);

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
                Pessoas
        </LayoutBasePages>
    );
};