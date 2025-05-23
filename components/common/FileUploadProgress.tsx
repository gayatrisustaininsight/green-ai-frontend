"use client";
import React from "react";

interface FileUploadProgressProps {
    fileName: string;
    fileSize: string;
    fileIcon: React.ReactNode;
    progress: number; // 0-100
    isComplete: boolean;
}

const FileUploadProgress: React.FC<FileUploadProgressProps> = ({
    fileName,
    fileSize,
    fileIcon,
    progress,
    isComplete,
}) => {
    return (
        <div className="flex items-center w-full mb-2">
            {/* File icon */}
            <div className="w-6 h-6 flex items-center justify-center mr-2">
                {fileIcon}
            </div>
            {/* File name and size */}
            <div className="flex flex-col min-w-[120px] mr-4">
                <span className="text-sm text-gray-800 whitespace-nowrap">{fileName}</span>
                <span className="text-xs text-gray-500">{fileSize}</span>
            </div>
            {/* Progress bar */}
            <div className="flex-1 mx-4">
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            {/* Checkmark */}
            <div className="w-6 h-6 flex items-center justify-center">
                {isComplete && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 text-green-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                        />
                    </svg>
                )}
            </div>
        </div>
    );
};

export default FileUploadProgress; 