import { Enviroment } from "../../../environment";
import { API } from "../axiosConfig";

interface IListagemPessoa {
    id: number;
    email: string;
    academia: number;
    nomeCompleto: string;
};

interface IDetalhePessoas {
    id: number;
    email: string;
    academia: number;
    nomeCompleto: string;
};

type TPessoasComTotalCount = {
    data: IListagemPessoa[];
    totalCount: number;
};

const getAll = async (page: 1, filter = ""): Promise<TPessoasComTotalCount | Error> => {
    try {
        const urlRelative = `/pessoas?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;

        const { data, headers } = await API.get(urlRelative);

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS),
            };
        };
        return new Error("Erro ao listar os registros.");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao listar os registros.");
    };
};

const getById = async (id: number): Promise<IDetalhePessoas | Error> => {
    try {
        const urlRelative = `/pessoas/${id}`;

        const { data } = await API.get(urlRelative);

        if (data) {
            return data;
        };

        return new Error("Erro ao  consultar o registro.");

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao consultar o registro.");
    };
};

const create = async (dados: Omit<IDetalhePessoas, "id">): Promise<number | Error> => {
    try {

        const { data } = await API.post<IDetalhePessoas>("/pessoas", dados);

        if (data) {
            return data.id;
        };

        return new Error("Erro ao criar o registro.");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao consultar o registro.");
    };
};

const updateById = async (id: number, dados: IDetalhePessoas): Promise<void | Error> => {
    try {
        await API.put(`/pessoas/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao atualizar o registro.");
    };
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await API.delete("/pessoas/");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao deletar o registro.");
    };
};

export const PessoaService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};