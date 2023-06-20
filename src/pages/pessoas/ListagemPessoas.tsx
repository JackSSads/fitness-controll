import { useMemo, useEffect, useState } from "react";
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { IListagemPessoa, PessoaService } from "../../shared/services/api/pessoas/PessoasService";
import { ListingTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";


export const ListagemPessoas: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get("busca") || "";
    }, [searchParams]);


    useEffect(() => {

        setIsLoading(true);

        debounce(() => {
            PessoaService.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);

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

            <TableContainer component={Paper} variant="outlined" sx={{ mx: 1, width: "auto" }}>
                <Table>
                    <TableHead>

                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome completo</TableCell>
                            <TableCell>E-Mail</TableCell>
                        </TableRow>

                    </TableHead>

                    {!isLoading ? (
                        <TableBody>

                            {rows.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell>Ações</TableCell>
                                    <TableCell>{row.nomeCompleto}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    ) : (
                            <TableRow>
                                <TableCell><LinearProgress /></TableCell>
                                <TableCell><LinearProgress /></TableCell>
                                <TableCell><LinearProgress /></TableCell>
                            </TableRow>
                    )}
                </Table>
            </TableContainer>
        </LayoutBasePages>
    );
};