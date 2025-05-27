"use client"
import Image from 'next/image'
import React from 'react'
import { useFileContext } from '@/context/FileContext'

interface FileData {
    name: string;
    url: string;
    lastModified: string;
    size: number;
}

const statusIcons: Record<string, JSX.Element> = {
    Error: (
        <span className="text-red-500 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" /><line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2" /></svg>
            Error
        </span>
    ),
    Complete: (
        <span className="text-green-500 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><polyline points="9 12 12 15 15 10" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
            Complete
        </span>
    ),
}

const fileTypeIcons: Record<string, string> = {
    pdf: '/file.svg',
    docx: '/file.svg',
    zip: '/file.svg',
    png: '/file.svg',
}

const Table = ({ headers }: { headers: string[] }) => {
    const { files } = useFileContext();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        files.length > 0 ? (
            <div className="rounded-xl border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="p-3 border-b border-gray-200">
                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                </th>
                                {headers.map((header, index) => (
                                    <th
                                        key={index}
                                        className="p-3 border-b border-gray-200 text-sm font-semibold text-gray-600"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="overflow-y-auto max-h-[300px]">
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-gray-200">
                            {files.map((file, idx) => (
                                <tr key={file.name} className="bg-white hover:bg-gray-50 transition-colors duration-200">
                                    <td className="p-3">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    </td>
                                    <td className="flex items-center gap-3 p-2">
                                        <div className='flex flex-col gap-1 max-w-[150px] truncate' title={file.name}>
                                            <div className="font-medium text-sm text-gray-900">{file.name}</div>
                                            <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                                        </div>
                                    </td>
                                    <td className="p-2">{statusIcons['Complete']}</td>
                                    <td className="p-2 text-sm text-gray-600">{formatDate(file.lastModified)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        ) : (
            <div className="flex justify-center items-center h-full w-full bg-gray-100 rounded-lg p-4 mt-4 text-gray-500">
                <p className="text-gray-500">No files uploaded yet</p>
            </div>
        )
    )
}

export default Table