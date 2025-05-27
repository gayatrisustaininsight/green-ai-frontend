"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import StorageBar from "./StorageBar";
import FileUploadProgress from "./FileUploadProgress";
import { Button } from "./Button";
import axios from 'axios';
import { useFileContext } from "@/context/FileContext";

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
    isAnalytics?: boolean;
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
    isAnalytics,
    maxFiles,
    error: errorProp,
    uploadedCount,
    totalCount,
    folderName = "OCR_Upload",
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | undefined>(errorProp);
    const [isUploading, setIsUploading] = useState(false);
    const [fileProgress, setFileProgress] = useState<FileProgress[]>([]);
    const { files, setFiles } = useFileContext();

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

            // Initialize progress for each file
            const initialProgress = files.map(file => ({
                name: file.name,
                size: formatFileSize(file.size),
                progress: 0,
                isComplete: false
            }));
            setFileProgress(initialProgress);

            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
            if (!backendUrl) {
                throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined');
            }

            // Create FormData and append all files
            const formData = new FormData();
            files.forEach(file => {
                formData.append('files', file);
            });

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent: { loaded: number; total: number }) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        // Update progress for all files since we're uploading them together
                        setFileProgress(prev => prev.map(f => ({
                            ...f,
                            progress: progress
                        })));
                    }
                }
            };

            const res = await axios.post(`${backendUrl}/upload/${folderName}`, formData, config);
            console.log(res, "RES");
            setFiles(res?.data?.data);


            // Mark all files as complete after successful upload
            setFileProgress(prev => prev.map(f => ({
                ...f,
                progress: 100,
                isComplete: true
            })));

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
        <div className={`w-full   flex  gap-6  ${isAnalytics ? "flex-row" : "flex-col"}`}>
            <div

                className={`w-full    mt-2 ${dragActive ? "border-blue-400" : ""} ${isAnalytics ? "max-w-[250px]" : "flex items-center  w-full mx-auto"}`}

            >
                <div
                    className={`border-2 p-4 border-dashed w-full ${dragActive ? "border-blue-400" : "border-teal-300"} rounded-lg bg-white px-6 py-6 flex items-center justify-center transition-colors duration-200 relative`}
                    onClick={openFileDialog}
                >
                    <div className="flex items-center justify-center w-full gap-4 " style={
                        isAnalytics ? {
                            flexDirection: "column"
                        } : {
                            flexDirection: "row"
                        }
                    }>
                        <div className="flex-shrink-0">
                            <Image src="/icons/FileUplaod.png" alt="folder" width={!isAnalytics ? 100 : 58} height={!isAnalytics ? 100 : 58} />
                        </div>
                        <div className="flex flex-col gap-2 justify-center" style={
                            isAnalytics ? {
                                alignItems: "center"
                            } : {
                                alignItems: "flex-start"
                            }
                        }>
                            <h4 className="text-sm font-semibold text-gray-500 w-full" style={
                                isAnalytics ? {
                                    textAlign: "center"
                                } : {
                                    textAlign: "left"
                                }
                            }>
                                {heading}
                            </h4>
                            <button className="text-sm bg-teal-500 text-white max-w-min px-5 py-1 rounded-full font-medium">Browse</button>
                            <div className="text-xs relative text-gray-400 text-center flex items-center mt-1">
                                Supported formats: {formats}
                                <svg className="absolute -right-1.5 top-0 w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
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
                </div>

                {typeof uploadedCount === "number" && typeof totalCount === "number" && !error && !errorProp && (
                    <div className="mt-2 text-blue-600 text-sm">
                        <span>🔵 {uploadedCount} of {totalCount} files uploaded</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 w-full  overflow-y-auto">
                <h4 className="text-sm font-semibold text-gray-500 w-full">
                    Recently Uploaded
                </h4>
                <div className="flex flex-col gap-2 mt-1 w-full max-h-[180px] overflow-y-auto">
                    {
                        fileProgress.length < 1 && (
                            <div className="w-full mt-1 h-full    bg-gray-100 rounded-lg p-4 text-center ">
                                <p className="text-sm text-gray-500 w-full">No files uploaded yet</p>
                            </div>
                        )
                    }

                    {fileProgress.length > 0 && (
                        <div className="w-full ">
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
                {
                    fileProgress.length > 0 && (
                        <div className="w-full flex justify-end mt-2">

                            <Button
                                variant="primary"

                            >
                                Execute
                            </Button>
                        </div>
                    )}
            </div>


        </div>
    );
};

export default FileUpload;