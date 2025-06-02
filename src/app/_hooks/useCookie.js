"use client";

import { useEffect, useState } from "react";

function useCookie(key) {
    const [value, setValue] = useState("");

    function getDecodeCookie(key) {
        const cookie = document.cookie
            .split(";")
            ?.find((c) => c.includes(key))
            ?.trim()
            .split("=");

        return cookie ? JSON.parse(decodeURIComponent(cookie[1])) : null;
    }

    useEffect(() => setValue(() => getDecodeCookie(key)), [key]);

    return { value, setValue };
}

export default useCookie;
