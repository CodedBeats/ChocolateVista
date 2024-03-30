// dependencies
import { useEffect, useState } from "react";

let useFetch = (url, requestMethod, inputData) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // track if component unmounted
        let ignore = false; 

        const fetchData = async () => {
            setIsPending(true);
            setError(null);

            try {
                const response = await fetch(url, {
                    method: requestMethod,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: inputData ? JSON.stringify(inputData) : null,
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const jsonData = await response.json();
                if (!ignore) {
                    setData(jsonData);
                }
            } catch (error) {
                if (!ignore) {
                    setError(error.message);
                }
            }

            if (!ignore) {
                setIsPending(false);
            }
        };

        // only fetch data if inputData changed
        if (inputData !== null) {
            fetchData();
        }

        // cleanup (handle unmounting)
        return () => { ignore = true; };
    }, [url, requestMethod, inputData]);

    return { data, isPending, error };
}

export default useFetch;
