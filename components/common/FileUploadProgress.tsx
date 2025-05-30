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
        <div className="flex items-center justify-center  w-full mb-2 gap-1">
            {/* File icon */}
            {/* File name and size */}
            <Image src={"/icons/Pdf.jpg"} alt="file" width={44} height={44} />
            <div className="flex flex-col items-center gap-1 justify-between   mr-4 ml-2">

                <span
                    title={fileName}
                    className="text-sm text-gray-800 whitespace-nowrap min-w-[100px]  max-w-[100px] truncate">{fileName}</span>
                <span className="text-xs text-gray-500 w-full">{fileSize}</span>
            </div>
            {/* Progress bar */}
            <div className="flex w-full items-center gap-1">
                <div className="w-full min-w-[160px] h-2  rounded-full overflow-hidden">
                    <div
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${100}%` }}
                    />
                </div>
                <span className="text-xs text-gray-500">{100}%</span>
            </div>
            <div className="flex items-center justify-center w-full min-w-min">
                {/* <Button>
                    Validate File
                </Button> */}
            </div>
            {/* Checkmark */}

        </div>
    );
};

export default FileUploadProgress; 