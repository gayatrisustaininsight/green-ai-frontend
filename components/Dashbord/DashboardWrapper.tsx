"use client";
import React, { useState } from "react";
import FileUpload from "../common/FileUpoad";
import Table from "../common/Table";
import ProgressCircle from "../common/ProgressCircle";
import ActivityLog from "../common/ActivityLog";
import ScoreCard from "../common/ScoreCard";
import StorageBar from "../common/StorageBar";
import Tabs from "../common/Stages";
import Stepper from "../common/Stepper";
import { MdOutlineElectricBolt } from "react-icons/md";
import { Button } from "../common/Button";
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
    const [analytics, setAnalytics] = useState<any>(false);
    const handleGetAnalytics = () => {
        setAnalytics(true);
    }
    return (
        <>

            <div className="flex  items-center  gap-4 bg-gray-100  justify-between w-full    pt-3 pr-1.5">
                <div className="w-fit  p-2  mb-10">
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


            <div className="flex flex-col min-h-screen bg-gray-100 rounded-lg m-2 mt-0 shadow-md  p-6 relative">
                <div className="absolute  -top-11 right-0 w-full   z-10">
                    <Tabs />

                </div>
                <div className="flex gap-6 w-full">
                    {/* Left Column */}
                    <div className="flex-1 max-w-sm">
                        <ActivityLog logs={activityLogs} />

                    </div>
                    <div className="max-w-3xl flex-1  w-full">
                        <h4 className="text-lg font-semibold mb-2">Document Validate</h4>
                        <div
                            className="bg-white  flex items-center justify-between   rounded-xl shadow-sm p-6 mb-6 border border-gray-300"
                        >
                            <div className="flex flex-row gap-2 items-center">
                                <div className="font-semibold bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center  text-gray-400">
                                    <MdOutlineElectricBolt />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">{"Construction Indoor Air Quality Management Plan"}</h4>
                                    <span className="text-xs font-semibold text-gray-400">
                                        EAQ Credit 1
                                    </span>
                                </div>
                            </div>

                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">

                            <FileUpload
                                heading="Upload your files"
                                description="Drag & drop your files here or choose files"
                                formats="pdf, docx, xlsx, jpg, png, csv"
                                folderName="Concept Design Documentation"
                            />
                            <div className="font-semibold text-base mt-4 mb-2">All documents</div>
                            <Table headers={tableHeaders} data={tableData} />

                        </div>
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
                <div className="flex justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleGetAnalytics}>Get Analytics</Button>
                </div>
            </div>
        </>
    );
};

export default DashboardWrapper;