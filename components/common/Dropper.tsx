"use client"
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MdOutlineElectricBolt } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";

const optins = [{
    label: "Indoor Environmental Quality (IEQ)",
    id: 1,
    subLabels: [
        {
            label: "Low-Emitting Materials",
            value: 1
        },
        {
            label: "LEED Credit 2",
            value: 2
        },
        {
            label: "LEED Credit 3",
            value: 3
        }
    ]
}];

const Dropper = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<any>(null);

    const handleSelect = (option: any) => {
        setIsOpen(!isOpen);
        setSelected(option as any);
    }

    return (
        optins.map((option, idx) => (
            <div className="w-full relative flex flex-col shadow-sm  gap-2 py-4 px-2.5 border border-gray-200 rounded-lg">
                <div className="w-full justify-between items-center flex flex-row gap-2">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="font-semibold bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center  text-gray-400">
                            <MdOutlineElectricBolt />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-gray-500">{option?.label}</h4>
                            <span className="text-xs font-semibold text-gray-400">
                                EAQ Credit 1
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-between">
                        <span className="text-sm text-gray-500">1/1</span>
                        <div
                            onClick={() => handleSelect(option)}
                            className="w-8 h-8 rounded-full transition-all duration-300 hover:bg-teal-500 hover:border-teal-500 bg-teal-500 border border-gray-200 flex items-center justify-center">
                            {isOpen ? <FaAngleUp className="text-white" /> : <FaAngleDown className="text-white" />}
                        </div>
                    </div>
                </div>
                <div className={`overflow-hidden transition-all duration-300 e ${selected?.id === option?.id && isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="w-full flex flex-col gap-2">
                        {option?.subLabels?.map((subLabel, idx) => (
                            <div key={idx} className="border-b transition-all duration-300 transform hover:bg-teal-50 cursor-pointer border-gray-200 p-2">{subLabel.label}</div>
                        ))}
                    </div>
                </div>
            </div>
        ))
    )
}

export default Dropper;