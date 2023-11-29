import React, { useState, useContext } from 'react';
import { AppContext } from '../provider/Provider.State';


function PluginComponent({ endpoint }) {

    const { availablePlugins } = useContext(AppContext)

    const enabled = (<svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
        <path d="M4.25 0H0.5V10H4.25V0ZM6.75 10H10.5V0H6.75V10Z" fill="white" />
    </svg>)

    const disabled = (<svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
        <path d="M10.8712 8.65352L4.90594 12.1148C4.39969 12.4082 3.75 12.0529 3.75 11.4613V4.53883C3.75 3.94821 4.39875 3.59196 4.90594 3.88633L10.8712 7.34758C10.9864 7.41332 11.0821 7.50835 11.1487 7.62303C11.2153 7.7377 11.2504 7.86795 11.2504 8.00055C11.2504 8.13315 11.2153 8.2634 11.1487 8.37808C11.0821 8.49275 10.9864 8.58778 10.8712 8.65352Z" fill="white" />
    </svg>)

    const toggleOption = (optionName) => {
        // Toggle the enabled status for the clicked option
        const newOptions = availablePlugins[endpoint].map(option => {
            if (option.name === optionName) {
                return { ...option, enabled: !option.enabled };
            }
            return option;
        });
        //setOptions(newOptions);
    }

    if (!availablePlugins[endpoint]) {
        return null
    }


    return (
        <div className="py-4 rounded-md">
            {availablePlugins[endpoint].map((option, index) => (
                <div
                    key={index}
                    className={`flex items-center py-2 px-3 ${index === 0 ? "border-t border-l border-r rounded-t-lg" : index === (availablePlugins[endpoint].length - 1) ? "rounded-b-lg border-b border-l border-r" : "border"} border-slate-200 dark:border-slate-700 cursor-pointer`}
                    onClick={() => toggleOption(option.name)}
                >
                    <div style={{ backgroundColor: option.enabled ? "#2B84EC" : "#1A1C20", height: 30, width: 30 }} className={` flex justify-center items-center rounded-md mr-4`}>{option.enabled ? enabled : disabled}</div>
                    <div className="flex-1">
                        <p className="font-medium text-xs">{option.name}</p>
                        <p className="text-gray-300  text-xs">{option.enabled ? "Enabled" : "Disabled"}</p>
                    </div>
                </div>
            ))}
        </div >
    );
}

export default PluginComponent