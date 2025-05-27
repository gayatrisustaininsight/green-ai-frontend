"use client";
import React from "react";
import { Button } from "./Button";

interface GapIssue {
    title: string;
    issue: string;
    suggestion: string;
}

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    fileName: string;
    fileDate: string;
    aiPrompt: string;
    gapIssues: GapIssue[];
    lastUpdated: string;
    buttonText: string;
    onButtonClick: () => void;
    isButtonLoading?: boolean;
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    title,
    fileName,
    fileDate,
    aiPrompt,
    gapIssues,
    lastUpdated,
    buttonText,
    onButtonClick,
    isButtonLoading = false,
}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-60 bg-black/70">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
                <button
                    className="absolute top-4 right-4  text-gray-400 hover:text-gray-600 text-2xl"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
                <div className="mb-2 flex items-center gap-2">
                    <span className="font-semibold text-lg">{title}</span>
                </div>
                <div className="mb-2 text-xs text-blue-600">
                    File: {fileName} (uploaded on {fileDate})
                </div>
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                        <span className="font-medium">AI Prompt</span>
                    </div>
                    <div className="bg-gray-100 rounded p-3 text-sm text-gray-700">
                        {aiPrompt}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1 text-red-500">
                        <span>⚠️</span>
                        <span className="font-medium">Gap Analysis: {gapIssues?.length} Issues Found</span>
                    </div>
                    <div className="bg-gray-50 rounded p-3 text-sm">
                        {gapIssues?.map((issue, idx) => (
                            <div key={idx} className="mb-3 last:mb-0">
                                <div className="font-semibold">{issue.title}</div>
                                <div className="ml-2 text-gray-700">Issue: {issue.issue}</div>
                                <div className="ml-2 text-gray-500">Suggestion: {issue.suggestion}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-xs text-gray-400 mb-4">Last updated: {lastUpdated}</div>
                <div className="flex justify-end">
                    <Button
                        variant="primary"
                        isLoading={isButtonLoading}
                        onClick={onButtonClick}
                    >
                        {buttonText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
