'use client';
import {useCallback} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

export default function useNextRoute() {
    const router = useRouter()
    const pathname = usePathname()
    const queryParams = useSearchParams()
    const queryPut = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(queryParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [queryParams]
    )

    return {
        router,
        pathname,
        queryParams,
        queryPut,

    };
}

