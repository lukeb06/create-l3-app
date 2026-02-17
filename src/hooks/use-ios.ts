'use client';

import { useState, useEffect } from 'react';

export function useIOS() {
    const [value, setValue] = useState(false);

    useEffect(() => {
        setValue(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);
    }, []);

    return value;
}
