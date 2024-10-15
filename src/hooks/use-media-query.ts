'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(_query: 'sm' | 'md' | 'lg' | 'xl' | 'xxl') {
    const [matches, setMatches] = useState(
        window.matchMedia(query[_query]).matches
    );

    useEffect(() => {
        const media = window.matchMedia(_query);
        media.onchange = (e) => setMatches(e.matches);

        return () => {
            media.onchange = null;
        };
    }, [_query]);

    return matches;
}

export const query = {
    sm: `(min-width: 640px)`,
    md: `(min-width: 768px)`,
    lg: `(min-width: 1024px)`,
    xl: `(min-width: 1280px)`,
    xxl: `(min-width: 1536px)`,
};
