import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useSearch() {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const router = useRouter();
    const pathname = usePathname();

    function setParam(key, value) {
        params.set(key, value);
        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    }

    function deleteParam(key) {
        params.delete(key);
        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    }

    function getParam(key) {
        return params.get(key);
    }

    return { setParam, deleteParam, getParam };
}
