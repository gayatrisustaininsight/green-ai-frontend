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
import Activity from "../common/Acitivity";
import Modal from "../common/Modal";
import { FileProvider, useFileContext } from "@/context/FileContext";

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

const tableHeaders = ["File name", "Status", "Last updated"];


const DashboardWrapper = () => {
    const [analytics, setAnalytics] = useState<any>(false);
    const [open, setOpen] = useState(false);
    const { files } = useFileContext();
    console.log(files, "FILES");
    const handleGetAnalytics = () => {
        setAnalytics(true);
    }

    const handleGenerateReport = () => {
        setOpen(true);
    }
    return (
        <FileProvider>
            <div className="flex flex-col min-h-screen bg-slate-100  shadow-md  ">
                <div className="flex  items-center  gap-4 bg-slate-100  justify-between w-full    pt-3 pr-1.5">
                </div>

                <div className="flex flex-col min-h-screen bg-slate-100  m-2 mt-8   p-6 relative">
                    <div className="absolute  -top-11 right-0 w-full   z-10">
                        <Tabs />
                    </div>
                    <div className="flex gap-6 w-full bg-gray-100 rounded-lg h-full shadow-md p-4">
                        {analytics ? (
                            <div className="flex-1 max-w-sm min-w-sm h-full  ">
                                <ActivityLog logs={activityLogs} />
                            </div>
                        ) : (
                            <></>
                        )}

                        <div className="w-full"
                            style={
                                analytics ? {
                                    marginRight: "60px"
                                } : {
                                    marginRight: "0px"
                                }
                            }
                        >
                            <h4 className="text-lg font-semibold mb-2">Document Validate</h4>

                            <div className="bg-white/50 rounded-xl shadow-sm p-6 mb-6  w-full  border border-gray-100">
                                <FileUpload
                                    isAnalytics={analytics}
                                    heading="Upload your files"
                                    description="Drag & drop your files here or choose files"
                                    formats="pdf, docx, xlsx, jpg, png, csv"
                                    folderName="Concept Design Documentation"
                                />
                                <div className="font-semibold text-base mt-4 mb-2">All documents</div>
                                <Table headers={tableHeaders} />
                            </div>
                        </div>

                        <div className={` flex  max-w-xl h-full   flex-col gap-6 ${analytics ? "w-[350px]" : "w-full"}`}>
                            {analytics ? (
                                <div className="absolute top-0    h-full  right-0  shadow-2xl rounded-tl-xl rounded-bl-xl ">
                                    <ScoreCard
                                        score={57}
                                        maxScore={57}
                                        onClick={handleGenerateReport}
                                        minScore={40}
                                        certification="Silver Certification"
                                        tips="Insight: view your score and tips to improve"
                                    />
                                </div>
                            ) : (
                                <>
                                    <Activity />
                                    <div className="flex justify-end">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleGetAnalytics}>Get Analytics</Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <Modal
                    aiPrompt=""
                    buttonText=""
                    fileName=""
                    fileDate=""
                    gapIssues={[]}
                    lastUpdated=""
                    onButtonClick={() => { }}
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Upload your files"
                >
                </Modal>
            </div>
        </FileProvider>
    );
};

export default DashboardWrapper;