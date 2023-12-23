import React, { useState, useContext, Link } from 'react';
import { Chrono } from 'react-chrono';
import JsonViewer from '../partials/issues/Issues.JsonViewer';
import JsonDiff from '../partials/issues/Issues.JsonDiff';
import { AppContext } from '../provider/Provider.State';

const VerticalTimeline = ({ incidentId = "test" }) => {
    const { incidentDetails } = useContext(AppContext)

    if (!incidentDetails[incidentId]?.eventLog) {
        return
    }

    return (
        <Chrono
            items={incidentDetails[incidentId].eventLog}
            mode="VERTICAL"
            titleDateFormat={"YYYY-MM-DD  •  HH:mm:ss.SSS"}
            hideControls
            cardHeight={10}
            timelinePointDimension={11}
            fontSizes={{
                cardSubtitle: '0.85rem',
                cardText: '0.8rem',
                cardTitle: '1rem',
                title: '0.8rem',
            }}
            theme={{
                primary: "#ffffff",
                secondary: "#ffffff00",
                cardBgColor: "#17181a00",
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
        <BodyTemplate tags={["Entrypoint", "GET Request", "Authenticated"]} flag={item.flag}>
            {<p>
                {!end ? "Request received from" : "Response returned to"}
                <span style={{ color: "#fff", backgroundColor: "#ffffff30" }} className="inline-flex items-center mx-1 px-1.5 py-0.5 text-xs text-white rounded">
                    {item.eventDetails[0]}
                </span>
                {!end && (<span>at host
                    <span style={{ color: "#fff", backgroundColor: "#ffffff30" }} className="inline-flex items-center px-1.5 mx-1 py-0.5 text-xs text-white rounded">
                        {item.eventDetails[1]}
                    </span>
                    <span>forwards to</span>
                    <span style={{ color: "#fff", backgroundColor: "#ffffff30" }} className="inline-flex items-center px-1.5 mx-1 py-0.5 text-xs text-white rounded">
                        {item.eventDetails[2]}
                    </span>
                </span>)}
            </p>}
            {<div>
                <div className="flex flex-column space-x-10 w-full p-2">
                    <div className=" w-full">
                        <span className="flex flex-column space-x-1">
                            <h2 className="text-xs text-slate-800 dark:text-slate-100">Header (JSON)</h2>
                            <span className="cursor-pointer" onClick={() => openPopup()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14.25 6.5C14.25 6.69891 14.171 6.88968 14.0303 7.03033C13.8897 7.17098 13.6989 7.25 13.5 7.25C13.3011 7.25 13.1103 7.17098 12.9697 7.03033C12.829 6.88968 12.75 6.69891 12.75 6.5V4.3125L9.03063 8.03187C8.88973 8.17277 8.69863 8.25193 8.49938 8.25193C8.30012 8.25193 8.10902 8.17277 7.96812 8.03187C7.82723 7.89098 7.74807 7.69988 7.74807 7.50063C7.74807 7.30137 7.82723 7.11027 7.96812 6.96938L11.6875 3.25H9.5C9.30109 3.25 9.11032 3.17098 8.96967 3.03033C8.82902 2.88968 8.75 2.69891 8.75 2.5C8.75 2.30109 8.82902 2.11032 8.96967 1.96967C9.11032 1.82902 9.30109 1.75 9.5 1.75H13.5C13.6989 1.75 13.8897 1.82902 14.0303 1.96967C14.171 2.11032 14.25 2.30109 14.25 2.5V6.5ZM11.5 8C11.3011 8 11.1103 8.07902 10.9697 8.21967C10.829 8.36032 10.75 8.55109 10.75 8.75V12.75H3.25V5.25H7.25C7.44891 5.25 7.63968 5.17098 7.78033 5.03033C7.92098 4.88968 8 4.69891 8 4.5C8 4.30109 7.92098 4.11032 7.78033 3.96967C7.63968 3.82902 7.44891 3.75 7.25 3.75H3C2.66848 3.75 2.35054 3.8817 2.11612 4.11612C1.8817 4.35054 1.75 4.66848 1.75 5V13C1.75 13.3315 1.8817 13.6495 2.11612 13.8839C2.35054 14.1183 2.66848 14.25 3 14.25H11C11.3315 14.25 11.6495 14.1183 11.8839 13.8839C12.1183 13.6495 12.25 13.3315 12.25 13V8.75C12.25 8.55109 12.171 8.36032 12.0303 8.21967C11.8897 8.07902 11.6989 8 11.5 8Z" fill="white" />
                                </svg>
                            </span>
                        </span>
                        <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                            <JsonViewer oas={{
                                "Content-Type": "application/json",
                                "Accept": "application/json",
                                "Authorization": "Bearer YOUR_ACCESS_TOKEN",
                                "User-Agent": "MyApp (https://myapp.example.com)",
                                "X-Requested-With": "XMLHttpRequest",
                                "X-API-KEY": "APIKEY123456",
                                "Cache-Control": "no-cache",
                                "Pragma": "no-cache",
                                "Accept-Encoding": "gzip, deflate, br",
                                "Accept-Language": "en-US,en;q=0.9",
                                "Connection": "keep-alive",
                                "Referer": "https://myapp.example.com"
                            }} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-column space-x-10 w-full p-2">
                    <div className=" w-full">
                        <span className="flex flex-column space-x-1">
                            <h2 className="text-xs text-slate-800 dark:text-slate-100">Body (JSON)</h2>
                            <span className="cursor-pointer" onClick={() => openPopup()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14.25 6.5C14.25 6.69891 14.171 6.88968 14.0303 7.03033C13.8897 7.17098 13.6989 7.25 13.5 7.25C13.3011 7.25 13.1103 7.17098 12.9697 7.03033C12.829 6.88968 12.75 6.69891 12.75 6.5V4.3125L9.03063 8.03187C8.88973 8.17277 8.69863 8.25193 8.49938 8.25193C8.30012 8.25193 8.10902 8.17277 7.96812 8.03187C7.82723 7.89098 7.74807 7.69988 7.74807 7.50063C7.74807 7.30137 7.82723 7.11027 7.96812 6.96938L11.6875 3.25H9.5C9.30109 3.25 9.11032 3.17098 8.96967 3.03033C8.82902 2.88968 8.75 2.69891 8.75 2.5C8.75 2.30109 8.82902 2.11032 8.96967 1.96967C9.11032 1.82902 9.30109 1.75 9.5 1.75H13.5C13.6989 1.75 13.8897 1.82902 14.0303 1.96967C14.171 2.11032 14.25 2.30109 14.25 2.5V6.5ZM11.5 8C11.3011 8 11.1103 8.07902 10.9697 8.21967C10.829 8.36032 10.75 8.55109 10.75 8.75V12.75H3.25V5.25H7.25C7.44891 5.25 7.63968 5.17098 7.78033 5.03033C7.92098 4.88968 8 4.69891 8 4.5C8 4.30109 7.92098 4.11032 7.78033 3.96967C7.63968 3.82902 7.44891 3.75 7.25 3.75H3C2.66848 3.75 2.35054 3.8817 2.11612 4.11612C1.8817 4.35054 1.75 4.66848 1.75 5V13C1.75 13.3315 1.8817 13.6495 2.11612 13.8839C2.35054 14.1183 2.66848 14.25 3 14.25H11C11.3315 14.25 11.6495 14.1183 11.8839 13.8839C12.1183 13.6495 12.25 13.3315 12.25 13V8.75C12.25 8.55109 12.171 8.36032 12.0303 8.21967C11.8897 8.07902 11.6989 8 11.5 8Z" fill="white" />
                                </svg>
                            </span>
                        </span>
                        <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                            <JsonViewer oas={{
                                "username": "newuser",
                                "password": "password123",
                                "email": "newuser@example.com",
                                "fullName": "New User",
                                "age": 30,
                                "address": {
                                    "street": "123 Main St",
                                    "city": "Anytown",
                                    "state": "Anystate",
                                    "zipCode": "12345"
                                },
                                "preferences": {
                                    "newsletter": true,
                                    "notifications": {
                                        "email": true,
                                        "sms": false
                                    }
                                }
                            }} />
                        </div>
                    </div>
                </div>
            </div>}
        </BodyTemplate>
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

    return (
        <BodyTemplate tags={[item.tag]} flag={item.flag}>

            {<p>
                <span>Client Request details</span>
                <span style={{ color: "#fff", backgroundColor: "#ffffff50" }} className="inline-flex items-center px-1.5 mx-2 py-0.5 text-xs text-white rounded">
                    <a href='/catalog/api.sample.com/pets/__post'>{"GET"}</a>
                </span>
                <span className={"font-light"}>
                    <a href='/catalog/api.sample.com/' style={{ color: "#398af1" }}>{"api.sample.com"}</a>
                </span>
                <span style={{ color: "#fff" }} className={"mx-2"}>
                    /
                </span>
                <span className={"font-light"}>
                    <a href='/catalog/api.sample.com/pets/' style={{ color: "#398af1" }}>{"pets"}</a>
                </span>
            </p>}
            {<div>
                <div className=" w-full">
                    <span className="flex flex-column space-x-1">
                        <h2 className="text-xs text-slate-800 dark:text-slate-100">Header (JSON)</h2>
                        <span className="cursor-pointer" onClick={() => openPopup()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M14.25 6.5C14.25 6.69891 14.171 6.88968 14.0303 7.03033C13.8897 7.17098 13.6989 7.25 13.5 7.25C13.3011 7.25 13.1103 7.17098 12.9697 7.03033C12.829 6.88968 12.75 6.69891 12.75 6.5V4.3125L9.03063 8.03187C8.88973 8.17277 8.69863 8.25193 8.49938 8.25193C8.30012 8.25193 8.10902 8.17277 7.96812 8.03187C7.82723 7.89098 7.74807 7.69988 7.74807 7.50063C7.74807 7.30137 7.82723 7.11027 7.96812 6.96938L11.6875 3.25H9.5C9.30109 3.25 9.11032 3.17098 8.96967 3.03033C8.82902 2.88968 8.75 2.69891 8.75 2.5C8.75 2.30109 8.82902 2.11032 8.96967 1.96967C9.11032 1.82902 9.30109 1.75 9.5 1.75H13.5C13.6989 1.75 13.8897 1.82902 14.0303 1.96967C14.171 2.11032 14.25 2.30109 14.25 2.5V6.5ZM11.5 8C11.3011 8 11.1103 8.07902 10.9697 8.21967C10.829 8.36032 10.75 8.55109 10.75 8.75V12.75H3.25V5.25H7.25C7.44891 5.25 7.63968 5.17098 7.78033 5.03033C7.92098 4.88968 8 4.69891 8 4.5C8 4.30109 7.92098 4.11032 7.78033 3.96967C7.63968 3.82902 7.44891 3.75 7.25 3.75H3C2.66848 3.75 2.35054 3.8817 2.11612 4.11612C1.8817 4.35054 1.75 4.66848 1.75 5V13C1.75 13.3315 1.8817 13.6495 2.11612 13.8839C2.35054 14.1183 2.66848 14.25 3 14.25H11C11.3315 14.25 11.6495 14.1183 11.8839 13.8839C12.1183 13.6495 12.25 13.3315 12.25 13V8.75C12.25 8.55109 12.171 8.36032 12.0303 8.21967C11.8897 8.07902 11.6989 8 11.5 8Z" fill="white" />
                            </svg>
                        </span>
                    </span>
                    <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                        <JsonViewer oas={{
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": "Bearer YOUR_ACCESS_TOKEN",
                            "User-Agent": "MyApp (https://myapp.example.com)",
                            "X-Requested-With": "XMLHttpRequest",
                            "X-API-KEY": "APIKEY123456",
                            "Cache-Control": "no-cache",
                            "Pragma": "no-cache",
                            "Accept-Encoding": "gzip, deflate, br",
                            "Accept-Language": "en-US,en;q=0.9",
                            "Connection": "keep-alive",
                            "Referer": "https://myapp.example.com"
                        }} />
                    </div>
                </div>
                <div className="flex flex-column space-x-10 w-full p-2">
                    <div className=" w-full">
                        <span className="flex flex-column space-x-1">
                            <h2 className="text-xs text-slate-800 dark:text-slate-100">Body (JSON)</h2>
                            <span className="cursor-pointer" onClick={() => openPopup()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14.25 6.5C14.25 6.69891 14.171 6.88968 14.0303 7.03033C13.8897 7.17098 13.6989 7.25 13.5 7.25C13.3011 7.25 13.1103 7.17098 12.9697 7.03033C12.829 6.88968 12.75 6.69891 12.75 6.5V4.3125L9.03063 8.03187C8.88973 8.17277 8.69863 8.25193 8.49938 8.25193C8.30012 8.25193 8.10902 8.17277 7.96812 8.03187C7.82723 7.89098 7.74807 7.69988 7.74807 7.50063C7.74807 7.30137 7.82723 7.11027 7.96812 6.96938L11.6875 3.25H9.5C9.30109 3.25 9.11032 3.17098 8.96967 3.03033C8.82902 2.88968 8.75 2.69891 8.75 2.5C8.75 2.30109 8.82902 2.11032 8.96967 1.96967C9.11032 1.82902 9.30109 1.75 9.5 1.75H13.5C13.6989 1.75 13.8897 1.82902 14.0303 1.96967C14.171 2.11032 14.25 2.30109 14.25 2.5V6.5ZM11.5 8C11.3011 8 11.1103 8.07902 10.9697 8.21967C10.829 8.36032 10.75 8.55109 10.75 8.75V12.75H3.25V5.25H7.25C7.44891 5.25 7.63968 5.17098 7.78033 5.03033C7.92098 4.88968 8 4.69891 8 4.5C8 4.30109 7.92098 4.11032 7.78033 3.96967C7.63968 3.82902 7.44891 3.75 7.25 3.75H3C2.66848 3.75 2.35054 3.8817 2.11612 4.11612C1.8817 4.35054 1.75 4.66848 1.75 5V13C1.75 13.3315 1.8817 13.6495 2.11612 13.8839C2.35054 14.1183 2.66848 14.25 3 14.25H11C11.3315 14.25 11.6495 14.1183 11.8839 13.8839C12.1183 13.6495 12.25 13.3315 12.25 13V8.75C12.25 8.55109 12.171 8.36032 12.0303 8.21967C11.8897 8.07902 11.6989 8 11.5 8Z" fill="white" />
                                </svg>
                            </span>
                        </span>
                        <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                            <JsonViewer oas={{
                                "username": "newuser",
                                "password": "password123",
                                "email": "newuser@example.com",
                                "fullName": "New User",
                                "age": 30,
                                "address": {
                                    "street": "123 Main St",
                                    "city": "Anytown",
                                    "state": "Anystate",
                                    "zipCode": "12345"
                                },
                                "preferences": {
                                    "newsletter": true,
                                    "notifications": {
                                        "email": true,
                                        "sms": false
                                    }
                                }
                            }} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-column space-x-10 w-full p-2">
                    <div className=" w-full">
                        <span className="flex flex-column space-x-1">
                            <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Endpoint OAS (JSON)</h2>
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
            </div>}
        </BodyTemplate>
    )
}

const eventPlugin = (item) => {
    return (
        <BodyTemplate tags={[item.tag]} flag={item.flag}>

            {<p>
                <span>Builder (<a href={`/api.sample.com/items/post`} style={{ color: "#1466cf" }}>e0033a961</a>) triggered</span>
                <span style={{ color: "#fff", backgroundColor: "#ffffff30" }} className="inline-flex items-center px-1.5 mr-2 py-0.5 mx-1 text-xs text-white rounded">
                    {"Plugin"}
                </span>
                <span style={{ color: "#fff", backgroundColor: "#ffffff30" }} className="inline-flex items-center px-1.5 mr-2 py-0.5 mx-1 text-xs text-white rounded">
                    {"Header Check"}
                </span>
                <span style={{ color: "#fff", backgroundColor: "#ffffff30" }} className="inline-flex items-center px-1.5 mr-2 py-0.5 mx-1 text-xs text-white rounded">
                    {"1.0.3"}
                </span>
            </p>}

            {<div>
                <div className="flex flex-column w-full p-2">
                    <p className={"text-sm text-slate-100"}>Header Check is a robust and efficient plugin designed to streamline the process of diagnosing and identifying issues within the headers of API responses. This tool is indispensable for developers and QA engineers who regularly interact with APIs and need to ensure the integrity and correctness of response headers.</p>
                </div>
                <div className="flex flex-column w-full p-2">
                    <div className=" w-full">
                        <span className="flex flex-column space-x-1">
                            <h2 className="text-xs text-slate-800 dark:text-slate-100">Header (JSON)</h2>
                            <span className="cursor-pointer" onClick={() => openPopup()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14.25 6.5C14.25 6.69891 14.171 6.88968 14.0303 7.03033C13.8897 7.17098 13.6989 7.25 13.5 7.25C13.3011 7.25 13.1103 7.17098 12.9697 7.03033C12.829 6.88968 12.75 6.69891 12.75 6.5V4.3125L9.03063 8.03187C8.88973 8.17277 8.69863 8.25193 8.49938 8.25193C8.30012 8.25193 8.10902 8.17277 7.96812 8.03187C7.82723 7.89098 7.74807 7.69988 7.74807 7.50063C7.74807 7.30137 7.82723 7.11027 7.96812 6.96938L11.6875 3.25H9.5C9.30109 3.25 9.11032 3.17098 8.96967 3.03033C8.82902 2.88968 8.75 2.69891 8.75 2.5C8.75 2.30109 8.82902 2.11032 8.96967 1.96967C9.11032 1.82902 9.30109 1.75 9.5 1.75H13.5C13.6989 1.75 13.8897 1.82902 14.0303 1.96967C14.171 2.11032 14.25 2.30109 14.25 2.5V6.5ZM11.5 8C11.3011 8 11.1103 8.07902 10.9697 8.21967C10.829 8.36032 10.75 8.55109 10.75 8.75V12.75H3.25V5.25H7.25C7.44891 5.25 7.63968 5.17098 7.78033 5.03033C7.92098 4.88968 8 4.69891 8 4.5C8 4.30109 7.92098 4.11032 7.78033 3.96967C7.63968 3.82902 7.44891 3.75 7.25 3.75H3C2.66848 3.75 2.35054 3.8817 2.11612 4.11612C1.8817 4.35054 1.75 4.66848 1.75 5V13C1.75 13.3315 1.8817 13.6495 2.11612 13.8839C2.35054 14.1183 2.66848 14.25 3 14.25H11C11.3315 14.25 11.6495 14.1183 11.8839 13.8839C12.1183 13.6495 12.25 13.3315 12.25 13V8.75C12.25 8.55109 12.171 8.36032 12.0303 8.21967C11.8897 8.07902 11.6989 8 11.5 8Z" fill="white" />
                                </svg>
                            </span>
                        </span>                        <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                            <JsonDiff
                                originalJson={{
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "Authorization": "ern34j399ekemm2nsi",
                                    "User-Agent": "MyApp (https://myapp.example.com)",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "X-API-KEY": "APIKEY123456",
                                    "Cache-Control": "no-cache",
                                    "Pragma": "no-cache",
                                    "Accept-Encoding": "gzip, deflate, br",
                                    "Accept-Language": "en-US,en;q=0.9",
                                    "Connection": "keep-alive",
                                    "Referer": "https://myapp.example.com"
                                }}
                                modifiedJson={{
                                    "Content-Type": "application/json",
                                    "Accept": "application/json",
                                    "Authorization": "Bearer YOUR_ACCESS_TOKEN",
                                    "User-Agent": "MyApp (https://myapp.example.com)",
                                    "X-Requested-With": "XMLHttpRequest",
                                    "X-API-KEY": "Your API Key",
                                    "Connection": "keep-alive"
                                }} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-column space-x-10 w-full p-2">
                    <div className=" w-full">
                        <span className="flex flex-column space-x-1">
                            <h2 className="text-xs text-slate-800 dark:text-slate-100">Body (JSON)</h2>
                            <span className="cursor-pointer" onClick={() => openPopup()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14.25 6.5C14.25 6.69891 14.171 6.88968 14.0303 7.03033C13.8897 7.17098 13.6989 7.25 13.5 7.25C13.3011 7.25 13.1103 7.17098 12.9697 7.03033C12.829 6.88968 12.75 6.69891 12.75 6.5V4.3125L9.03063 8.03187C8.88973 8.17277 8.69863 8.25193 8.49938 8.25193C8.30012 8.25193 8.10902 8.17277 7.96812 8.03187C7.82723 7.89098 7.74807 7.69988 7.74807 7.50063C7.74807 7.30137 7.82723 7.11027 7.96812 6.96938L11.6875 3.25H9.5C9.30109 3.25 9.11032 3.17098 8.96967 3.03033C8.82902 2.88968 8.75 2.69891 8.75 2.5C8.75 2.30109 8.82902 2.11032 8.96967 1.96967C9.11032 1.82902 9.30109 1.75 9.5 1.75H13.5C13.6989 1.75 13.8897 1.82902 14.0303 1.96967C14.171 2.11032 14.25 2.30109 14.25 2.5V6.5ZM11.5 8C11.3011 8 11.1103 8.07902 10.9697 8.21967C10.829 8.36032 10.75 8.55109 10.75 8.75V12.75H3.25V5.25H7.25C7.44891 5.25 7.63968 5.17098 7.78033 5.03033C7.92098 4.88968 8 4.69891 8 4.5C8 4.30109 7.92098 4.11032 7.78033 3.96967C7.63968 3.82902 7.44891 3.75 7.25 3.75H3C2.66848 3.75 2.35054 3.8817 2.11612 4.11612C1.8817 4.35054 1.75 4.66848 1.75 5V13C1.75 13.3315 1.8817 13.6495 2.11612 13.8839C2.35054 14.1183 2.66848 14.25 3 14.25H11C11.3315 14.25 11.6495 14.1183 11.8839 13.8839C12.1183 13.6495 12.25 13.3315 12.25 13V8.75C12.25 8.55109 12.171 8.36032 12.0303 8.21967C11.8897 8.07902 11.6989 8 11.5 8Z" fill="white" />
                                </svg>
                            </span>
                        </span>
                        <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                            <JsonDiff originalJson={{
                                "username": "newuser",
                                "password": "password123",
                                "email": "newuser@example.com",
                                "fullName": "New User",
                                "age": 30,
                                "address": {
                                    "street": "123 Main St",
                                    "city": "Anytown",
                                    "state": "Anystate",
                                    "zipCode": "12345"
                                },
                                "preferences": {
                                    "newsletter": true,
                                    "notifications": {
                                        "email": true,
                                        "sms": false
                                    }
                                }
                            }}
                                modifiedJson={{
                                    "username": "newuser",
                                    "password": null,
                                    "email": "newuser@example.com",
                                    "fullName": "New User",
                                    "age": 30,
                                    "address": null,
                                    "preferences": {
                                        "newsletter": true,
                                        "notifications": {
                                            "email": true,
                                            "sms": false
                                        }
                                    }
                                }} />
                        </div>
                    </div>
                </div>
            </div>}
        </BodyTemplate>
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

const openPopup = () => {
    const popupWindow = window.open(
        '/issues/viewer/test',
        'Popup',
        'width=600,height=400,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=no'
    );

    // Focus the popup if it's already opened
    if (popupWindow) popupWindow.focus();
};


const BodyTemplate = ({ children, flag = false, tags = [] }) => {
    const [open, setOpen] = useState(false);
    const [children1, children2] = React.Children.toArray(children);
    const getTags = () => {
        return tags.map((tag) => {
            return (<span style={{ color: "#fff", backgroundColor: "#1466cf", fontSize: 12 }} className="inline-flex items-center px-1.5 py-0.3 text-xs rounded">
                {tag}
            </span>)
        })
    }
    return (
        <div className={`mainDark rounded-lg detailsActionContainer w-full`}>

            <div className="text-xs font-small space-x-3 flex w-full">
                {children1}
            </div>
            {open && (children2)}
            <div className='text-xs font-small cursor-pointer' style={{ color: "#2B84EC" }} onClick={() => setOpen(!open)}>
                <span>{open ? "Close" : "View"} Payload Data</span>
            </div>

            <div className="text-xs font-small space-x-3 flex w-full mt-3">
                {getTags()}
            </div>
        </div >
    )
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