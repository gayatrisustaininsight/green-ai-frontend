"use client";
import React from "react";

interface ActivityLogItem {
    message: string;
    timestamp: string;
    type?: "success" | "error";
}

interface ActivityLogProps {
    logs: ActivityLogItem[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
    return (
        <div className="bg-slate-100 rounded-xl shadow-sm p-4 h-[400px] overflow-y-auto border border-gray-100">
            <div className="font-semibold text-gray-700 mb-2">Missing Parameter </div>
            <ul className="space-y-3">
                {logs.map((log, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className={`mt-1 w-4 h-4 flex items-center justify-center rounded-full ${log.type === "error" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"}`}>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />

                                <line x1="12" y1="8" x2="12" y2="13" stroke="currentColor" strokeWidth="2" />

                            </svg>
                        </span>
                        <div className="flex-1">
                            <div className="text-gray-700">{log.message}</div>
                            <div className="text-gray-400 text-xs">{log.timestamp}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityLog; 