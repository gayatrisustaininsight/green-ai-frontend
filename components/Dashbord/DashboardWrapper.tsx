"use client";
import React from "react";
import FileUpload from "../common/FileUplpad";
import Table from "../common/Table";
import ProgressCircle from "../common/ProgressCircle";
import ActivityLog from "../common/ActivityLog";
import ScoreCard from "../common/ScoreCard";
import StorageBar from "../common/StorageBar";
import Tabs from "../common/Stages";

const activityLogs: { message: string; timestamp: string; type: "success" | "error" }[] = [
    { message: "Files Uploaded Successfully", timestamp: "Dec 2, 2024", type: "success" },
    { message: "Corrupt file alert", timestamp: "Dec 2, 2024", type: "error" },
    { message: "Files Uploaded Successfully", timestamp: "Dec 2, 2024", type: "success" },
    { message: "Corrupt file alert", timestamp: "Dec 2, 2024", type: "error" },
    { message: "Files Uploaded Successfully", timestamp: "Dec 2, 2024", type: "success" },
];

const fileTypes = [
    { type: "PDF", color: "#A78BFA", percent: 40 },
    { type: "Word", color: "#F472B6", percent: 20 },
    { type: "Powerpoint", color: "#FBBF24", percent: 15 },
    { type: "Spreadsheet", color: "#34D399", percent: 15 },
    { type: "HTML", color: "#60A5FA", percent: 5 },
    { type: "Compressed", color: "#F87171", percent: 5 },
];

const tableHeaders = ["File name", "Status", "Size", "Last updated"];
const tableData = [
    {
        id: "1",
        name: "File 1.pdf",
        type: "pdf",
        size: "30 MB",
        status: "Complete",
        date: "Dec 2, 2024",
        lastUpdated: "1 min ago",
        owner: { name: "Alex Mack" },
        version: "1.0",
    },
    {
        id: "2",
        name: "File 2.docx",
        type: "docx",
        size: "25 MB",
        status: "Complete",
        date: "Dec 2, 2024",
        lastUpdated: "Nikhil Verma",
        owner: "v1.1",
        version: "Edit",
    },
    {
        id: "3",
        name: "File 3.zip",
        type: "zip",
        size: "15 MB",
        status: "Complete",
        date: "Dec 2, 2024",
        lastUpdated: "Nikhil Verma",
        owner: "v1.2",
        version: "Edit",
    },
];

const DashboardWrapper = () => {
    return (
        <>
            <div className="flex  items-center  gap-4 bg-gray-100  justify-between w-full    pt-3 pr-1.5">
                <div className="w-fit  p-2  ">
                    <h4 className="text-xl  w-fit  font-medium">
                        Concept Design Documentation
                    </h4>
                    <span className="text-sm  p-1 font-medium text-gray-500 rounded-full bg-teal-100 px-2 py-1">
                        BD+C
                    </span>
                    {/* <span className="text-sm  text-gray-500 rounded-full bg-teal-50 px-2 py-1">
                        <span className="text-teal-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        <span className="text-gray-500">
                            Completed
                        </span>
                    </span> */}

                </div>

            </div>


            <div className="flex flex-col min-h-screen bg-white p-6 relative">
                <div className="absolute  -top-11 left-0 w-full h-full  z-10">
                    <Tabs />

                </div>
                <div className="flex gap-6 w-full">
                    {/* Left Column */}
                    <div className="flex-1 max-w-3xl">
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
                            <div className="font-semibold text-lg mb-2">Concept Design Documentation</div>
                            <FileUpload
                                heading="Upload your files"
                                description="Drag & drop your files here or choose files"
                                formats="pdf, docx, xlsx, jpg, png, csv"
                                uploadedCount={6}
                                totalCount={8}
                            />

                            <div className="font-semibold text-base mt-4 mb-2">All documents</div>
                            <Table headers={tableHeaders} data={tableData} />
                            <div className="flex gap-2 mt-4">
                                <button className="bg-[#10B981] text-white px-4 py-2 rounded-lg">Save to Draft</button>
                                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Discard</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 max-w-sm">
                        <ActivityLog logs={activityLogs} />

                    </div>
                    {/* Right Column */}
                    <div className="w-[350px] flex flex-col gap-6">

                        <ScoreCard
                            score={57}
                            maxScore={57}
                            minScore={40}
                            certification="Silver Certification"
                            tips="Insight: view your score and tips to improve"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardWrapper;