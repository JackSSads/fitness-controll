import { useEffect, useState, useMemo } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { AcademiasService } from "../../../shared/services/api/academia/AcademiasService";
import { useDebounce } from "../../../shared/hooks";
import { useField } from "@unform/core";

type TAutoCompleteAcademy = {
    id: number;
    label: string;
};

interface IAutoCompleteAcademyProps {
    isExternalLoading: boolean;
};

export const AutoCompleteAcademy: React.FC<IAutoCompleteAcademyProps> = ({ isExternalLoading = false }) => {
    const { fieldName, registerField, defaultValue, clearError, error } = useField("academia");
    const { debounce } = useDebounce();

    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

    const [options, setOptions] = useState<TAutoCompleteAcademy[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
        });
    }, [registerField, fieldName, selectedId]);

    useEffect(() => {

        setIsLoading(true);

        debounce(() => {
            AcademiasService.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    } else {
                        console.log(result);

                        setOptions(result.data.map(academia => ({ id: academia.id, label: academia.nomeAcademia })));
                    };
                });
        });
    }, [busca]);

    const autCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return null;

        const selectedOption = options.find(option => option.id === selectedId);

        return selectedOption;

    }, [selectedId, options]);

    return (
        <Autocomplete
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Sem opções"
            loadingText="Buscando..."

            disablePortal

            options={options}
            loading={isLoading}
            disabled={isExternalLoading}
            value={autCompleteSelectedOption}
            onInputChange={(_, newValue) => setBusca(newValue)}
            popupIcon={isExternalLoading || isLoading ? <CircularProgress size={28} /> : undefined}
            onChange={(_, newValue) => { setSelectedId(newValue?.id); setBusca(""); clearError(); }}
            renderInput={(params) => (
                <TextField
                    {...params}

                    error={!!error}
                    helperText={error}

                    label="Academia"
                />
            )}
        />
    );
};