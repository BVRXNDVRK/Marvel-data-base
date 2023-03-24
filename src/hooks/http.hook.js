import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [process, setProcess] = useState('waiting'),
          request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
            setProcess('loading');

            try {
                const response = await fetch(url, {method, body, headers}),
                    data = await response.json();
                      
                if (!response.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${response.status}`)
                }

                return data;
            } catch(e) {
                setProcess('error');
                throw e;
            }
          }, [])

    const clearError = useCallback(() => {
        setProcess('loading');
    }, []);

    return {request, clearError, process, setProcess};
}