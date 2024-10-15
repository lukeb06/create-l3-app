'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

const LocalStorageContext = createContext<any>([{}, () => {}]);

export const LocalStorageProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [state, setState] = useState({});

    useEffect(() => {
        const storage = localStorage.getItem('state');
        if (storage) {
            setState(JSON.parse(storage));
        }
    }, []);

    const modify = (newState: Object) => {
        const updatedState = { ...state, ...newState };
        localStorage.setItem('state', JSON.stringify(updatedState));
        setState(updatedState);
    };

    return (
        <LocalStorageContext.Provider value={[state, modify]}>
            {children}
        </LocalStorageContext.Provider>
    );
};

export const useLocalStorage = () => {
    return useContext(LocalStorageContext);
};
