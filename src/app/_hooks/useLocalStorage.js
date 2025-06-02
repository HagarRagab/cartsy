import { useEffect, useState } from "react";

export function useLocalStorage(key, initialState) {
    const [storedValue, setStoredValue] = useState(initialState);

    useEffect(() => {
        const localStorageValue = window.localStorage.getItem(key);
        if (localStorageValue) setStoredValue(JSON.parse(localStorageValue));
        else window.localStorage.setItem(key, JSON.stringify(initialState));
    }, [key]);

    function setValue(value) {
        if (!value) window.localStorage.removeItem(key);
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    return { storedValue, setValue };
}
