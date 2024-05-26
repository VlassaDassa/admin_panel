import { useEffect, useState } from 'react';





interface UseAsyncRequestProps<T> {
    requestFunction: () => Promise<T>;
}

interface UseAsyncRequestResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export const useAsyncRequest = <T>({ requestFunction }: UseAsyncRequestProps<T>): UseAsyncRequestResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await requestFunction();
            setData(response);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Произошла ошибка');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); 

    return { data, loading, error };
}
