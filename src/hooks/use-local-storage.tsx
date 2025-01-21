'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

const LocalStorageContext = createContext<any>([{}, () => { }]);

export const LocalStorageProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const storage = localStorage || { getItem: () => null, setItem: () => null };
    const _state = localStorage.getItem('state') || '{}';
    const initialState = storage ? JSON.parse(_state) : {};
    const [state, setState] = useState(initialState);

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
