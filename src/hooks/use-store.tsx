'use client';

import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext<Object>({});

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState({});

    const modify = (newState: Object) => {
        setState({ ...state, ...newState });
    };

    return (
        <StoreContext.Provider value={[state, modify]}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    return useContext(StoreContext);
};
