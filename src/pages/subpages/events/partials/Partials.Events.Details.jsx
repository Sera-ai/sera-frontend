import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../../provider/Provider.State';



const Details = ({ incidentId = "test" }) => {
    const { incidentDetails } = useContext(AppContext)
    const [currentTime, setCurrentTime] = useState(new Date().getTime()); // Add this line


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);
        return () => clearInterval(interval); // Clear the interval when the component unmounts
    }, []);

    const tableData = (data, index, total) => {
        let returnData
        switch (typeof data) {
            case "object": returnData = (data.map((tag) => tag)).join(", "); break;
            case "string": returnData = data; break;
            default: returnData = data; break;
        }

        if (index == 0) {
            return (<span
                className={`inline-flex items-center px-1 py-0.5 text-xs text-white rounded`}
                style={{ backgroundColor: '#ffffff20', color: "#fff" }}
            >
                {formatDate(data)}
            </span>)
        } else if (index == (total - 1) && typeof data == "object") {
            return (
                data.map((tag, index) => (
                    <React.Fragment key={index}>
                        <h2 style={{ color: "#2B84EC" }} className="text-xs text-slate-800 dark:text-slate-100 underline cursor-pointer">
                            {tag}
                        </h2>
                        {index !== data.length - 1 && <span className="px-1 cursor-default"> , </span>}
                    </React.Fragment>
                ))
            );
        } else {
            return returnData
        }
    }

    if (!incidentDetails[incidentId]) {
        return
    }

    return (
        <div className="flex  space-x-10 w-full p-2">
            <div className=" w-full">
                <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Incident Details</h2>

                <table className="table-auto w-full dark:text-slate-300">
                    {/* Table header */}
                    <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 rounded-sm sticky top-0">
                        <tr>
                            <th className="p-2">
                                <div className="font-semibold text-center"></div>
                            </th>
                            <th className="p-2">
                                <div className="font-semibold text-center"></div>
                            </th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                        {Object.keys(incidentDetails[incidentId]["details"]).map((obj, index) => (
                            <React.Fragment key={index}>
                                {/* Rows related to each endpoint under the host */}
                                <tr className="rowItem noborder">
                                    <td className="pr-3">
                                        <div className="flex flex-col">
                                            <div style={{ color: "#ffffff99" }} className="text-slate-800 text-xs dark:text-slate-100">{obj}</div>
                                        </div>
                                    </td>


                                    <td className="p-1">
                                        <div className="flex flex-wrap gap-2">
                                            <div className="text-slate-800 text-xs dark:text-slate-100 flex flex-wrap">{tableData(incidentDetails[incidentId]["details"][obj], index, Object.keys(incidentDetails[incidentId]["details"]).length)}</div>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className=" w-full">
                <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Endpoint Statistics</h2>

                <table className="table-fixed w-full dark:text-slate-300">
                    {/* Table header */}
                    <thead className="text-xs uppercase text-slate-400 dark:text-slate-500  rounded-sm sticky top-0">
                        <tr>
                            <th className="p-2 w-1/3"> {/* Adjust the width as needed */}
                                <div className="font-semibold text-center"></div>
                            </th>
                            <th className="p-2 w-2/3"> {/* The rest of the table space */}
                                <div className="font-semibold text-center"></div>
                            </th>
                        </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                        {Object.keys(incidentDetails[incidentId]["statistics"]).map((obj, index) => (
                            <tr key={index} className=" rowItem noborder">
                                <td className="pr-3">
                                    <div className="flex flex-col">
                                        <div style={{ color: "#ffffff99" }} className="text-slate-800 text-xs dark:text-slate-100">{obj}</div>
                                    </div>
                                </td>
                                <td className="p-1">
                                    <div className="flex flex-wrap gap-2">
                                        <div className="text-slate-800 text-xs dark:text-slate-100 flex flex-wrap">{incidentDetails[incidentId]["statistics"][obj]}</div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>

    )
}

function formatDate(timestamp) {

    const ts = timestamp * 1000
    const date = new Date(ts);

    // Format date to "03 January, 2023"
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(date);

    // Format time to "4:32:01 PM"
    const formattedTime = date.toLocaleTimeString('en-US');

    // Calculate "time ago"
    const now = new Date();
    const diffInSeconds = Math.round((now - date) / 1000);
    let timeAgo;

    if (diffInSeconds < 60) {
        timeAgo = `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 60 * 60) {
        const diffInMins = Math.round(diffInSeconds / 60);
        timeAgo = `${diffInMins} minutes ago`;
    } else if (diffInSeconds < 3600 * 48) {
        const diffInHours = Math.round(diffInSeconds / 3600);
        timeAgo = `${diffInHours} hours ago`;
    } else if (diffInSeconds < 3600 * 24 * 14) {
        const diffInDays = Math.round(diffInSeconds / (3600 * 24));
        timeAgo = `${diffInDays} days ago`;
    } else if (diffInSeconds < 3600 * 24 * 7 * 52) {
        const diffInWeeks = Math.round(diffInSeconds / (3600 * 24 * 7));
        timeAgo = `${diffInWeeks} weeks ago`;
    } else {
        const diffInYears = Math.round(diffInSeconds / (3600 * 24 * 365.25)); // Considering leap years
        timeAgo = `${diffInYears} years ago`;
    }

    return `${formattedDate} ${formattedTime} (${timeAgo})`;
}

export default Details;