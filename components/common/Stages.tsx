import React, { useState } from "react";

const tabs = [

    "Concept Design",
    "Schematic Design",
    "Detailed Design",

];

export default function Tabs() {
    const [activeIndex, setActiveIndex] = useState(1); // Concept Design active by default

    return (
        <div className="flex   mt-2 pr-1.5 border-b  border-teal-50">
            {tabs.map((tab, idx) => {
                const isActive = idx === activeIndex;
                return (
                    <div
                        style={{
                            transform: "skewX(-16deg)",
                            marginLeft: "0px",

                        }}
                        key={tab}
                        onClick={() => setActiveIndex(idx)}
                        className={`
              relative cursor-pointer select-none
              px-5 py-2 
              pl-10
          transform 
          scaleX(0.9)
          scaleY(0.9)
          duration-500
          ease-in-out
          transition-all
          transform-origin-left
           
                           rounded-tl-3xl
                           rounded-tr-sm
shadow-sm
              text-sm font-medium
       
              ${isActive ? "bg-teal-600 text-white border border-teal-600 border-b-0" : "bg-white text-gray-500 border border-gray-300 border-b-0 hover:text-gray-700"}
            `}
                    >
                        {/* Left triangle pointer */}

                        {tab}
                    </div>
                );
            })}
        </div>
    );
}
