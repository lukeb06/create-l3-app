'use client';

import { useState, useEffect } from 'react';

export function usePersistentState<T>(key: string, defaultValue: T): [T, (value: T) => void] {
    const [value, setValue] = useState<T>(defaultValue);

    useEffect(() => {
        const _value = JSON.parse(localStorage.getItem(key) || 'null') as T | null;
        if (_value === null) localStorage.setItem(key, JSON.stringify(defaultValue));
        else setValue(_value as T);
    }, []);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}
