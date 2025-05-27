"use client";

import React from "react";

const activities = [
    {
        status: "Files Uploaded Successfully",
        date: "Dec 2, 2024",
        type: "success",
    },
    {
        status: "Corrupt file alert",
        date: "Dec 2, 2024",
        type: "error",
    },
    {
        status: "Corrupt file alert",
        date: "Dec 2, 2024",
        type: "error",
    },
    {
        status: "Files Uploaded Successfully",
        date: "Dec 2, 2024",
        type: "success",
    },
    {
        status: "Corrupt file alert",
        date: "Dec 2, 2024",
        type: "error",
    },
    {
        status: "Corrupt file alert",
        date: "Dec 2, 2024",
        type: "error",
    },

];

const iconClass = (type: string) =>
    type === "success"
        ? "text-blue-400 border-blue-400"
        : "text-purple-400 border-purple-400";

const Activity = () => {
    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Activity Log</h2>
            <div className=" rounded-xl shadow border border-gray-200  p-6  x-h-[500px] overflow-y-auto">
                <ol className="relative border-l border-gray-200 ml-4">
                    {activities.map((activity, idx) => (
                        <li className="mb-8 ml-6" key={idx}>
                            <span
                                className={`absolute flex items-center justify-center w-8 h-8 bg-white rounded-full -left-4 ring-4 ring-white border ${iconClass(
                                    activity.type
                                )}`}
                            >
                                {/* Info Icon SVG */}
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16v-4m0-4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9Z"
                                    ></path>
                                </svg>
                            </span>
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-900 text-sm">
                                    {activity.status}
                                </span>
                                <span className="text-xs text-gray-400 mt-1">
                                    {activity.date}
                                </span>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Activity;
