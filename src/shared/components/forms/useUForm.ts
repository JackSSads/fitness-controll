import { useRef, useCallback } from "react";
import { FormHandles } from "@unform/core";

export const useUForm = () => {
    const formRef = useRef<FormHandles>(null);

    const isSaving = useRef(false);
    const isSavingAndClose = useRef(false);

    const handleSave = useCallback(() => {
        isSaving.current = false;
        isSavingAndClose.current = false;
        formRef.current?.submitForm();
    }, []);

    const handleSaveAndClose = useCallback(() => {
        isSaving.current = false;
        isSavingAndClose.current = true;
        formRef.current?.submitForm();
    }, []);


    const handleIsSave = useCallback(() => {
        return isSaving.current
    }, []);

    const handleIsSaveAndClose = useCallback(() => {
        return isSavingAndClose.current;
    }, []);


    return {
        formRef,

        save: handleSave,
        saveAndClose: handleSaveAndClose,

        isSave: handleIsSave,
        isSaveAndClose: handleIsSaveAndClose,
    };
};