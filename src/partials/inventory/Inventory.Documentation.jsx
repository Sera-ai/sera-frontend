import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import MDEditor from "./Inventory.MDEditor"
import OasEditor from "./Inventory.OasEditor"


function ApiDetails({ oas, setOas }) {

  const matchMethod = ["__post", "__get", "__delete", "__put", "__patch"]
  const [editDocs, setEditDocs] = useState(false)
  const [manageOAS, setManageOAS] = useState(false)
  const [isError, setIsError] = useState(false);


  const location = useLocation();
  const { pathname } = location;
  const paths = decodeURIComponent(pathname).split("/")
  paths.shift() //remove blank
  paths.shift() //remove inventory
  let method = null

  if (matchMethod.includes(paths[paths.length - 1])) {
    method = (paths.pop()).replace("__", "").toUpperCase()
  }

  const oasEditorRef = useRef();
  const MDEditorRef = useRef();

  const updateChildState = () => {
    oasEditorRef.current.settingState();
  };

  const updateMarkdown = () => {
    MDEditorRef.current.saveOasItem();
  };

  return (
    <div className="col-span-full h-full mainDark p-8">
      <Header paths={paths} method={method} setEditDocs={setEditDocs} editDocs={editDocs} manageOAS={manageOAS} setManageOAS={setManageOAS} isError={isError} oas={oas} updateMarkdown={updateMarkdown} updateChildState={updateChildState} />
      <div>
        {/* Table */}
        <div className="overflow-x-auto flex flex-col">
          <div className="overflow-x-auto flex flex-column w-full pt-8">
            {/* Action Div */}
            {manageOAS ? <OasSide oas={oas} /> : null}

            {/* Data Div */}
            <div className="flex w-full h-full">
              {manageOAS ? <OasEditor ref={oasEditorRef} oas={oas} setOas={setOas} setIsError={setIsError} darker/> : <MDEditor ref={MDEditorRef} edit={editDocs} oas={oas} setOas={setOas} />}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default ApiDetails;


function OasSide({ oas }) {
  const paths = oas.paths;

  const EndpointItem = ({ method, path }) => (
    <div className={`flex justify-between items-center`}>
      <span className={`text-sm uppercase  ${method.toUpperCase()}-color`}>{method}</span>
      <span className="text-xs">{path}</span>
    </div>
  );

  const PathDropdown = ({ path, methods }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
      <div className="">
        <button onClick={toggleDropdown} className="flex text-left items-center">
          <span className="font-medium text-sm">{path.replace("/", "")}</span>
          <span className="material-icons ml-1" style={{ fontSize: 17 }}>{isOpen ? 'expand_less' : 'expand_more'}</span>

        </button>
        {isOpen && (
          <div className="mt-2 space-y-2">
            {Object.keys(methods).map((method) => (
              <EndpointItem key={`${path}-${method}`} method={method} path={path} />
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

function Header({ paths, method, setEditDocs, editDocs, manageOAS, setManageOAS, oas, isError, updateChildState, updateMarkdown }) {
  return (
    <header className="">
      <div className="flex justify-between items-center">
        <div className="">
          <div className="flex flex-column space-x-4 mb-1">
            <span className={`inline-flex items-center px-1.5 py-0.5 text-xs text-white rounded PUT-color PUT-bg-color`}>Doc</span>
            {paths.map((path, index) => {
              // Create the path for the Link up to the current breadcrumb
              let toPath = `inventory/${paths.slice(0, index + 1).join('/')}`;
              if (index == 0) toPath = toPath + "/"
              return (
                <React.Fragment key={index}>
                  <h2
                    style={index === paths.length - 1 ? { color: "#2B84EC" } : {}}
                    className={`font-regular text-slate-800 text-md dark:text-slate-${index === 0 ? "100" : "400"} ${index !== paths.length - 1 ? "underline cursor-pointer" : ""}`}
                  >
                    <Link to={toPath}>
                      {path}
                    </Link>
                  </h2>
                  {index < paths.length - 1 && <span className="text-slate-800 dark:text-slate-400 mx-2">/</span>}
                </React.Fragment>
              );
            })}
          </div>
          <div className="overflow-x-auto secondaryDark rounded-md mt-2 py-1 px-2 flex flex-col">
            <h2 className="font-light text-slate-800 dark:text-slate-100 text-xs">{(oas.info?.description.split("\n")[0] ?? "Add the info.description field to your OAS to edit this")}</h2>
          </div>
        </div>
        <div className="space-x-2.5 flex justify-center">
          <button onClick={() => setEditDocs(!editDocs)} className={`${editDocs ? "btn bg-indigo-500 hover:bg-indigo-600 text-white" : "btn hover:bg-indigo-600 rounded-md border border-slate-200 dark:border-slate-700 text-white"}${manageOAS ? " hidden" : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 16" fill="none">
              <path d="M3.125 12.375H4L9.39062 6.98438L8.51562 6.10938L3.125 11.5V12.375ZM12.0625 6.07812L9.40625 3.45312L10.2812 2.57813C10.5208 2.33854 10.8152 2.21875 11.1644 2.21875C11.5131 2.21875 11.8073 2.33854 12.0469 2.57813L12.9219 3.45312C13.1615 3.69271 13.2865 3.98187 13.2969 4.32062C13.3073 4.65896 13.1927 4.94792 12.9531 5.1875L12.0625 6.07812ZM2.5 13.625C2.32292 13.625 2.17458 13.565 2.055 13.445C1.935 13.3254 1.875 13.1771 1.875 13V11.2344C1.875 11.151 1.89063 11.0704 1.92188 10.9925C1.95313 10.9142 2 10.8438 2.0625 10.7812L8.5 4.34375L11.1562 7L4.71875 13.4375C4.65625 13.5 4.58604 13.5469 4.50812 13.5781C4.42979 13.6094 4.34896 13.625 4.26562 13.625H2.5ZM8.95312 6.54688L8.51562 6.10938L9.39062 6.98438L8.95312 6.54688Z" fill="white" fillOpacity="0.7" />
            </svg>
            <span className="hidden xs:block ml-2">Edit</span>
          </button>

          <button onClick={() => { if (!isError) updateChildState() }} className={!isError ? `btn bg-indigo-500 hover:bg-indigo-600 dark:text-slate-100 "${manageOAS ? "" : " hidden"}` : `btn hover:bg-indigo-600 rounded-md border border-slate-200 dark:border-slate-700 dark:text-slate-600 "${manageOAS ? "" : " hidden"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 16" fill="none">
              <path d="M3.125 12.375H4L9.39062 6.98438L8.51562 6.10938L3.125 11.5V12.375ZM12.0625 6.07812L9.40625 3.45312L10.2812 2.57813C10.5208 2.33854 10.8152 2.21875 11.1644 2.21875C11.5131 2.21875 11.8073 2.33854 12.0469 2.57813L12.9219 3.45312C13.1615 3.69271 13.2865 3.98187 13.2969 4.32062C13.3073 4.65896 13.1927 4.94792 12.9531 5.1875L12.0625 6.07812ZM2.5 13.625C2.32292 13.625 2.17458 13.565 2.055 13.445C1.935 13.3254 1.875 13.1771 1.875 13V11.2344C1.875 11.151 1.89063 11.0704 1.92188 10.9925C1.95313 10.9142 2 10.8438 2.0625 10.7812L8.5 4.34375L11.1562 7L4.71875 13.4375C4.65625 13.5 4.58604 13.5469 4.50812 13.5781C4.42979 13.6094 4.34896 13.625 4.26562 13.625H2.5ZM8.95312 6.54688L8.51562 6.10938L9.39062 6.98438L8.95312 6.54688Z" fill="white" fillOpacity="0.7" />
            </svg>
            <span className="hidden xs:block ml-2">Save Changes</span>
          </button>

          <button onClick={() => { updateMarkdown() }} className={`btn bg-indigo-500 hover:bg-indigo-600 dark:text-slate-100 "${!manageOAS ? "" : " hidden"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 16" fill="none">
              <path d="M3.125 12.375H4L9.39062 6.98438L8.51562 6.10938L3.125 11.5V12.375ZM12.0625 6.07812L9.40625 3.45312L10.2812 2.57813C10.5208 2.33854 10.8152 2.21875 11.1644 2.21875C11.5131 2.21875 11.8073 2.33854 12.0469 2.57813L12.9219 3.45312C13.1615 3.69271 13.2865 3.98187 13.2969 4.32062C13.3073 4.65896 13.1927 4.94792 12.9531 5.1875L12.0625 6.07812ZM2.5 13.625C2.32292 13.625 2.17458 13.565 2.055 13.445C1.935 13.3254 1.875 13.1771 1.875 13V11.2344C1.875 11.151 1.89063 11.0704 1.92188 10.9925C1.95313 10.9142 2 10.8438 2.0625 10.7812L8.5 4.34375L11.1562 7L4.71875 13.4375C4.65625 13.5 4.58604 13.5469 4.50812 13.5781C4.42979 13.6094 4.34896 13.625 4.26562 13.625H2.5ZM8.95312 6.54688L8.51562 6.10938L9.39062 6.98438L8.95312 6.54688Z" fill="white" fillOpacity="0.7" />
            </svg>
            <span className="hidden xs:block ml-2">Save Changes</span>
          </button>
          <button onClick={() => setManageOAS(!manageOAS)} className={manageOAS ? "btn bg-indigo-500 hover:bg-indigo-600 text-white" : "btn hover:bg-indigo-600 rounded-md border border-slate-200 dark:border-slate-700 text-white"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M13 11H15M9 8H15M11 5H15M1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H17C17.5304 1 18.0391 1.21071 18.4142 1.58579C18.7893 1.96086 19 2.46957 19 3V17C19 17.5304 18.7893 18.0391 18.4142 18.4142C18.0391 18.7893 17.5304 19 17 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V3Z" stroke="white" strokeOpacity="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="hidden xs:block ml-2">Manage OAS</span>
          </button>
        </div>
      </div>
    </header >
  )
}