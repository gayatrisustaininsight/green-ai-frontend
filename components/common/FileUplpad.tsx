"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

interface FileUploadProps {
    heading: string;
    description: string;
    formats: string;
    onFilesChange?: (files: FileList) => void;
    maxFiles?: number;
    error?: string;
    uploadedCount?: number;
    totalCount?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
    heading,
    description,
    formats,
    onFilesChange,
    maxFiles,
    error: errorProp,
    uploadedCount,
    totalCount,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | undefined>(errorProp);

    const handleFiles = (files: FileList) => {
        let fileArr = Array.from(files);
        if (maxFiles && fileArr.length > maxFiles) {
            setError(`You can only upload up to ${maxFiles} files.`);
            return;
        }
        setError(undefined);
        setSelectedFiles(fileArr);
        onFilesChange && onFilesChange(files);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            className={`w-full mt-2 ${dragActive ? "border-blue-400" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className={`border-2 border-dashed ${dragActive ? "border-blue-400" : "border-teal-300"} rounded-lg bg-white px-6 py-6 flex flex-col items-center transition-colors duration-200 relative`}>
                <div className="flex items-center w-full">
                    {/* Folder Icon */}
                    <div className="flex-shrink-0 mr-4">
                        <Image src="/icons/FileUplaod.png" alt="folder" width={58} height={58} />
                    </div>
                    <div className="flex-1">
                        <div className="font-medium text-gray-700 text-base mb-1">Upload your files</div>
                        <div className="text-gray-500 text-sm">
                            Drag & drop your files here or{' '}
                            <span className="text-blue-600 underline cursor-pointer font-medium" onClick={openFileDialog}>choose files</span>
                        </div>
                        <div className="text-xs text-gray-400 flex items-center mt-1">
                            Supported formats: {formats}
                            <svg className="ml-1 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                        </div>
                    </div>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple={true}
                    className="hidden"
                    onChange={handleInputChange}
                />
                {selectedFiles.length > 0 && (

                    <ul className="mt-4 w-full text-sm text-gray-600">
                        {selectedFiles.map((file, idx) => (
                            <li key={idx} className="truncate">{file.name}</li>
                        ))}
                    </ul>
                )}
            </div>

            {typeof uploadedCount === "number" && typeof totalCount === "number" && !error && !errorProp && (
                <div className="mt-2 text-blue-600 text-sm">
                    <span>🔵 {uploadedCount} of {totalCount} files uploaded</span>
                </div>
            )}
        </div>
    );
};

export default FileUpload;