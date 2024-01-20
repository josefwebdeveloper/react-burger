import { useState, ChangeEvent } from 'react';

type FormValues = {
    [key: string]: string
};

const useForm = (initialValues: FormValues) => {
    const [values, setValues] = useState<FormValues>(initialValues);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return { values, onChange };
};

export default useForm;
