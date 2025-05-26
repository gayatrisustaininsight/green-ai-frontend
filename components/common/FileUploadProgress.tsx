"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./Button";

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
        <div className="flex items-center w-full mb-2 gap-1">
            {/* File icon */}
            {/* File name and size */}
            <Image src={"/icons/Pdf.jpg"} alt="file" width={44} height={44} />
            <div className="flex flex-col items-center gap-1   mr-4">

                <span
                    title={fileName}
                    className="text-sm text-gray-800 whitespace-nowrap max-w-[70px] truncate">{fileName}</span>
                <span className="text-xs text-gray-500">{fileSize}</span>
            </div>
            {/* Progress bar */}
            <div className=" w-[160px] min-w-[150px]">
                <div className="w-full h-2  rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${100}%` }}
                    />
                    <span className="text-xs text-gray-500">{100}%</span>
                </div>
            </div>
            <div className="flex items-center justify-center w-full min-w-min">
                <Button>
                    Validate File
                </Button>
            </div>
            {/* Checkmark */}

        </div>
    );
};

export default FileUploadProgress; 