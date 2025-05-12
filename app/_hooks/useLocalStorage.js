import { useEffect, useState } from "react";

export function useLocalStorage(key, initialState) {
    const [value, setValue] = useState(initialState);

    useEffect(() => {
        const storedValue = window.localStorage.getItem(key);
        if (!!storedValue && !!storedValue.length)
            setValue(JSON.parse(storedValue));
    }, [key]);

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return { value, setValue };
}
