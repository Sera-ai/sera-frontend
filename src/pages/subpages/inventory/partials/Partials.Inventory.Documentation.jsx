import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import MDEditor from "./Partials.Inventory.MDEditor";
import OasEditor from "./Partials.Inventory.OasEditor";
import Header from "../../../../components/custom/Custom.Header.Title";

function ApiDocumentation({
  oas,
  setOas,
  host,
  setSelectedEndpoint,
  endpoint = null,
}) {
  const matchMethod = ["__post", "__get", "__delete", "__put", "__patch"];
  const [editDocs, setEditDocs] = useState(false);
  const [manageOAS, setManageOAS] = useState(false);
  const [isError, setIsError] = useState(false);
  const [detailsPath, setDetails] = useState(null);

  const location = useLocation();
  const { pathname } = location;
  const paths = decodeURIComponent(pathname).split("/");
  paths.shift(); //remove blank
  paths.shift(); //remove inventory
  let method = null;

  if (matchMethod.includes(paths[paths.length - 1])) {
    method = paths.pop().replace("__", "").toUpperCase();
  }

  const oasEditorRef = useRef();

  const updateChildState = () => {
    oasEditorRef.current.settingState();
  };

  const MDEditorRef = useRef();

  const updateMarkdown = () => {
    MDEditorRef.current.saveOasItem();
  };

  const updateOas = () => {};

  return (
    <Header
      title={"Inventory Documentation"}
      tier={2}
      buttons={
        <Header2
          paths={paths}
          method={method}
          setEditDocs={setEditDocs}
          editDocs={editDocs}
          manageOAS={manageOAS}
          setManageOAS={setManageOAS}
          isError={isError}
          oas={oas}
          updateMarkdown={updateMarkdown}
          updateChildState={updateChildState}
        />
      }
    >
      {/* Table */}
      <div className="overflow-x-auto flex h-full w-full">
        {/* Action Div */}
        {manageOAS ? <OasSide oas={oas} /> : null}

        {/* Data Div */}
        <div
          className={`flex w-full h-full flex-row pt-1 ${
            !editDocs && "hideToolbar"
          }`}
        >
          {manageOAS ? (
            <OasEditor
              ref={oasEditorRef}
              oas={oas}
              setOas={setOas}
              setIsError={setIsError}
              darker
            />
          ) : (
            <div className="flex flex-col w-full h-full overflow-y-scroll no-scrollbar p-6 gap-14">
              {!endpoint && (
                <div className="gap-2 flex flex-col">
                  <span className={"docHeading"}>
                    {oas.info?.title || host}
                  </span>
                  <div className={"divider"} />
                  <MDEditor
                    initialMarkdown={
                      oas.info?.description ||
                      `No description set for this OAS.`
                    }
                    saveMarkdown={updateOas}
                    ref={MDEditorRef}
                    edit={false}
                    mini
                  />
                </div>
              )}
              {grabOasParts({
                oas,
                setDetails,
                endpoint,
                endpointMethod: method,
              })}
            </div>
          )}

          {detailsPath ? (
            <GetDetails
              oas={oas}
              host={host}
              details={detailsPath}
              endpoint={endpoint}
              setDetails={setDetails}
              setSelectedEndpoint={setSelectedEndpoint}
            />
          ) : null}
        </div>
      </div>
    </Header>
  );
}

export default ApiDocumentation;

function OasSide({ oas }) {
  const paths = oas.paths;

  const EndpointItem = ({ method, path }) => (
    <div className={`flex justify-between items-center`}>
      <span className={`text-sm uppercase  ${method.toUpperCase()}-color`}>
        {method}
      </span>
      <span className="text-xs">{path}</span>
    </div>
  );

  const PathDropdown = ({ path, methods }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
      <div className="">
        <button
          onClick={toggleDropdown}
          className="flex text-left items-center"
        >
          <span className="font-medium text-sm">{path.replace("/", "")}</span>
          <span className="material-icons ml-1" style={{ fontSize: 17 }}>
            {isOpen ? "expand_less" : "expand_more"}
          </span>
        </button>
        {isOpen && (
          <div className="mt-2 space-y-2">
            {Object.keys(methods).map((method) => (
              <EndpointItem
                key={`${path}-${method}`}
                method={method}
                path={path}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const OASEndpoints = () => {
    return (
      <div className="space-y-3">
        {Object.entries(paths).map(([path, methods]) => (
          <PathDropdown key={path} path={path} methods={methods} />
        ))}
      </div>
    );
  };

  return (
    <div className="mainDark rounded-lg pr-4 space-y-4 detailsActionContainer2">
      <OASEndpoints />
    </div>
  );
}

function Header2({
  paths,
  method,
  setEditDocs,
  editDocs,
  manageOAS,
  setManageOAS,
  oas,
  isError,
  updateChildState,
  updateMarkdown,
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="gap-2 flex justify-center">
        <button
          onClick={() => setEditDocs(!editDocs)}
          className={`${
            editDocs
              ? "headerButton  text-white"
              : "headerButton  rounded-md border border-slate-200 dark:border-slate-700 text-white"
          }${manageOAS ? " hidden" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 15 16"
            fill="none"
          >
            <path
              d="M3.125 12.375H4L9.39062 6.98438L8.51562 6.10938L3.125 11.5V12.375ZM12.0625 6.07812L9.40625 3.45312L10.2812 2.57813C10.5208 2.33854 10.8152 2.21875 11.1644 2.21875C11.5131 2.21875 11.8073 2.33854 12.0469 2.57813L12.9219 3.45312C13.1615 3.69271 13.2865 3.98187 13.2969 4.32062C13.3073 4.65896 13.1927 4.94792 12.9531 5.1875L12.0625 6.07812ZM2.5 13.625C2.32292 13.625 2.17458 13.565 2.055 13.445C1.935 13.3254 1.875 13.1771 1.875 13V11.2344C1.875 11.151 1.89063 11.0704 1.92188 10.9925C1.95313 10.9142 2 10.8438 2.0625 10.7812L8.5 4.34375L11.1562 7L4.71875 13.4375C4.65625 13.5 4.58604 13.5469 4.50812 13.5781C4.42979 13.6094 4.34896 13.625 4.26562 13.625H2.5ZM8.95312 6.54688L8.51562 6.10938L9.39062 6.98438L8.95312 6.54688Z"
              fill="white"
              fillOpacity="0.7"
            />
          </svg>
        </button>

        <button
          onClick={() => {
            if (!isError) updateChildState();
          }}
          className={
            !isError
              ? `headerButton  dark:text-slate-100 "${
                  manageOAS ? "" : " hidden"
                }`
              : `headerButton  rounded-md border border-slate-200 dark:border-slate-700 dark:text-slate-600 "${
                  manageOAS ? "" : " hidden"
                }`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.9578 4.58281L11.4172 2.04219C11.3 1.925 11.1562 1.83906 11 1.79219V1.75H2.25C1.97344 1.75 1.75 1.97344 1.75 2.25V13.75C1.75 14.0266 1.97344 14.25 2.25 14.25H13.75C14.0266 14.25 14.25 14.0266 14.25 13.75V5.28906C14.25 5.02344 14.1453 4.77031 13.9578 4.58281ZM6 2.875H10V4.5H6V2.875ZM13.125 13.125H2.875V2.875H5V5C5 5.27656 5.22344 5.5 5.5 5.5H10.5C10.7766 5.5 11 5.27656 11 5V3.21563L13.125 5.34062V13.125ZM8 6.90625C6.75781 6.90625 5.75 7.91406 5.75 9.15625C5.75 10.3984 6.75781 11.4062 8 11.4062C9.24219 11.4062 10.25 10.3984 10.25 9.15625C10.25 7.91406 9.24219 6.90625 8 6.90625ZM8 10.4062C7.30937 10.4062 6.75 9.84688 6.75 9.15625C6.75 8.46562 7.30937 7.90625 8 7.90625C8.69063 7.90625 9.25 8.46562 9.25 9.15625C9.25 9.84688 8.69063 10.4062 8 10.4062Z"
              fill="white"
            />
          </svg>
        </button>

        <button
          onClick={() => {
            updateMarkdown();
          }}
          className={`headerButton  dark:text-slate-100 rounded-md border border-slate-200 dark:border-slate-700 dark:text-slate-600 "${
            !manageOAS ? "" : " hidden"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.9578 4.58281L11.4172 2.04219C11.3 1.925 11.1562 1.83906 11 1.79219V1.75H2.25C1.97344 1.75 1.75 1.97344 1.75 2.25V13.75C1.75 14.0266 1.97344 14.25 2.25 14.25H13.75C14.0266 14.25 14.25 14.0266 14.25 13.75V5.28906C14.25 5.02344 14.1453 4.77031 13.9578 4.58281ZM6 2.875H10V4.5H6V2.875ZM13.125 13.125H2.875V2.875H5V5C5 5.27656 5.22344 5.5 5.5 5.5H10.5C10.7766 5.5 11 5.27656 11 5V3.21563L13.125 5.34062V13.125ZM8 6.90625C6.75781 6.90625 5.75 7.91406 5.75 9.15625C5.75 10.3984 6.75781 11.4062 8 11.4062C9.24219 11.4062 10.25 10.3984 10.25 9.15625C10.25 7.91406 9.24219 6.90625 8 6.90625ZM8 10.4062C7.30937 10.4062 6.75 9.84688 6.75 9.15625C6.75 8.46562 7.30937 7.90625 8 7.90625C8.69063 7.90625 9.25 8.46562 9.25 9.15625C9.25 9.84688 8.69063 10.4062 8 10.4062Z"
              fill="white"
            />
          </svg>
        </button>
        <button
          onClick={() => setManageOAS(!manageOAS)}
          className={
            manageOAS
              ? "headerButton bg-indigo-500  text-white"
              : "headerButton  rounded-md border border-slate-200 dark:border-slate-700 text-white"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M13 11H15M9 8H15M11 5H15M1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3Z"
              stroke="white"
              strokeOpacity="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function grabOasParts({ oas, setDetails, setOas, endpoint, endpointMethod }) {
  return Object.keys(oas.paths).map((path) => {
    const endpointPath = "/" + endpoint?.split("/").slice(0, -1).join("/");
    const endpointMethod = endpoint
      ?.split("/")
      [endpoint.split("/").length - 1].replace("__", "")
      .toUpperCase();

    console.log(endpointPath);
    console.log(endpointMethod);

    if (endpoint && path != endpointPath) return null;
    return (
      <div className="gap-2 flex flex-col">
        <span className={"docHeading"}>{path}</span>
        <div className={"divider"} />
        {Object.keys(oas.paths[path]).map((methodbop) => {
          const method = methodbop.toUpperCase();
          const saveMarkdown = (md) => {
            console.log(md);
          };
          if (endpoint && method != endpointMethod) return null;
          return (
            <>
              <div
                onClick={() =>
                  setDetails({
                    path: path,
                    summary: oas.paths[path][methodbop]?.summary,
                    method,
                  })
                }
                className={`p-4 mr-2 mt-4 inventoryBadge gap-2 flex flex-row cursor-pointer`}
              >
                <span
                  className={`inline-flex items-center px-1.5 py-0.5 text-xs text-white rounded ${method}-color ${method}-bg-color`}
                >
                  {method}
                </span>
                {oas.paths[path][methodbop]?.summary}
              </div>
              <MDEditor
                initialMarkdown={
                  oas.paths[path][methodbop]?.description ||
                  `No description set for ${path} - ${method}.`
                }
                saveMarkdown={saveMarkdown}
                edit={false}
                mini
              />
            </>
          );
        })}
      </div>
    );
  });
}

function GetDetails({
  oas,
  details,
  setDetails,
  host,
  endpoint,
  setSelectedEndpoint,
}) {
  return (
    <div
      style={{ width: "50%", maxWidth: "600px", borderRadius: "3px" }}
      className="flex h-full flex-col no-scrollbar secondaryDark"
    >
      <div className="flex flex-row pr-4 pt-4 gap-4">
        <div className="flex flex-grow"></div>
        <div className="flex gap-2">
          {!endpoint && (
            <div
              onClick={() => {
                setSelectedEndpoint(
                  (
                    details.path.replace("{", "%7B").replace("}", "%7D") +
                    "/__" +
                    details.method.toLowerCase()
                  ).substring(1)
                );
              }}
              style={{ borderColor: "#ffffff70" }}
              className={`headerButton rounded-md border border-slate-200 dark:border-slate-700 text-white`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M5 10L1 8V3L5 1L9 3M5 10L9 8M5 10V15L9 17L13 15V10M9 8V3M9 8L13 10M9 3L13 1L17 3V8L13 10"
                  stroke={"#FFFFFF50"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          <div
            onClick={() => {}}
            style={{ borderColor: "#2B84EC" }}
            className={`headerButton rounded-md border border-slate-200 dark:border-slate-700 text-white`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 20 22"
              fill="none"
            >
              <path
                d="M17.875 5.22983C18.2187 5.46529 18.5041 5.7488 18.7018 6.09119C18.8995 6.43357 19.0025 6.82246 19 7.21783V14.5018C19 15.3108 18.557 16.0568 17.842 16.4498L11.092 20.7198C10.7574 20.9036 10.3818 20.9999 10 20.9999C9.61824 20.9999 9.24224 20.9036 8.908 20.7198L2.158 16.4498C1.80817 16.2587 1.51612 15.977 1.31241 15.6343C1.1087 15.2916 1.0008 14.9005 1 14.5018V7.21683C1 6.40783 1.443 5.66283 2.158 5.22983L8.908 1.28983C9.25254 1.09987 9.63956 1.00024 10.033 1.00024C10.4224 1.00024 10.8135 1.09987 11.158 1.28983L17.908 5.22983H17.875Z"
                stroke="white"
                strokeOpacity="1.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5 8.42174C13.812 8.60174 14.003 8.93674 14 9.29774V12.5747C14 12.9387 13.803 13.2747 13.485 13.4517L10.485 15.3737C10.3366 15.456 10.1697 15.4992 10 15.4992C9.83031 15.4992 9.6634 15.456 9.515 15.3737L6.515 13.4517C6.35872 13.3651 6.22851 13.2381 6.13794 13.084C6.04737 12.93 5.99974 12.7545 6 12.5757V9.29774C6 8.93374 6.197 8.59774 6.514 8.42074L9.514 6.63074C9.825 6.45674 10.204 6.45674 10.514 6.63074L13.514 8.42074H13.5V8.42174Z"
                stroke="#2B84EC"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div
          onClick={() => setDetails(null)}
          className="cursor-pointer sidebarItem flex items-center justify-center sidebarButton h-[36px] w-[36px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M9.06058 8.00008L12.0293 5.03133C12.1702 4.89068 12.2495 4.69982 12.2497 4.50074C12.2498 4.30166 12.1709 4.11066 12.0303 3.96977C11.8896 3.82887 11.6988 3.74962 11.4997 3.74944C11.3006 3.74927 11.1096 3.82818 10.9687 3.96883L7.99996 6.93758L5.03121 3.96883C4.89031 3.82793 4.69922 3.74878 4.49996 3.74878C4.3007 3.74878 4.1096 3.82793 3.96871 3.96883C3.82781 4.10973 3.74866 4.30082 3.74866 4.50008C3.74866 4.69934 3.82781 4.89043 3.96871 5.03133L6.93746 8.00008L3.96871 10.9688C3.82781 11.1097 3.74866 11.3008 3.74866 11.5001C3.74866 11.6993 3.82781 11.8904 3.96871 12.0313C4.1096 12.1722 4.3007 12.2514 4.49996 12.2514C4.69922 12.2514 4.89031 12.1722 5.03121 12.0313L7.99996 9.06258L10.9687 12.0313C11.1096 12.1722 11.3007 12.2514 11.5 12.2514C11.6992 12.2514 11.8903 12.1722 12.0312 12.0313C12.1721 11.8904 12.2513 11.6993 12.2513 11.5001C12.2513 11.3008 12.1721 11.1097 12.0312 10.9688L9.06058 8.00008Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className={"docHeading mx-8 pt-4"}>{details.summary}</span>
        <div
          className={`mx-8 p-1 flex mainDark`}
          style={{ borderRadius: "3px" }}
        >
          <span
            className={`inline-flex items-center px-1.5 py-0.5 text-xs text-white rounded ${details.method}-color ${details.method}-bg-color`}
          >
            {details.method}
          </span>
          <span className="codetext px-4 ">https://{host + details.path}</span>
        </div>
        <div className="divider"></div>
      </div>
      <div className="flex flex-col overflow-y-scroll">
        <APIDocumentation
          oas={oas}
          path={details.path}
          method={details.method}
        />
      </div>
    </div>
  );
}

// Main Component to display all tables
const APIDocumentation = ({ oas, path, method }) => {
  const endpoint = oas.paths[path][method.toLocaleLowerCase()];

  const reqParams = getRequestParameters(endpoint, oas);
  const resParams = getResponseParameters(endpoint, oas);
  console.log(reqParams);
  console.log(resParams);
  return (
    <>
      <div className="p-8">
        <h2 style={{ fontWeight: "bold" }}>Request</h2>
        <div
          className="p-4 my-4 flex flex-col gap-12 mainDark rounded"
          style={{ fontSize: 14 }}
        >
          {Object.keys(reqParams).map((type) => {
            if (reqParams[type].length == 0) return;
            return (
              <ParameterTable
                key={type}
                title={type.toUpperCase()}
                parameters={reqParams[type]}
              />
            );
          })}
        </div>{" "}
      </div>
      <div className="p-8">
        <h2 style={{ fontWeight: "bold" }}>Response</h2>
        <div
          className="p-4 my-4 flex flex-col gap-12 mainDark rounded"
          style={{ fontSize: 14 }}
        >
          {Object.keys(resParams).map((type) => {
            if (resParams[type].length == 0) return;
            return (
              <ParameterTable
                key={type}
                title={type.toUpperCase()}
                parameters={resParams[type]}
              />
            );
          })}
        </div>{" "}
      </div>
    </>
  );
};

const ParameterTable = ({ title, parameters }) => (
  <div className="flex flex-col w-full gap-4 paramTable">
    <h2>{title}</h2>
    <table>
      <thead
        className={"border-b-"}
        style={{ borderBottomWidth: 1, borderBottomColor: "#ffffff50" }}
      >
        <tr>
          <th
            style={{
              textAlign: "right",
              paddingRight: 15,
              paddingBottom: 10,
              paddingTop: 10,
              width: 150,
              fontWeight: 300,
            }}
          >
            Name
          </th>
          <th
            style={{
              textAlign: "left",
              paddingLeft: 15,
              paddingBottom: 10,
              paddingTop: 10,
              fontWeight: 300,
            }}
          >
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {parameters.map((param) => (
          <tr
            key={param.name}
            style={{ borderBottomWidth: 1, borderBottomColor: "#ffffff20" }}
          >
            <td
              className="flex flex-col codetext"
              style={{
                textAlign: "right",
                paddingRight: 15,
                paddingBottom: 10,
                paddingTop: 10,
                width: 150,
              }}
            >
              <div>{param.name}</div>
              <div style={{ color: "#2B84EC" }}>{param.schema?.type}</div>
            </td>
            <td
              style={{
                textAlign: "left",
                paddingLeft: 15,
                paddingBottom: 10,
                paddingTop: 10,
                color: "#ffffff60",
                verticalAlign: "top",
              }}
            >
              {param.description || "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

function getRequestParameters(endpoint, api) {
  let parameters = { query: [], body: [], path: [], cookie: [], header: [] };
  parameters.body = extractRequestBodyDetails(endpoint, api); // Extract requestBody details
  //console.log("After extractRequestBodyDetails:", parameters.body); // Log the body after extraction
  if (endpoint.parameters) {
    endpoint.parameters.forEach((param) => {
      switch (param.in) {
        case "query":
          parameters.query.push(param);
          break;
        case "body":
          // This case may not be necessary for OpenAPI 3.0 as 'body' parameters are replaced by 'requestBody'.
          parameters.body.push(param);
          break;
        case "path":
          parameters.path.push(param);
          break;
        case "cookie":
          parameters.cookie.push(param);
          break;
        case "header":
          parameters.header.push(param);
          break;
      }
    });
  }
  return parameters;
}

function resolveRef(oas, ref) {
  const parts = ref.replace(/^#\//, "").split("/");
  let currentPart = oas;
  for (const part of parts) {
    currentPart = currentPart[part];
  }
  //console.log("Resolved $ref:", currentPart); // Log the resolved reference
  return currentPart;
}

function extractSchemaProperties(schema, parameters, oas) {
  if (schema.properties) {
    //console.log("Schema has properties:", Object.keys(schema.properties)); // Log properties keys
    for (const propName in schema.properties) {
      const prop = schema.properties[propName];
      parameters.push({
        name: propName,
        schema: { type: prop.type },
        description: prop.description || "No description available",
      });
    }
  } else if (schema.$ref) {
    //console.log("Schema has $ref:", schema.$ref); // Log $ref
    const resolvedSchema = resolveRef(oas, schema.$ref);
    extractSchemaProperties(resolvedSchema, parameters, oas);
  } else {
    //console.log("Schema does not have properties or $ref:", schema); // Log unexpected schema format
  }
}

function extractRequestBodyDetails(endpoint, oas) {
  let parameters = [];
  //console.log("Extracting requestBody details"); // Initial log

  if (endpoint.requestBody && endpoint.requestBody.content) {
    /*console.log(
        "Endpoint has requestBody:",
        Object.keys(endpoint.requestBody.content)
      ); // Log content types
      */
    for (const contentType in endpoint.requestBody.content) {
      const content = endpoint.requestBody.content[contentType];
      let schema = content.schema;
      if (schema) {
        //console.log("Processing schema for contentType:", contentType); // Log content type being processed
        extractSchemaProperties(schema, parameters, oas);
      } else {
        //console.log("No schema found for contentType:", contentType); // Log missing schema
      }
    }
  } else {
    //console.log("No requestBody content found"); // Log if requestBody or its content is missing
  }

  return parameters;
}

function getResponseParameters(endpoint, oas) {
  let responseParameters = {
    "Status Codes": [],
    headers: [], // This will aggregate headers from all responses
    // Bodies are added dynamically below based on status codes
  };

  // Dynamically add body keys based on status codes
  Object.keys(endpoint.responses).forEach((statusCode) => {
    responseParameters[`body (${statusCode})`] = []; // Initialize array for body parameters per status code
  });

  // Loop over all response codes to fill in the details
  Object.keys(endpoint.responses).forEach((statusCode) => {
    const response = endpoint.responses[statusCode];
    let statusCodeDetail = {
      name: statusCode,
      schema: { type: null }, // Initialize as null; replace as needed
      description: response.description || null,
    };

    // Extract body parameters if applicable
    if (response.content) {
      Object.keys(response.content).forEach((contentType) => {
        const content = response.content[contentType];
        if (content.schema) {
          // Directly use the status code to categorize body parameters
          extractSchemaProperties(
            content.schema,
            responseParameters[`body (${statusCode})`],
            oas
          );
          statusCodeDetail.schema.type = "null"; // Detail the response type, e.g., for a successful response
        }
      });
    }

    // Extract headers
    if (response.headers) {
      Object.keys(response.headers).forEach((headerName) => {
        const header = response.headers[headerName];
        let schema = header.schema ? header.schema : {};
        let description = header.description
          ? header.description
          : "No description available";

        // If the header schema is a $ref, resolve it
        if (schema.$ref) {
          schema = resolveRef(oas, schema.$ref);
        }

        responseParameters.headers.push({
          name: headerName,
          schema: { type: schema.type },
          description: description,
        });
      });
    }

    responseParameters["Status Codes"].push(statusCodeDetail);
  });

  return responseParameters;
}
