import { useMemo, useEffect, useState } from "react";
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Pagination, IconButton } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ListingTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";
import { useDebounce } from "../../shared/hooks";
import { Enviroment } from "../../shared/environment";

import { IListagemAcademias, AcademiasService } from "../../shared/services/api/academia/AcademiasService";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export const ListagemAcademia: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<IListagemAcademias[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate()

    const busca = useMemo(() => {
        return searchParams.get("busca") || "";
    }, [searchParams]);

    const page = useMemo(() => {
        return Number(searchParams.get("page") || "1");
    }, [searchParams]);


    useEffect(() => {

        setIsLoading(true);

        debounce(() => {
            AcademiasService.getAll(page, busca)
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
    }, [busca, page]);

    const handleDelete = (id: number) => {
        if (window.confirm("Realmente deseja excluir esse resgistro?")) {
            AcademiasService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        setRows(oldRows => [
                            ...oldRows.filter(oldRow => oldRow.id !== id),
                        ]);
                        alert("Registro apagado com sucesso");
                    };
                });
        };
    };

    return (
        <LayoutBasePages
            title="Listagem de academias"
            toobar={
                <ListingTools
                    textSearch={busca}
                    visibleInputSearch
                    textButtonNew="Nova"
                    whenClickButton={() => navigate(`/academy/details/new`)}
                    whenChangingSearchText={text => setSearchParams({ busca: text, page: "1" }, { replace: true })}
                />
            }>

            <TableContainer component={Paper} variant="outlined" sx={{ mx: 1, width: "auto" }}>
                <Table>
                    <TableHead>

                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome das academias</TableCell>
                            <TableCell>E-Mail</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>

                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleDelete(row.id)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => navigate(`/academy/details/${row.id}`)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>{row.nomeAcademia}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Enviroment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableCell colSpan={3}><LinearProgress variant="indeterminate" /></TableCell>
                        )}

                        {(totalCount > 0) && totalCount > Enviroment.LIMITE_DE_LINHAS && !isLoading && (
                            <TableCell colSpan={3}>
                                <Pagination
                                    variant="outlined"
                                    count={Math.ceil(totalCount / Enviroment.LIMITE_DE_LINHAS)}
                                    page={page}
                                    onChange={(_, newPage) => setSearchParams({ busca, page: newPage.toString() }, { replace: true })}
                                />
                            </TableCell>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBasePages>
    );
};