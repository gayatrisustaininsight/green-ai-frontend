"use client"
import Image from 'next/image'
import React, { type JSX } from 'react'

interface FileData {
    id: string
    name: string
    type: string // e.g. 'pdf', 'docx', 'zip'
    size: string
    status: 'Error' | 'Complete'
    date: string
    lastUpdated: string
    owner: { name: string; avatar?: string }
    version: string
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
}

const Table = ({ headers, data }: { headers: string[], data: FileData[] }) => {
    return (
        <table className="w-full text-left">
            <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 px-3 border-gray-300 border-2 rounded-tl-2xl"><input type="checkbox" /></th>
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            className={`p-2 px-3 border-gray-300 border-2 text-sm text-gray-600 ${index === headers.length - 1 ? 'rounded-tr-2xl' : ''}`}
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {data.map((row, idx) => (
                    <tr key={row.id} className="bg-white  hover:bg-gray-50 transition rounded-b-2xl border-b-2   border-l-2  border-r-2 border-gray-200 ">
                        <td className="p-2 px-3 "><input type="checkbox" /></td>
                        <td className="flex items-center gap-2 p-2 px-3">
                            {/* <Image src={fileTypeIcons[row.type] || '/file.svg'} alt={row.type} width={32} height={32} /> */}
                            <div>
                                <div className="font-medium">{row.name}</div>
                                <div className="text-xs text-gray-400">{row.size}</div>
                            </div>
                        </td>
                        <td className="p-2 px-3">{statusIcons[row.status]}</td>
                        <td className="p-2 px-3">{row.date}</td>
                        <td className="p-2 px-3 rounded-b-2xl">{row.lastUpdated}</td>


                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table