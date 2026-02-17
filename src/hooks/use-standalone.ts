'use client';

import { useState, useEffect } from 'react';

export function useStandalone() {
    const [value, setValue] = useState(false);

    useEffect(() => {
        setValue(window.matchMedia('(display-mode: standalone)').matches);
    }, []);

    return value;
}
