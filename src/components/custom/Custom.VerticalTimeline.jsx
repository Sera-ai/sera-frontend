import React, { useState } from "react";
import { Chrono } from "react-chrono";
import JsonViewer from "../../pages/subpages/issues/partials/Partials.Issues.JsonViewer";
import JsonDiff from "../../pages/subpages/issues/partials/Partials.Issues.JsonDiff";
import { BetterExternalLinkIcon } from "../standard/Standard.Icons";

const VerticalTimeline = ({ incidentId = "test", incidentDetails }) => {
  if (!incidentDetails[incidentId]?.eventLog) {
    return;
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
        cardSubtitle: "0.85rem",
        cardText: "0.8rem",
        cardTitle: "1rem",
        title: "0.8rem",
      }}
      theme={{
        primary: "#ffffff",
        secondary: "#ffffff00",
        cardBgColor: "#191A2100",
        cardForeColor: "violet",
        titleColor: "#ffffff70",
        titleColorActive: "#ffffff",
        cardSubtitleColor: "#ffffff",
        cardTitleColor: "#ffffff",
      }}
    >
      {GetArrayItems(incidentDetails[incidentId].eventLog)}
    </Chrono>
  );
};

export default VerticalTimeline;

const eventDetail = (item, end) => {
  return (
    <BodyTemplate
      tags={["Entrypoint", "GET Request", "Authenticated"]}
      flag={item.flag}
    >
      {
        <p>
          {!end ? "Request received from" : "Response returned to"}
          <span
            style={{ color: "#fff", backgroundColor: "#ffffff30" }}
            className="inline-flex items-center mx-1 px-1.5 py-0.5 text-xs text-white rounded"
          >
            {item.eventDetails[0]}
          </span>
          {!end && (
            <span>
              at host
              <span
                style={{ color: "#fff", backgroundColor: "#ffffff30" }}
                className="inline-flex items-center px-1.5 mx-1 py-0.5 text-xs text-white rounded"
              >
                {item.eventDetails[1]}
              </span>
              <span>forwards to</span>
              <span
                style={{ color: "#fff", backgroundColor: "#ffffff30" }}
                className="inline-flex items-center px-1.5 mx-1 py-0.5 text-xs text-white rounded"
              >
                {item.eventDetails[2]}
              </span>
            </span>
          )}
        </p>
      }
      {
        <div>
          <div className="flex  space-x-10 w-full p-2">
            <div className=" w-full">
              <span className="flex  space-x-1">
                <h2 className="text-xs text-slate-800 dark:text-slate-100">
                  Header (JSON)
                </h2>
                <span className="cursor-pointer" onClick={() => openPopup()}>
                  <BetterExternalLinkIcon />
                </span>
              </span>
              <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                <JsonViewer
                  oas={{
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer YOUR_ACCESS_TOKEN",
                    "User-Agent": "MyApp (https://myapp.example.com)",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-API-KEY": "APIKEY123456",
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9",
                    Connection: "keep-alive",
                    Referer: "https://myapp.example.com",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex  space-x-10 w-full p-2">
            <div className=" w-full">
              <span className="flex  space-x-1">
                <h2 className="text-xs text-slate-800 dark:text-slate-100">
                  Body (JSON)
                </h2>
                <span className="cursor-pointer" onClick={() => openPopup()}>
                  <BetterExternalLinkIcon />
                </span>
              </span>
              <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                <JsonViewer
                  oas={{
                    username: "newuser",
                    password: "password123",
                    email: "newuser@example.com",
                    fullName: "New User",
                    age: 30,
                    address: {
                      street: "123 Main St",
                      city: "Anytown",
                      state: "Anystate",
                      zipCode: "12345",
                    },
                    preferences: {
                      newsletter: true,
                      notifications: {
                        email: true,
                        sms: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </BodyTemplate>
  );
};

const eventData = (item) => {
  const headers = {
    "User-Agent": "xsolla-api-client/1.0",
    Host: "api.xsolla.com",
    Accept: "application/json",
    Authorization: "Basic ZGVtb04C29sbGEuY29tOmRlbW8=",
    "Content-Type": "application/json",
  };

  return (
    <BodyTemplate tags={[item.tag]} flag={item.flag}>
      {
        <p>
          <span>Client Request details</span>
          <span
            style={{ color: "#fff", backgroundColor: "#ffffff50" }}
            className="inline-flex items-center px-1.5 mx-2 py-0.5 text-xs text-white rounded"
          >
            <a href="inventory/api.sample.com/pets/__post">{"GET"}</a>
          </span>
          <span className={"font-light"}>
            <a href="inventory/api.sample.com/" style={{ color: "#398af1" }}>
              {"api.sample.com"}
            </a>
          </span>
          <span style={{ color: "#fff" }} className={"mx-2"}>
            /
          </span>
          <span className={"font-light"}>
            <a
              href="inventory/api.sample.com/pets/"
              style={{ color: "#398af1" }}
            >
              {"pets"}
            </a>
          </span>
        </p>
      }
      {
        <div>
          <div className=" w-full">
            <span className="flex  space-x-1">
              <h2 className="text-xs text-slate-800 dark:text-slate-100">
                Header (JSON)
              </h2>
              <span className="cursor-pointer" onClick={() => openPopup()}>
                <BetterExternalLinkIcon />
              </span>
            </span>
            <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
              <JsonViewer
                oas={{
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: "Bearer YOUR_ACCESS_TOKEN",
                  "User-Agent": "MyApp (https://myapp.example.com)",
                  "X-Requested-With": "XMLHttpRequest",
                  "X-API-KEY": "APIKEY123456",
                  "Cache-Control": "no-cache",
                  Pragma: "no-cache",
                  "Accept-Encoding": "gzip, deflate, br",
                  "Accept-Language": "en-US,en;q=0.9",
                  Connection: "keep-alive",
                  Referer: "https://myapp.example.com",
                }}
              />
            </div>
          </div>
          <div className="flex  space-x-10 w-full p-2">
            <div className=" w-full">
              <span className="flex  space-x-1">
                <h2 className="text-xs text-slate-800 dark:text-slate-100">
                  Body (JSON)
                </h2>
                <span className="cursor-pointer" onClick={() => openPopup()}>
                  <BetterExternalLinkIcon />
                </span>
              </span>
              <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                <JsonViewer
                  oas={{
                    username: "newuser",
                    password: "password123",
                    email: "newuser@example.com",
                    fullName: "New User",
                    age: 30,
                    address: {
                      street: "123 Main St",
                      city: "Anytown",
                      state: "Anystate",
                      zipCode: "12345",
                    },
                    preferences: {
                      newsletter: true,
                      notifications: {
                        email: true,
                        sms: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex  space-x-10 w-full p-2">
            <div className=" w-full">
              <span className="flex  space-x-1">
                <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                  Endpoint OAS (JSON)
                </h2>
                <span className="cursor-pointer" onClick={() => openPopup()}>
                  <BetterExternalLinkIcon />
                </span>
              </span>
              <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                <JsonViewer oas={initoas} />
              </div>
            </div>
          </div>
        </div>
      }
    </BodyTemplate>
  );
};

const eventPlugin = (item) => {
  return (
    <BodyTemplate tags={[item.tag]} flag={item.flag}>
      {
        <p>
          <span>
            Builder (
            <a href={`/api.sample.com/items/post`} style={{ color: "#1466cf" }}>
              e0033a961
            </a>
            ) triggered
          </span>
          <span
            style={{ color: "#fff", backgroundColor: "#ffffff30" }}
            className="inline-flex items-center px-1.5 mr-2 py-0.5 mx-1 text-xs text-white rounded"
          >
            {"Plugin"}
          </span>
          <span
            style={{ color: "#fff", backgroundColor: "#ffffff30" }}
            className="inline-flex items-center px-1.5 mr-2 py-0.5 mx-1 text-xs text-white rounded"
          >
            {"Header Check"}
          </span>
          <span
            style={{ color: "#fff", backgroundColor: "#ffffff30" }}
            className="inline-flex items-center px-1.5 mr-2 py-0.5 mx-1 text-xs text-white rounded"
          >
            {"1.0.3"}
          </span>
        </p>
      }

      {
        <div>
          <div className="flex  w-full p-2">
            <p className={"text-sm text-slate-100"}>
              Header Check is a robust and efficient plugin designed to
              streamline the process of diagnosing and identifying issues within
              the headers of API responses. This tool is indispensable for
              developers and QA engineers who regularly interact with APIs and
              need to ensure the integrity and correctness of response headers.
            </p>
          </div>
          <div className="flex  w-full p-2">
            <div className=" w-full">
              <span className="flex  space-x-1">
                <h2 className="text-xs text-slate-800 dark:text-slate-100">
                  Header (JSON)
                </h2>
                <span className="cursor-pointer" onClick={() => openPopup()}>
                  <BetterExternalLinkIcon />
                </span>
              </span>{" "}
              <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                <JsonDiff
                  originalJson={{
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "ern34j399ekemm2nsi",
                    "User-Agent": "MyApp (https://myapp.example.com)",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-API-KEY": "APIKEY123456",
                    "Cache-Control": "no-cache",
                    Pragma: "no-cache",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "en-US,en;q=0.9",
                    Connection: "keep-alive",
                    Referer: "https://myapp.example.com",
                  }}
                  modifiedJson={{
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer YOUR_ACCESS_TOKEN",
                    "User-Agent": "MyApp (https://myapp.example.com)",
                    "X-Requested-With": "XMLHttpRequest",
                    "X-API-KEY": "Your API Key",
                    Connection: "keep-alive",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex  space-x-10 w-full p-2">
            <div className=" w-full">
              <span className="flex  space-x-1">
                <h2 className="text-xs text-slate-800 dark:text-slate-100">
                  Body (JSON)
                </h2>
                <span className="cursor-pointer" onClick={() => openPopup()}>
                  <BetterExternalLinkIcon />
                </span>
              </span>
              <div className="overflow-x-auto secondaryDark rounded-xl p-2 mt-1 flex flex-col">
                <JsonDiff
                  originalJson={{
                    username: "newuser",
                    password: "password123",
                    email: "newuser@example.com",
                    fullName: "New User",
                    age: 30,
                    address: {
                      street: "123 Main St",
                      city: "Anytown",
                      state: "Anystate",
                      zipCode: "12345",
                    },
                    preferences: {
                      newsletter: true,
                      notifications: {
                        email: true,
                        sms: false,
                      },
                    },
                  }}
                  modifiedJson={{
                    username: "newuser",
                    password: null,
                    email: "newuser@example.com",
                    fullName: "New User",
                    age: 30,
                    address: null,
                    preferences: {
                      newsletter: true,
                      notifications: {
                        email: true,
                        sms: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </BodyTemplate>
  );
};

const GetArrayItems = (items) => {
  const timelineContainers = [];
  items.map((item, int) => {
    switch (item.type) {
      case "eventDetail":
        timelineContainers.push(eventDetail(item, int == items.length - 1));
        break;
      case "eventNotice":
        timelineContainers.push(eventData(item));
        break;
      case "eventPlugin":
        timelineContainers.push(eventPlugin(item));
        break;
      case "eventRequest":
        timelineContainers.push(eventData(item));
        break;
      default:
        timelineContainers.push(
          <div>
            <h1>{"test" + int}</h1>
          </div>
        );
        break;
    }
  });

  return timelineContainers;
};

const openPopup = () => {
  const popupWindow = window.open(
    "/issues/viewer/test",
    "Popup",
    "width=600,height=400,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=no"
  );

  // Focus the popup if it's already opened
  if (popupWindow) popupWindow.focus();
};

const BodyTemplate = ({ children, flag = false, tags = [] }) => {
  const [open, setOpen] = useState(false);
  const [children1, children2] = React.Children.toArray(children);
  const getTags = () => {
    return tags.map((tag) => {
      return (
        <span
          style={{ color: "#fff", backgroundColor: "#1466cf", fontSize: 12 }}
          className="inline-flex items-center px-1.5 py-0.3 text-xs rounded"
        >
          {tag}
        </span>
      );
    });
  };
  return (
    <div className={`mainDark rounded-lg detailsActionContainer w-full`}>
      <div className="text-xs font-small space-x-3 flex w-full">
        {children1}
      </div>
      {open && children2}
      <div
        className="text-xs font-small cursor-pointer"
        style={{ color: "#2B84EC" }}
        onClick={() => setOpen(!open)}
      >
        <span>{open ? "Close" : "View"} Payload Data</span>
      </div>

      <div className="text-xs font-small space-x-3 flex w-full mt-3">
        {getTags()}
      </div>
    </div>
  );
};

const initoas = {
  openapi: "3.0.1",
  info: {
    title: "Sample API",
    version: "1.0.0",
    description: "A simple API example",
  },
  servers: [
    {
      url: "https://api.sample.com/v1",
    },
  ],
  paths: {
    "/pets": {
      get: {
        summary: "List all pets",
        description: "Returns a list of pets",
      },
      post: {
        summary: "Add a new pet",
        description: "Adds a new pet to the list",
      },
    },
    "/pets/{petId}": {
      get: {
        summary: "Find pet by ID",
        description: "Returns a single pet",
      },
      delete: {
        summary: "Deletes a pet",
        description: "Deletes a pet by its ID",
      },
      patch: {
        summary: "Update a pet",
        description: "Updates a pet's details by its ID",
      },
    },
    "/users": {
      post: {
        summary: "Create a new user",
        description: "Registers a new user",
      },
      get: {
        summary: "List all users",
        description: "Returns a list of all registered users",
      },
    },
    "/users/{userId}/settings": {
      put: {
        summary: "Update user settings",
        description: "Updates settings for a specific user",
      },
      get: {
        summary: "Get user settings",
        description: "Retrieves settings for a specific user",
      },
    },
  },
};
