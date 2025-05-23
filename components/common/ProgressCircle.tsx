"use client";
import React from "react";

interface ProgressCircleProps {
    percent: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    label?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
    percent,
    size = 120,
    strokeWidth = 10,
    color = "#10B981",
    label,
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center">
            <svg width={size} height={size} className="block">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    className="fill-gray-700 text-2xl font-bold"
                >
                    {percent}%
                </text>
            </svg>
            {label && <div className="mt-2 text-gray-500 text-sm">{label}</div>}
        </div>
    );
};

export default ProgressCircle; 