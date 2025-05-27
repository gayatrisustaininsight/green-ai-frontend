"use client";
import React from "react";

const steps = [
    { label: "Document Validate" },
    { label: "Pre-requisite" },
    { label: "Score Analysis" },
    { label: "Recommendation" },
];

export default function Stepper({ currentStep = 0 }: { currentStep?: number }) {
    return (
        <div className="flex flex-col items-center  py-4 rounded-md">
            <div className="flex items-center w-full max-w-2xl justify-between">
                {steps.map((step, idx) => (
                    <React.Fragment key={step.label}>
                        <div className="flex flex-col items-center flex-1">
                            <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mb-1
                  ${idx === currentStep
                                        ? "border-green-500 bg-green-100"
                                        : idx < currentStep
                                            ? "border-green-500 bg-green-500"
                                            : "border-gray-300 bg-white"}
                `}
                            >
                                {idx < currentStep ? (
                                    <span className="w-2 h-2 bg-green-500 rounded-full block"></span>
                                ) : idx === currentStep ? (
                                    <span className="w-2 h-2 bg-green-500 rounded-full block"></span>
                                ) : null}
                            </div>
                            <span
                                className={`text-xs text-center  font-semibold ${idx === currentStep
                                    ? "text-gray-700"
                                    : "text-gray-400"
                                    }`}
                            >
                                {step.label}
                            </span>
                        </div>
                        {idx !== steps.length - 1 && (
                            <div className="flex-1 h-0.5 bg-gray-200 " />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
