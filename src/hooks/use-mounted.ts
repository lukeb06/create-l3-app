'use client';

import { useState, useEffect } from 'react';

export function useMounted() {
    const [value, setValue] = useState(false);

    useEffect(() => {
        setValue(true);
    }, []);

    return value;
}
