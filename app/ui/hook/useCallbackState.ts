import {SetStateAction, useCallback, useEffect, useRef, useState} from 'react';

type Callback<S> = (newValue: S) => void;
type SetStateCallback<S> = (value: SetStateAction<S>, callback?: Callback<S>) => void;

export function useCallbackState<S = undefined>(initialState?: S | (() => S)): [S | undefined, SetStateCallback<S | undefined>] {
    const [state, _setState] = useState(initialState);
    const callbackRef = useRef<Callback<S | undefined> | null>(null);

    const setState: SetStateCallback<S | undefined> = useCallback((value, callback) => {
        _setState(prevState => {
            if (typeof value === 'function') {
                const newValue = (value as Function)(prevState);
                callbackRef.current = () => callback?.(newValue);
                return newValue;
            } else {
                callbackRef.current = () => callback?.(value as S | undefined);
                return value;
            }
        });
    }, []);

    useEffect(() => {
        // 执行回调函数
        if (callbackRef.current) {
            // @ts-ignore
            callbackRef.current();
            callbackRef.current = null;
        }
    }, [state]);

    return [state, setState];
}