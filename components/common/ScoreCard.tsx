"use client";
import React from "react";
import ProgressCircle from "./ProgressCircle";
import { Button } from "./Button";

interface ScoreCardProps {
    score: number;
    maxScore: number;
    minScore: number;
    certification: string;
    tips?: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, maxScore, minScore, certification, tips }) => {
    return (
        <div className="bg-white rounded-tl-2xl  gap- p-4 flex flex-col items-center border border-gray-100">

            <ProgressCircle
                size={120}
                percent={score}
                color="#34D399"
            />
            <div className="text-4xl font-bold text-gray-700 mb-1">{score}</div>
            <div className="text-sm text-gray-500 mb-2">LEEDS Score</div>
            <div className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold mb-2">{certification}</div>
            <div className="flex gap-2 mb-2">
                <button className="text-xs text-blue-600 underline">View Report</button>
                <button className="text-xs text-green-600 underline">Get Report</button>
            </div>
            <div className="text-xs text-gray-400 mb-1">highest score during the reporting period: <span className="font-semibold text-gray-700">{maxScore}</span></div>
            <div className="text-xs text-gray-400 mb-2">lowest score during the reporting period: <span className="font-semibold text-gray-700">{minScore}</span></div>
            {tips && (
                <div className="bg-blue-50 text-blue-700 text-xs rounded p-2 mt-2 w-full text-center">{tips}</div>
            )}
            <div className="flex flex-row items-center gap-2 mt-4 mb-10">
                <Button variant="primary">
                    Generate Report
                </Button>
            </div>
        </div>
    );
};

export default ScoreCard; 