import React, { useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import JsonViewer from './Issues.JsonViewer';
import JsonDiff from './Issues.JsonDiff';
import { AppContext } from '../../provider/Provider.State';

const VerticalTimeline = ({ incidentId = "test" }) => {
    const { incidentDetails } = useContext(AppContext)

    if (!incidentDetails[incidentId]?.eventLog) {
        return
    }

    return (
        <Chrono
            items={incidentDetails[incidentId].eventLog}
            mode="VERTICAL"
            titleDateFormat={"HH:mm:ss.SSS"}
            hideControls
            cardHeight={10}
            fontSizes={{
                cardSubtitle: '0.85rem',
                cardText: '0.8rem',
                cardTitle: '1rem',
                title: '0.8rem',
            }}
            theme={{
                primary: "#ffffff",
                secondary: "#ffffff00",
                cardBgColor: "#24243100",
                cardForeColor: "violet",
                titleColor: "#ffffff70",
                titleColorActive: "#ffffff",
                cardSubtitleColor: "#ffffff",
                cardTitleColor: "#ffffff"
            }}
        >
            {GetArrayItems(incidentDetails[incidentId].eventLog)}
        </Chrono>
    );
};

export default VerticalTimeline;


const eventDetail = (item, end) => {
    return (
        <div className={`mainDark rounded-lg m-2 p-4 space-y-4 detailsActionContainer w-full ${item.flag ? "flagged" : ""}`}>

            <div className="text-sm font-medium space-x-3 flex items-center w-full">
                {end ?
                    (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                        <path d="M8.00001 14.6666C7.07779 14.6666 6.21112 14.4915 5.40001 14.1413C4.5889 13.791 3.88334 13.3161 3.28334 12.7166C2.68334 12.1166 2.20845 11.411 1.85868 10.5999C1.5089 9.78881 1.33379 8.92214 1.33334 7.99992C1.33334 7.64436 1.36112 7.28881 1.41668 6.93325C1.47223 6.5777 1.55557 6.2277 1.66668 5.88325C1.72223 5.70547 1.83623 5.58614 2.00868 5.52525C2.18112 5.46436 2.3449 5.47814 2.50001 5.56659C2.66668 5.65547 2.78601 5.78614 2.85801 5.95859C2.93001 6.13103 2.93845 6.31147 2.88334 6.49992C2.81668 6.74436 2.76379 6.9917 2.72468 7.24192C2.68557 7.49214 2.66623 7.74481 2.66668 7.99992C2.66668 9.48881 3.18334 10.7499 4.21668 11.7833C5.25001 12.8166 6.51112 13.3333 8.00001 13.3333C9.4889 13.3333 10.75 12.8166 11.7833 11.7833C12.8167 10.7499 13.3333 9.48881 13.3333 7.99992C13.3333 6.51103 12.8167 5.24992 11.7833 4.21659C10.75 3.18325 9.4889 2.66659 8.00001 2.66659C7.73334 2.66659 7.46934 2.68592 7.20801 2.72459C6.94668 2.76325 6.68845 2.8217 6.43334 2.89992C6.24445 2.95547 6.06668 2.94992 5.90001 2.88325C5.73334 2.81659 5.61112 2.69992 5.53334 2.53325C5.45557 2.36659 5.45268 2.19725 5.52468 2.02525C5.59668 1.85325 5.72179 1.73925 5.90001 1.68325C6.23334 1.56103 6.57779 1.47214 6.93334 1.41659C7.2889 1.36103 7.64445 1.33325 8.00001 1.33325C8.92223 1.33325 9.7889 1.50836 10.6 1.85859C11.4111 2.20881 12.1167 2.6837 12.7167 3.28325C13.3167 3.88325 13.7918 4.58881 14.142 5.39992C14.4922 6.21103 14.6671 7.0777 14.6667 7.99992C14.6667 8.92214 14.4916 9.78881 14.1413 10.5999C13.7911 11.411 13.3162 12.1166 12.7167 12.7166C12.1167 13.3166 11.4111 13.7917 10.6 14.1419C9.7889 14.4921 8.92223 14.667 8.00001 14.6666ZM3.66668 4.66659C3.3889 4.66659 3.15268 4.56925 2.95801 4.37459C2.76334 4.17992 2.66623 3.94392 2.66668 3.66659C2.66668 3.38881 2.76401 3.15259 2.95868 2.95792C3.15334 2.76325 3.38934 2.66614 3.66668 2.66659C3.94445 2.66659 4.18068 2.76392 4.37534 2.95859C4.57001 3.15325 4.66712 3.38925 4.66668 3.66659C4.66668 3.94436 4.56934 4.18059 4.37468 4.37525C4.18001 4.56992 3.94401 4.66703 3.66668 4.66659ZM4.00001 7.99992C4.00001 6.88881 4.3889 5.94436 5.16668 5.16659C5.94445 4.38881 6.8889 3.99992 8.00001 3.99992C9.11112 3.99992 10.0556 4.38881 10.8333 5.16659C11.6111 5.94436 12 6.88881 12 7.99992C12 9.11103 11.6111 10.0555 10.8333 10.8333C10.0556 11.611 9.11112 11.9999 8.00001 11.9999C6.8889 11.9999 5.94445 11.611 5.16668 10.8333C4.3889 10.0555 4.00001 9.11103 4.00001 7.99992Z" fill="white" />
                    </svg>)
                    :
                    (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
                        <path d="M6.66668 10.9999L10.6667 7.99992L6.66668 4.99992M14.6667 7.99992C14.6667 4.30659 11.6933 1.33325 8.00001 1.33325C7.22001 1.33325 6.46668 1.45992 5.74668 1.70659L6.21334 2.99992C6.78001 2.77325 7.37334 2.64659 8.00001 2.64659C10.94 2.64659 13.3533 5.05992 13.3533 7.99992C13.3533 10.9399 10.94 13.3533 8.00001 13.3533C5.06001 13.3533 2.64668 10.9399 2.64668 7.99992C2.64668 7.37325 2.77334 6.74659 3.00001 6.18659L1.70668 5.74659C1.46001 6.46659 1.33334 7.21992 1.33334 7.99992C1.33334 11.6933 4.30668 14.6666 8.00001 14.6666C11.6933 14.6666 14.6667 11.6933 14.6667 7.99992ZM3.64668 2.64659C4.21334 2.64659 4.66668 3.11992 4.66668 3.64659C4.66668 4.21325 4.21334 4.66659 3.64668 4.66659C3.12001 4.66659 2.64668 4.21325 2.64668 3.64659C2.64668 3.11992 3.12001 2.64659 3.64668 2.64659Z" fill="white" />
                    </svg>)
                }
                <p>
                    {!end ? "Request received from" : "Response returned to"}
                    <span style={{ color: "#fff", backgroundColor: "#ffffff30" }} className="inline-flex items-center mx-2 px-1.5 py-0.5 text-xs text-white rounded">
                        {item.eventDetails[0]}
                    </span>
                    {!end && (<span>at host
                        <span style={{ color: "#fff", backgroundColor: "#ffffff30" }} className="inline-flex items-center px-1.5 mx-2 py-0.5 text-xs text-white rounded">
                            {item.eventDetails[1]}
                        </span>
                        <span>forwards to</span>
                        <span style={{ color: "#fff", backgroundColor: "#ffffff30" }} className="inline-flex items-center px-1.5 mx-2 py-0.5 text-xs text-white rounded">
                            {item.eventDetails[2]}
                        </span></span>)}
                </p>
            </div>
        </div>
    );
}

const eventData = (item) => {

    const headers = {
        "User-Agent": "xsolla-api-client/1.0",
        "Host": "api.xsolla.com",
        "Accept": "application/json",
        "Authorization": "Basic ZGVtb04C29sbGEuY29tOmRlbW8=",
        "Content-Type": "application/json"
    };

    const [isOpen, setOpen] = useState(false)

    const openPopup = () => {
        const popupWindow = window.open(
            '/issues/viewer/test',
            'Popup',
            'width=600,height=400,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=no'
        );

        // Focus the popup if it's already opened
        if (popupWindow) popupWindow.focus();
    };


    return (
        <div className={`mainDark rounded-lg m-2 p-4 space-y-4 detailsActionContainer w-full ${item.flag ? "flagged" : ""}`}>
            <div onClick={() => setOpen(!isOpen)} className="text-sm font-medium space-x-3 flex items-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <path d="M3.375 8C3.63909 8.21986 3.85233 8.4944 4 8.80469C4.375 9.57812 4.375 10.5234 4.375 11.4375C4.375 13.3359 4.45312 14.25 6.25 14.25C6.41576 14.25 6.57473 14.3158 6.69194 14.4331C6.80915 14.5503 6.875 14.7092 6.875 14.875C6.875 15.0408 6.80915 15.1997 6.69194 15.3169C6.57473 15.4342 6.41576 15.5 6.25 15.5C4.88281 15.5 3.96094 15.0234 3.5 14.0703C3.125 13.2969 3.125 12.3516 3.125 11.4375C3.125 9.53906 3.04688 8.625 1.25 8.625C1.08424 8.625 0.925268 8.55915 0.808058 8.44194C0.690848 8.32473 0.625 8.16576 0.625 8C0.625 7.83424 0.690848 7.67527 0.808058 7.55806C0.925268 7.44085 1.08424 7.375 1.25 7.375C3.04688 7.375 3.125 6.46094 3.125 4.5625C3.125 3.64844 3.125 2.70312 3.5 1.92969C3.96094 0.976562 4.88281 0.5 6.25 0.5C6.41576 0.5 6.57473 0.565848 6.69194 0.683058C6.80915 0.800269 6.875 0.95924 6.875 1.125C6.875 1.29076 6.80915 1.44973 6.69194 1.56694C6.57473 1.68415 6.41576 1.75 6.25 1.75C4.45312 1.75 4.375 2.66406 4.375 4.5625C4.375 5.47656 4.375 6.42188 4 7.19531C3.85233 7.5056 3.63909 7.78014 3.375 8ZM18.75 7.375C16.9531 7.375 16.875 6.46094 16.875 4.5625C16.875 3.64844 16.875 2.70312 16.5 1.92969C16.0391 0.976562 15.1172 0.5 13.75 0.5C13.5842 0.5 13.4253 0.565848 13.3081 0.683058C13.1908 0.800269 13.125 0.95924 13.125 1.125C13.125 1.29076 13.1908 1.44973 13.3081 1.56694C13.4253 1.68415 13.5842 1.75 13.75 1.75C15.5469 1.75 15.625 2.66406 15.625 4.5625C15.625 5.47656 15.625 6.42188 16 7.19531C16.1477 7.5056 16.3609 7.78014 16.625 8C16.3609 8.21986 16.1477 8.4944 16 8.80469C15.625 9.57812 15.625 10.5234 15.625 11.4375C15.625 13.3359 15.5469 14.25 13.75 14.25C13.5842 14.25 13.4253 14.3158 13.3081 14.4331C13.1908 14.5503 13.125 14.7092 13.125 14.875C13.125 15.0408 13.1908 15.1997 13.3081 15.3169C13.4253 15.4342 13.5842 15.5 13.75 15.5C15.1172 15.5 16.0391 15.0234 16.5 14.0703C16.875 13.2969 16.875 12.3516 16.875 11.4375C16.875 9.53906 16.9531 8.625 18.75 8.625C18.9158 8.625 19.0747 8.55915 19.1919 8.44194C19.3092 8.32473 19.375 8.16576 19.375 8C19.375 7.83424 19.3092 7.67527 19.1919 7.55806C19.0747 7.44085 18.9158 7.375 18.75 7.375Z" fill="#ffffff" fill-opacity="1.0" />
                </svg>
                <p>
                    {item.tag && (<span style={{ color: "#fff", backgroundColor: "#ffffff30" }} className="inline-flex items-center px-1.5 mr-2 py-0.5 mx-1 text-xs text-white rounded">
                        {item.tag}
                    </span>)}
                    <span style={{ color: "#fff", backgroundColor: "#ffffff30" }} className="inline-flex items-center px-1.5 mr-2 py-0.5 mx-1 text-xs text-white rounded">
                        {"GET"}
                    </span>
                    <span className={"font-light"}>
                        {"api.platform.io"}
                    </span>
                    <span style={{ color: "#fff" }} className={"mx-2"}>
                        /
                    </span>
                    <span className={"font-light"}>
                        {"api"}
                    </span>
                    <span style={{ color: "#fff" }} className={"mx-2"}>
                        /
                    </span>
                    <span className={"font-light"}>
                        {"fetchData"}
                    </span>
                </p>
            </div>
            <div style={{ display: isOpen ? "" : "none" }}>
                <div className="flex flex-column w-full p-2">
                    <div className=" w-full">
                        <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Header</h2>

                        <table className="table-auto w-full dark:text-slate-300">
                            {/* Table header */}

                            {/* Table body */}
                            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                                {Object.keys(headers).filter((_, index) => index % 2 == 0).map((obj, int) => (
                                    <React.Fragment key={int}>
                                        {/* Rows related to each endpoint under the host */}
                                        <tr className="rowItem noborder">
                                            <td className="flex flex-wrap flex-col justify-center">
                                                <div className="flex flex-col">
                                                    <div style={{ color: "#ffffff99" }} className="text-slate-800 text-xs dark:text-slate-100">{obj}</div>
                                                </div>
                                            </td>


                                            <td className="">
                                                <div className="flex flex-col">
                                                    <div className="text-slate-800 text-xs dark:text-slate-100 ">{headers[obj]}</div>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className=" w-full">
                        <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">-</h2>

                        <table className="table-fixed w-full dark:text-slate-300">
                            {/* Table header */}

                            {/* Table body */}
                            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                                {Object.keys(headers).filter((_, index) => index % 2 !== 0).map((obj, int) => (
                                    <tr key={int} className=" rowItem noborder">
                                        <td className="flex flex-wrap flex-col justify-center">
                                            <div className="flex flex-col">
                                                <div style={{ color: "#ffffff99" }} className="text-slate-800 text-xs dark:text-slate-100">{obj}</div>
                                            </div>
                                        </td>
                                        <td className="">
                                            <div className="flex flex-col">
                                                <div className="text-slate-800 text-xs dark:text-slate-100 w-full break-words">{headers[obj]}</div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>

                </div>
                <div className="flex flex-column space-x-10 w-full p-2">
                    <div className=" w-full">
                        <span className="flex flex-column space-x-1">
                            <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Body (JSON)</h2>
                            <span className="cursor-pointer" onClick={() => openPopup()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14.25 6.5C14.25 6.69891 14.171 6.88968 14.0303 7.03033C13.8897 7.17098 13.6989 7.25 13.5 7.25C13.3011 7.25 13.1103 7.17098 12.9697 7.03033C12.829 6.88968 12.75 6.69891 12.75 6.5V4.3125L9.03063 8.03187C8.88973 8.17277 8.69863 8.25193 8.49938 8.25193C8.30012 8.25193 8.10902 8.17277 7.96812 8.03187C7.82723 7.89098 7.74807 7.69988 7.74807 7.50063C7.74807 7.30137 7.82723 7.11027 7.96812 6.96938L11.6875 3.25H9.5C9.30109 3.25 9.11032 3.17098 8.96967 3.03033C8.82902 2.88968 8.75 2.69891 8.75 2.5C8.75 2.30109 8.82902 2.11032 8.96967 1.96967C9.11032 1.82902 9.30109 1.75 9.5 1.75H13.5C13.6989 1.75 13.8897 1.82902 14.0303 1.96967C14.171 2.11032 14.25 2.30109 14.25 2.5V6.5ZM11.5 8C11.3011 8 11.1103 8.07902 10.9697 8.21967C10.829 8.36032 10.75 8.55109 10.75 8.75V12.75H3.25V5.25H7.25C7.44891 5.25 7.63968 5.17098 7.78033 5.03033C7.92098 4.88968 8 4.69891 8 4.5C8 4.30109 7.92098 4.11032 7.78033 3.96967C7.63968 3.82902 7.44891 3.75 7.25 3.75H3C2.66848 3.75 2.35054 3.8817 2.11612 4.11612C1.8817 4.35054 1.75 4.66848 1.75 5V13C1.75 13.3315 1.8817 13.6495 2.11612 13.8839C2.35054 14.1183 2.66848 14.25 3 14.25H11C11.3315 14.25 11.6495 14.1183 11.8839 13.8839C12.1183 13.6495 12.25 13.3315 12.25 13V8.75C12.25 8.55109 12.171 8.36032 12.0303 8.21967C11.8897 8.07902 11.6989 8 11.5 8Z" fill="white" />
                                </svg>
                            </span>
                        </span>
                        <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                            <JsonViewer oas={initoas} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const eventPlugin = (item) => {

    const headers = {
        "User-Agent": "xsolla-api-client/1.0",
        "Host": "api.xsolla.com",
        "Accept": "application/json",
        "Authorization": "Basic ZGVtb04C29sbGEuY29tOmRlbW8=",
        "Content-Type": "application/json"
    };

    const [isOpen, setOpen] = useState(false)
    const [isDetailsOpen, setDetailsOpen] = useState(false)

    const openPopup = () => {
        const popupWindow = window.open(
            '/issues/viewer/test',
            'Popup',
            'width=600,height=400,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=no'
        );

        // Focus the popup if it's already opened
        if (popupWindow) popupWindow.focus();
    };


    return (
        <div className={`mainDark rounded-lg m-2 p-4 space-y-4 detailsActionContainer w-full ${item.flag ? "flagged" : ""}`}>
            <div onClick={() => setOpen(!isOpen)} className="text-sm font-medium space-x-3 flex items-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 15" fill="none">
                    <path d="M1 13.5L3.625 10.875M9.25 1.5L6.625 4.125M13 5.25L10.375 7.875M5.33875 3L11.5 9.16125L9.9595 10.7017C9.5579 11.1194 9.07703 11.4528 8.54503 11.6824C8.01302 11.912 7.44058 12.0332 6.86118 12.0389C6.28178 12.0445 5.70706 11.9346 5.17066 11.7155C4.63425 11.4964 4.14694 11.1725 3.73722 10.7628C3.3275 10.3531 3.00361 9.86575 2.7845 9.32934C2.56539 8.79294 2.45546 8.21822 2.46115 7.63882C2.46683 7.05942 2.58801 6.48698 2.8176 5.95497C3.04719 5.42297 3.38057 4.9421 3.79825 4.5405L5.33875 3Z" stroke="#4DE36E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p>
                    <span style={{ color: "#fff", backgroundColor: "#ffffff30" }} className="inline-flex items-center px-1.5 mr-2 py-0.5 mx-1 text-xs text-white rounded">
                        {"Plugin"}
                    </span>
                    <span className={"font-light"}>
                        {"Header Check"}
                    </span>
                </p>
            </div>

            <div style={{ display: isOpen ? "" : "none" }}>
                <div className="flex flex-column w-full p-2">
                    <p className={"text-sm text-slate-100"}>HeaderFaultFinder is a robust and efficient plugin designed to streamline the process of diagnosing and identifying issues within the headers of API responses. This tool is indispensable for developers and QA engineers who regularly interact with APIs and need to ensure the integrity and correctness of response headers.</p>
                </div>
                <div className="flex flex-column w-full p-2">
                    <div className=" w-full">
                        <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Header</h2>
                        <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                            <JsonDiff originalJson={initoas} modifiedJson={initoas2} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-column space-x-10 w-full p-2">
                    <div className=" w-full">
                        <span className="flex flex-column space-x-1">
                            <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Body (JSON)</h2>
                            <span className="cursor-pointer" onClick={() => openPopup()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14.25 6.5C14.25 6.69891 14.171 6.88968 14.0303 7.03033C13.8897 7.17098 13.6989 7.25 13.5 7.25C13.3011 7.25 13.1103 7.17098 12.9697 7.03033C12.829 6.88968 12.75 6.69891 12.75 6.5V4.3125L9.03063 8.03187C8.88973 8.17277 8.69863 8.25193 8.49938 8.25193C8.30012 8.25193 8.10902 8.17277 7.96812 8.03187C7.82723 7.89098 7.74807 7.69988 7.74807 7.50063C7.74807 7.30137 7.82723 7.11027 7.96812 6.96938L11.6875 3.25H9.5C9.30109 3.25 9.11032 3.17098 8.96967 3.03033C8.82902 2.88968 8.75 2.69891 8.75 2.5C8.75 2.30109 8.82902 2.11032 8.96967 1.96967C9.11032 1.82902 9.30109 1.75 9.5 1.75H13.5C13.6989 1.75 13.8897 1.82902 14.0303 1.96967C14.171 2.11032 14.25 2.30109 14.25 2.5V6.5ZM11.5 8C11.3011 8 11.1103 8.07902 10.9697 8.21967C10.829 8.36032 10.75 8.55109 10.75 8.75V12.75H3.25V5.25H7.25C7.44891 5.25 7.63968 5.17098 7.78033 5.03033C7.92098 4.88968 8 4.69891 8 4.5C8 4.30109 7.92098 4.11032 7.78033 3.96967C7.63968 3.82902 7.44891 3.75 7.25 3.75H3C2.66848 3.75 2.35054 3.8817 2.11612 4.11612C1.8817 4.35054 1.75 4.66848 1.75 5V13C1.75 13.3315 1.8817 13.6495 2.11612 13.8839C2.35054 14.1183 2.66848 14.25 3 14.25H11C11.3315 14.25 11.6495 14.1183 11.8839 13.8839C12.1183 13.6495 12.25 13.3315 12.25 13V8.75C12.25 8.55109 12.171 8.36032 12.0303 8.21967C11.8897 8.07902 11.6989 8 11.5 8Z" fill="white" />
                                </svg>
                            </span>
                        </span>
                        <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                            <JsonDiff originalJson={initoas} modifiedJson={initoas2} />
                        </div>
                    </div>
                </div>
                <div className="secondaryDark m-2 rounded-xl p-2">
                    <div onClick={() => setDetailsOpen(!isDetailsOpen)} className="text-sm font-medium space-x-3 flex items-center w-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 15" fill="none">
                            <path d="M1 13.5L3.625 10.875M9.25 1.5L6.625 4.125M13 5.25L10.375 7.875M5.33875 3L11.5 9.16125L9.9595 10.7017C9.5579 11.1194 9.07703 11.4528 8.54503 11.6824C8.01302 11.912 7.44058 12.0332 6.86118 12.0389C6.28178 12.0445 5.70706 11.9346 5.17066 11.7155C4.63425 11.4964 4.14694 11.1725 3.73722 10.7628C3.3275 10.3531 3.00361 9.86575 2.7845 9.32934C2.56539 8.79294 2.45546 8.21822 2.46115 7.63882C2.46683 7.05942 2.58801 6.48698 2.8176 5.95497C3.04719 5.42297 3.38057 4.9421 3.79825 4.5405L5.33875 3Z" stroke="#4DE36E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p>
                            <span className={"font-light"}>
                                {"View Plugin Request Data"}
                            </span>
                        </p>
                    </div>

                    <div style={{ display: isDetailsOpen ? "" : "none" }}>
                        <div className="flex flex-column space-x-10 w-full p-2">
                            <div className=" w-full">
                                <span className="flex flex-column space-x-1">
                                    <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Plugin (Input)</h2>
                                    <span className="cursor-pointer" onClick={() => openPopup()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M14.25 6.5C14.25 6.69891 14.171 6.88968 14.0303 7.03033C13.8897 7.17098 13.6989 7.25 13.5 7.25C13.3011 7.25 13.1103 7.17098 12.9697 7.03033C12.829 6.88968 12.75 6.69891 12.75 6.5V4.3125L9.03063 8.03187C8.88973 8.17277 8.69863 8.25193 8.49938 8.25193C8.30012 8.25193 8.10902 8.17277 7.96812 8.03187C7.82723 7.89098 7.74807 7.69988 7.74807 7.50063C7.74807 7.30137 7.82723 7.11027 7.96812 6.96938L11.6875 3.25H9.5C9.30109 3.25 9.11032 3.17098 8.96967 3.03033C8.82902 2.88968 8.75 2.69891 8.75 2.5C8.75 2.30109 8.82902 2.11032 8.96967 1.96967C9.11032 1.82902 9.30109 1.75 9.5 1.75H13.5C13.6989 1.75 13.8897 1.82902 14.0303 1.96967C14.171 2.11032 14.25 2.30109 14.25 2.5V6.5ZM11.5 8C11.3011 8 11.1103 8.07902 10.9697 8.21967C10.829 8.36032 10.75 8.55109 10.75 8.75V12.75H3.25V5.25H7.25C7.44891 5.25 7.63968 5.17098 7.78033 5.03033C7.92098 4.88968 8 4.69891 8 4.5C8 4.30109 7.92098 4.11032 7.78033 3.96967C7.63968 3.82902 7.44891 3.75 7.25 3.75H3C2.66848 3.75 2.35054 3.8817 2.11612 4.11612C1.8817 4.35054 1.75 4.66848 1.75 5V13C1.75 13.3315 1.8817 13.6495 2.11612 13.8839C2.35054 14.1183 2.66848 14.25 3 14.25H11C11.3315 14.25 11.6495 14.1183 11.8839 13.8839C12.1183 13.6495 12.25 13.3315 12.25 13V8.75C12.25 8.55109 12.171 8.36032 12.0303 8.21967C11.8897 8.07902 11.6989 8 11.5 8Z" fill="white" />
                                        </svg>
                                    </span>
                                </span>
                                <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                                    <JsonViewer oas={initoas} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-column space-x-10 w-full p-2">
                            <div className=" w-full">
                                <span className="flex flex-column space-x-1">
                                    <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Plugin (Output)</h2>
                                    <span className="cursor-pointer" onClick={() => openPopup()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M14.25 6.5C14.25 6.69891 14.171 6.88968 14.0303 7.03033C13.8897 7.17098 13.6989 7.25 13.5 7.25C13.3011 7.25 13.1103 7.17098 12.9697 7.03033C12.829 6.88968 12.75 6.69891 12.75 6.5V4.3125L9.03063 8.03187C8.88973 8.17277 8.69863 8.25193 8.49938 8.25193C8.30012 8.25193 8.10902 8.17277 7.96812 8.03187C7.82723 7.89098 7.74807 7.69988 7.74807 7.50063C7.74807 7.30137 7.82723 7.11027 7.96812 6.96938L11.6875 3.25H9.5C9.30109 3.25 9.11032 3.17098 8.96967 3.03033C8.82902 2.88968 8.75 2.69891 8.75 2.5C8.75 2.30109 8.82902 2.11032 8.96967 1.96967C9.11032 1.82902 9.30109 1.75 9.5 1.75H13.5C13.6989 1.75 13.8897 1.82902 14.0303 1.96967C14.171 2.11032 14.25 2.30109 14.25 2.5V6.5ZM11.5 8C11.3011 8 11.1103 8.07902 10.9697 8.21967C10.829 8.36032 10.75 8.55109 10.75 8.75V12.75H3.25V5.25H7.25C7.44891 5.25 7.63968 5.17098 7.78033 5.03033C7.92098 4.88968 8 4.69891 8 4.5C8 4.30109 7.92098 4.11032 7.78033 3.96967C7.63968 3.82902 7.44891 3.75 7.25 3.75H3C2.66848 3.75 2.35054 3.8817 2.11612 4.11612C1.8817 4.35054 1.75 4.66848 1.75 5V13C1.75 13.3315 1.8817 13.6495 2.11612 13.8839C2.35054 14.1183 2.66848 14.25 3 14.25H11C11.3315 14.25 11.6495 14.1183 11.8839 13.8839C12.1183 13.6495 12.25 13.3315 12.25 13V8.75C12.25 8.55109 12.171 8.36032 12.0303 8.21967C11.8897 8.07902 11.6989 8 11.5 8Z" fill="white" />
                                        </svg>
                                    </span>
                                </span>
                                <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                                    <JsonViewer oas={initoas} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const GetArrayItems = (items) => {
    const timelineContainers = []
    items.map((item, int) => {
        switch (item.type) {
            case "eventDetail": timelineContainers.push(eventDetail(item, int == (items.length - 1))); break;
            case "eventNotice": timelineContainers.push(eventData(item)); break;
            case "eventPlugin": timelineContainers.push(eventPlugin(item)); break;
            case "eventRequest": timelineContainers.push(eventData(item)); break;
            default: timelineContainers.push(<div><h1>{"test" + int}</h1></div>); break;
        }
    })

    return timelineContainers
}


const initoas = {
    "openapi": "3.0.1",
    "info": {
        "title": "Sample API",
        "version": "1.0.0",
        "description": "A simple API example",
    },
    "servers": [
        {
            "url": "https://api.sample.com/v1"
        }
    ],
    "paths": {
        "/pets": {
            "get": {
                "summary": "List all pets",
                "description": "Returns a list of pets",
            },
            "post": {
                "summary": "Add a new pet",
                "description": "Adds a new pet to the list",
            }
        },
        "/pets/{petId}": {
            "get": {
                "summary": "Find pet by ID",
                "description": "Returns a single pet",
            },
            "delete": {
                "summary": "Deletes a pet",
                "description": "Deletes a pet by its ID",
            },
            "patch": {
                "summary": "Update a pet",
                "description": "Updates a pet's details by its ID",
            }
        },
        "/users": {
            "post": {
                "summary": "Create a new user",
                "description": "Registers a new user",
            },
            "get": {
                "summary": "List all users",
                "description": "Returns a list of all registered users",
            }
        },
        "/users/{userId}/settings": {
            "put": {
                "summary": "Update user settings",
                "description": "Updates settings for a specific user",
            },
            "get": {
                "summary": "Get user settings",
                "description": "Retrieves settings for a specific user",
            }
        }
    }
}

const initoas2 = {
    "openapi": "3.65767567.1",
    "info": {
        "title": "Sample API",
        "description": "Registers a new user",
        "description": "A simple API example",
    },
    "servers": [
        {
            "url": "https://api.sample.com/v1"
        }
    ],
    "paths": {
        "/pets": {
            "get": {
                "summary": "List5645645 all pets",
                "description": "Returns a list of pets",
            },
            "post": {
                "summary": "Add a new pet",
                "description": "Adds a new pet to the list",
            }
        },
        "/pets/{petId}": {
            "get": {
                "summary": "Find pet by ID",
                "description": "Returns a single pet",
            },
            "delete": {
                "summary": "Deletes a pet",
                "description": "Deletes a pet by its ID",
            },
            "patch": {
                "summary": "Update a pet",
            }
        },
        "/users": {
            "post": {
                "summary": "Create a new user",
                "description": "Registers a new user",
                "description": "Registers a new user",
            },
            "get": {
                "summary": "List all users",
                "description": "Returns a list of all registered users",
            }
        },
        "/users/{userId}/settings": {
            "put": {
                "summary": "Update user settings",
                "description": "Updates settings for a specific user",
            },
            "get": {
                "summary": "Get user settings",
                "description": "Ret564654645rieves settings for a specific user",
            }
        }
    }
}