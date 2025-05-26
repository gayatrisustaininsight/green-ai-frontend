"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import StorageBar from "./StorageBar";
import FileUploadProgress from "./FileUploadProgress";

interface FileUploadProps {
    heading: string;
    description: string;
    formats: string;
    onFilesChange?: (files: FileList) => void;
    maxFiles?: number;
    error?: string;
    uploadedCount?: number;
    totalCount?: number;
    folderName: string;
}

interface FileProgress {
    name: string;
    size: string;
    progress: number;
    isComplete: boolean;
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
    folderName,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | undefined>(errorProp);
    const [isUploading, setIsUploading] = useState(false);
    const [fileProgress, setFileProgress] = useState<FileProgress[]>([]);

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const uploadFiles = async (files: File[]) => {
        try {
            setIsUploading(true);
            const formData = new FormData();

            // Initialize progress for each file
            const initialProgress = files.map(file => ({
                name: file.name,
                size: formatFileSize(file.size),
                progress: 0,
                isComplete: false
            }));
            setFileProgress(initialProgress);

            // Upload each file separately to track individual progress
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const singleFileFormData = new FormData();
                singleFileFormData.append('file', file);

                const xhr = new XMLHttpRequest();

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const progress = Math.round((event.loaded / event.total) * 100);
                        setFileProgress(prev => prev.map((f, idx) =>
                            idx === i ? { ...f, progress } : f
                        ));
                    }
                };

                await new Promise((resolve, reject) => {
                    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

                    if (!backendUrl) {
                        throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined');
                    }

                    xhr.open('POST', `${backendUrl}/api/upload/${folderName}`);

                    xhr.onload = () => {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            setFileProgress(prev => prev.map((f, idx) =>
                                idx === i ? { ...f, progress: 100, isComplete: true } : f
                            ));
                            resolve(JSON.parse(xhr.response));
                        } else {
                            reject(new Error(xhr.response));
                        }
                    };

                    xhr.onerror = () => reject(new Error('Network error'));
                    xhr.send(singleFileFormData);
                });
            }

            return { success: true };
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Upload failed');
            throw error;
        } finally {
            setIsUploading(false);
        }
    };

    const handleFiles = async (files: FileList) => {
        let fileArr = Array.from(files);
        if (maxFiles && fileArr.length > maxFiles) {
            setError(`You can only upload up to ${maxFiles} files.`);
            return;
        }
        setError(undefined);
        setSelectedFiles(fileArr);

        try {
            await uploadFiles(fileArr);
            onFilesChange && onFilesChange(files);
        } catch (error) {
            console.error('Upload error:', error);
        }
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
        <div className="w-full   flex flex-row gap-4  ">
            <div

                className={`w-full max-w-[250px]   mt-2 ${dragActive ? "border-blue-400" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div
                    className={`border-2 p-4 border-dashed   ${dragActive ? "border-blue-400" : "border-teal-300"} rounded-lg bg-white px-6 py-6 flex flex-row items-center transition-colors duration-200 relative`}
                    onClick={openFileDialog}
                >
                    {isUploading && (
                        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                            <div className="text-blue-600">Uploading...</div>
                        </div>
                    )}
                    <div className="flex flex-col items-center w-full">
                        <div className="flex-shrink-0 mr-4">
                            <Image src="/icons/FileUplaod.png" alt="folder" width={58} height={58} />
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center mt-10 ">
                            <button className="text-sm bg-teal-500 text-white px-5 py-1 rounded-full font-medium text-center">Browse</button>

                            <div className="text-xs text-gray-400 flex items-center mt-1">
                                Supported formats: {formats}
                                <svg className="ml-1 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                            </div>
                        </div>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept={formats}
                        className="hidden"
                        onChange={handleInputChange}
                    />

                    {/* File Progress List */}

                </div>

                {typeof uploadedCount === "number" && typeof totalCount === "number" && !error && !errorProp && (
                    <div className="mt-2 text-blue-600 text-sm">
                        <span>🔵 {uploadedCount} of {totalCount} files uploaded</span>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2 mt-2 w-full">
                <h4 className="text-sm font-semibold text-gray-500 w-full">
                    Recently Uploaded
                </h4>

                {fileProgress.length > 0 && (
                    <div className="w-full mt-4  ">
                        {fileProgress.map((file, index) => (
                            <FileUploadProgress
                                key={index}
                                fileName={file.name}
                                fileSize={file.size}
                                fileIcon={
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                }
                                progress={file.progress}
                                isComplete={file.isComplete}
                            />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default FileUpload;