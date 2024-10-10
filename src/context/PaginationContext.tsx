import React, { createContext, ReactNode, useContext, useState } from 'react';

interface PaginationContextType {
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const PaginationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    return (
        <PaginationContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </PaginationContext.Provider>
    );
};

export const usePagination = (): PaginationContextType => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error("usePagination must be used within a PaginationProvider");
    }
    return context;
};
