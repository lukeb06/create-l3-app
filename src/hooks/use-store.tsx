'use client';

import React, { createContext, useContext, useState } from 'react';

type StoreContextType = [Record<string, any>, (newState: Record<string, any>) => void];

const StoreContext = createContext<StoreContextType>([{}, () => {}]);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState({});

    const modify = (newState: Record<string, any>) => {
        setState(prev => ({ ...prev, ...newState }));
    };

    return <StoreContext.Provider value={[state, modify]}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
    return useContext(StoreContext);
};
