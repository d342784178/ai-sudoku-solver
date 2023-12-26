import {SetStateAction, useCallback, useEffect, useRef, useState} from 'react';

type Callback<S> = (newValue: S) => void;
type SetStateCallback<S> = (value: SetStateAction<S>, callback?: Callback<S>) => void;

export function useCallbackState<S>(initialState: S | (() => S)): [S, SetStateCallback<S>] {
    const [state, _setState] = useState(initialState);
    const callbackRef = useRef<Callback<S> | null>(null);

    const setState: SetStateCallback<S> = useCallback((value, callback) => {
        _setState(prevState => {
            // 为回调函数创建一个ref
            if (typeof value === 'function') {
                const newValue = (value as Function)(prevState);
                callbackRef.current = () => callback?.(newValue);
                return newValue;
            } else {
                callbackRef.current = () => callback?.(value as S);
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