import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import BodyContent from "../../../../components/page/Components.Page.BodyContent";
import InventoryHostSettings from "./Partials.Inventory.Settings";
import CatalogDetailsData from "./Partials.Inventory.EndpointDetails";
import {
  BuilderIcon,
  CancelGlobeIcon,
  EditIcon,
  EventsIcon,
  GlobeIcon,
  NetworkIcon,
  PostmanIcon,
  SaveIcon,
} from "../../../../assets/assets.svg";
import ApiDocumentation from "./Partials.Inventory.Documentation";
import { AppContext } from "../../../../provider/Provider.State";
import { SeraButton } from "../../editor/Sub.Editor.Visual";

const InventoryHostOverview = ({
  tier = 2,
  selectedHostData,
  setSelectedEndpoint,
  endpoint,
  hostDns,
  oas,
  setOas,
}) => {
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [tabs, setTabs] = useState(["Documentation", "Analytics", "Settings"]);

  const [editDocs, setEditDocs] = useState(false);
  const [method, setMethod] = useState("");
  const [manageOAS, setManageOAS] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  const location = useLocation();
  const { pathname } = location;
  const paths = decodeURIComponent(pathname).split("/");
  paths.shift(); //remove blank
  paths.shift(); //remove inventory
  useEffect(() => {
    const matchMethod = ["__post", "__get", "__delete", "__put", "__patch"];
    if (matchMethod.includes(paths[paths.length - 1])) {
      setMethod(paths.pop().replace("__", "").toUpperCase());
    }
  }, [location]);

  const oasEditorRef = useRef();
  const MDEditorRef = useRef();

  const updateChildState = () => {
    oasEditorRef.current.settingState();
  };

  const updateMarkdown = () => {
    MDEditorRef.current.saveOasItem();
  };

  const SelectedPage = () => {
    switch (selectedTab) {
      case 0:
        return (
          <ApiDocumentation
            oas={oas}
            editDocs={editDocs}
            manageOAS={manageOAS}
            setOas={setOas}
            endpoint={endpoint}
            setSelectedEndpoint={setSelectedEndpoint}
          />
        );
      case 1:
        return (
          <CatalogDetailsData endpoint="inventory/api.sample.com/pets/__post" />
        );
      case 2:
        return <InventoryHostSettings selectedHostData={selectedHostData} />;
    }
  };

  return (
    <BodyContent
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabs={tabs}
      tier={tier}
      mainDark
      buttons={
        <Header2
          paths={paths}
          method={method}
          endpoint={endpoint}
          setEditDocs={setEditDocs}
          editDocs={editDocs}
          manageOAS={manageOAS}
          setManageOAS={setManageOAS}
          isError={isError}
          oas={oas}
          updateMarkdown={updateMarkdown}
          updateChildState={updateChildState}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
      }
    >
      <div className={"flex flex-row mainDark gap-1 h-full"}>
        <SelectedPage />
        {showSettings && (
          <EndpointSettings endpoint={endpoint} hostDns={hostDns} />
        )}
      </div>
    </BodyContent>
  );
};

export default InventoryHostOverview;

const Header2 = ({
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
  showSettings,
  setShowSettings,
  endpoint,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const goToInventory = () => {
    const newUrl = location.pathname
      .replace("/inventory", "/builder")
      .replace("__", "");
    navigate(newUrl);
  };

  const goToEvents = () => {
    navigate("/events");
  };

  const LeftButton = () => (
    <SeraButton
      icon={<BuilderIcon size="18" color="#fff" />}
      isSelected={true}
      border={true}
      onPress={() => {
        goToInventory();
      }}
    />
  );
  const RightButton = () => (
    <SeraButton
      icon={<EventsIcon size="18" secondaryColor="#2B84EC" color="#fff" />}
      isSelected={true}
      border={true}
      onPress={() => {
        goToEvents();
      }}
    />
  );

  return (
    <div className="flex justify-between items-center space-x-4">
      <div className="gap-2 flex justify-center">
        <button
          onClick={() => setEditDocs(!editDocs)}
          className={`${
            editDocs
              ? "headerButton  text-white"
              : "headerButton  rounded-md border border-slate-200 dark:border-slate-700 text-white"
          }${manageOAS ? " hidden" : ""}`}
        >
          <EditIcon />
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
          <SaveIcon />
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
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={
            showSettings
              ? "headerButton rounded-md mainDark text-white"
              : "headerButton  rounded-md border border-slate-200 dark:border-slate-700 text-white"
          }
        >
          <NetworkIcon size="16" color="#fff" />
        </button>
      </div>

      {endpoint && (
        <div className="flex pr-2 gap-2">
          <LeftButton />
          <RightButton />
        </div>
      )}
    </div>
  );
};

const EndpointSettings = ({ hostDns }) => {
  return (
    <div className="secondaryDark rounded-sm p-4 detailsActionContainer2">
      <div className="space-y-1">
        <h2 className="text-xs uppercase text-white">Sera Host Information</h2>
        <h2 className="font-regular text-xs listItemLink">
          Below are this Host's Forwarding URL(s)
        </h2>
        <ProxySettings hostDns={hostDns} />
        <div className="pt-4 rounded-md">
          <div
            className={`flex items-center py-2 px-3 border rounded-lg border-slate-200 dark:border-slate-700 cursor-pointer`}
            onClick={() => {}}
          >
            <div
              style={{
                backgroundColor: "#FF6C37",
              }}
              className={`mr-4 rounded-md`}
            >
              <PostmanIcon />
            </div>
            <div className="flex-1">
              <p className="font-medium text-xs">Postman Collection</p>
              <p className="text-gray-300  text-xs">
                {hostDns?.sera_config?.sub_domain
                  ? `https://${hostDns?.sera_config?.sub_domain}.sera`
                  : "Click to generate"}
              </p>
            </div>
            <div>
              <div className="secondaryDark w-5 h-5 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ProxySettings({ hostDns }) {
  return (
    <div className="space-y-2 pt-4">
      <div className=" rounded-md">
        <div
          className={`flex items-center py-2 px-3 border rounded-lg border-slate-200 dark:border-slate-700 cursor-pointer`}
          onClick={() => {}}
        >
          <div
            style={{
              backgroundColor: "#1A1C20",
            }}
            className={`p-2.5 mr-4 rounded-md`}
          >
            <GlobeIcon />
          </div>
          <div className="flex-1">
            <p className="font-medium text-xs">Sera Endpoint</p>
            <p className="text-gray-300  text-xs">
              {hostDns?.sera_config?.sub_domain
                ? `https://${hostDns?.sera_config?.sub_domain}.sera:12000`
                : "Click to generate"}
            </p>
          </div>
          <div>
            <div className="secondaryDark w-5 h-5 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className=" rounded-md">
        <div
          className={`flex items-center py-2 px-3 border rounded-lg border-slate-200 dark:border-slate-700 cursor-pointer`}
          onClick={() => {}}
        >
          <div
            style={{
              backgroundColor: "#1A1C20",
            }}
            className={`p-2.5 mr-4 rounded-md`}
          >
            <CancelGlobeIcon />
          </div>
          <div className="flex-1">
            <p className="font-medium text-xs">Obfuscated Endpoint</p>
            <p className="text-gray-300  text-xs">
              {hostDns?.sera_config?.obfuscated
                ? `https://${hostDns?.sera_config?.obfuscated}`
                : "Click to generate"}
            </p>
          </div>
          <div>
            <div className="secondaryDark w-5 h-5 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="divider" />
    </div>
  );
}
