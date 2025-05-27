"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FileData {
    name: string;
    url: string;
    lastModified: string;
}

interface FileContextType {
    files: FileData[];
    setFiles: (files: FileData[]) => void;
    addFile: (file: FileData) => void;
    removeFile: (name: string) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [files, setFiles] = useState<FileData[]>([]);

    const addFile = (file: FileData) => {
        setFiles(prev => [...prev, file]);
    };

    const removeFile = (name: string) => {
        setFiles(prev => prev.filter(file => file.name !== name));
    };

    return (
        <FileContext.Provider value={{ files, setFiles, addFile, removeFile }}>
            {children}
        </FileContext.Provider>
    );
};

export const useFileContext = () => {
    const context = useContext(FileContext);
    if (context === undefined) {
        throw new Error('useFileContext must be used within a FileProvider');
    }
    return context;
}; 