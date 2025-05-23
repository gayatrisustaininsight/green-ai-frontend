"use client";
import React from "react";

interface FileType {
    type: string;
    color: string;
    percent: number;
}

interface StorageBarProps {
    used: number;
    total: number;

}

const StorageBar: React.FC<StorageBarProps> = ({ used, total, }) => {
    const percentage = Math.round((used / total) * 100);

    return (
        <div className="w-full space-y-2 my-2">
            {/* Main progress bar */}
            <div className="flex items-center justify-start gap-5 ">
                <h6 className="text-sm text-gray-600">{"File Management"}</h6>
                <div className="w-full max-w-sm h-3 bg-gray-200 rounded-full overflow-hidden">

                    <div
                        className="h-full bg-blue-500 transition-all duration-300 ease-in-out"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <span className="text-sm text-gray-600">{percentage}%</span>


            </div>
            {/* File type distribution */}
            {/* <div className="flex gap-2">
                {fileTypes.map((fileType, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-1"
                    >
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: fileType.color }}
                        />
                        <span className="text-sm text-gray-600">
                            {fileType.type} ({fileType.percent}%)
                        </span>
                    </div>
                ))}
            </div> */}

            {/* Storage usage text */}
            <div className="text-sm text-gray-600">
                {used}MB of {total}MB used ({percentage}%)
            </div>
        </div>
    );
};

export default StorageBar; 