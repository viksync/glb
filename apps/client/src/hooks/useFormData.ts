import { useState } from 'react';
import appConfig from '@/constants/appConfig';

type FormEvent = React.FormEvent<HTMLFormElement>;

export interface FormData {
    username: string;
    steamid: string;
    dob: string;
}

interface UseFormDataConfig {
    onSubmit: (formData: FormData) => Promise<void>;
}

export interface UseFormDataReturn {
    formData: FormData;
    onChange: (name: string, value: string) => void;
    onSubmit: (e: FormEvent) => Promise<void>;
    isLoading: boolean;
}

export default function useFormData(
    options: UseFormDataConfig,
): UseFormDataReturn {
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<FormData>(
        appConfig.defaultFormData,
    );

    const onChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await options.onSubmit(formData);
        setIsLoading(false);
    };

    return { formData, onChange, onSubmit, isLoading };
}
