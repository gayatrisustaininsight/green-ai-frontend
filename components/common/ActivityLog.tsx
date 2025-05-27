"use client";
import React from "react";
import { Button } from "./Button";
import Dropper from "./Dropper";

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
        <div className="bg-white rounded-xl shadow-sm p-4 h-[400px] overflow-y-auto border border-gray-100">
            <div className="flex items-center justify-between  mb-6">
                <div className="flex flex-col gap-1" >

                    <div className="font-semibold text-gray-700 ">LEED Category </div>
                    <div className="text-blue-500 text-xs font-semibold   ">
                        Total 10 Credit
                    </div>
                </div>


            </div>
            <ul className="space-y-3">
                <Dropper />
            </ul>
        </div>
    );
};

export default ActivityLog; 