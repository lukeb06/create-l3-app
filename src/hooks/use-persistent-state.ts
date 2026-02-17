'use client';

import { useState, useEffect, useRef } from 'react';

export function usePersistentState<T>(key: string, defaultValue: T): [T, (value: T) => void] {
    const [value, setValue] = useState<T>(defaultValue);
    const initRef = useRef(false);

    useEffect(() => {
        const _value = JSON.parse(localStorage.getItem(key) || 'null') as T | null;
        if (_value === null) localStorage.setItem(key, JSON.stringify(defaultValue));
        else setValue(_value as T);
    }, []);

    useEffect(() => {
        if (!initRef.current) {
            initRef.current = true;
            return;
        }
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}
