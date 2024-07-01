import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../../../provider/Provider.State";
import BodyContent from "../../../components/page/Components.Page.BodyContent";
import { ListSidebar } from "../../../components/custom/Custom.ListSidebar";
import { ContentBar } from "../../../components/standard/Standard.ContentBar";
import { useLocation, useNavigate } from "react-router-dom";
import { backendEvents } from "../../../events/events.backend";
import InventoryHostOverview from "./partials/Partials.Inventory.Host.Overview";
import InventoryDetailsData from "./Sub.Inventory.DetailsData";
import Starfield from "react-starfield";
import {
  getDnsFromHost,
  getOasFromHost,
} from "../../../provider/Provider.Data";
import InventoryEndpointOverview from "./partials/Partials.Inventory.Endpoint.Overview";

function InventoryEntry({ tier = 1 }) {
  const { hostInventory, nestedVisible } = useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [selectedHost, setSelectedHost] = useState(""); // default selected tab
  const [selectedHostData, setSelectedHostData] = useState({}); // default selected tab
  const [selectedEndpoint, setSelectedEndpoint] = useState("");
  const [addHost, setAddHost] = useState(false);
  const [hostBarOpen, setHostBarOpen] = useState(false);
  const [hostDns, setDns] = useState(null);
  const [isAnalytics, setAnalytics] = useState(false);
  const [tabs, setTabs] = useState(["Inventory"]);
  const [periodSelection, setPeriodSelection] = useState("monthly");

  const [oas, setOas] = useState(selectedHostData[0]?.oas_spec || {});

  useEffect(() => {
    if (
      selectedHostData[0]?.oas_spec &&
      selectedHostData[0]?.oas_spec._id != oas?._id
    ) {
      setOas(selectedHostData[0]?.oas_spec);
    }
  }, [selectedHostData]);

  console.log("selectedHostData", selectedHostData);

  console.log(oas);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname } = location;
    const paths = pathname
      .split("/")
      .filter((segment) => segment.trim() !== ""); // Add this line

    paths.shift(); //remove inventory

    if (paths.length > 0) {
      setSelectedHost(paths[0].replace("%3A", ":"));
      if (paths.length > 1) {
        paths.shift();
        setSelectedEndpoint(paths.join("/"));
      } else {
        setSelectedEndpoint("");
      }
    } else {
      setSelectedHost("");
    }
  }, [location]);

  useEffect(() => {
    if (selectedHost) {
      const grabOas = async () => {
        try {
          console.log("set selected host", selectedHost);
          const newUrl = `/inventory/${selectedHost}`;

          const hostOas = await getOasFromHost({ hostname: selectedHost });
          const hostDns = await getDnsFromHost({ hostname: selectedHost });

          const hostData = hostInventory.filter(
            (host) => host.hostname === selectedHost
          );

          console.log(hostInventory);
          console.log(hostData);
          setOas(hostOas);
          setDns(hostDns);
          setSelectedHostData(hostData);
          setSelectedEndpoint("");
          console.log(newUrl);

          navigate(newUrl, { replace: true });
        } catch (e) {
          console.warn(e);
        }
      };
      grabOas();
    }
  }, [selectedHost]);

  useEffect(() => {
    if (selectedHost && selectedEndpoint) {
      console.log("set selected endpoint", selectedEndpoint);
      const newUrl = `/inventory/${selectedHost}/${selectedEndpoint}`;

      console.log(newUrl);

      navigate(newUrl, { replace: true });
    }
  }, [selectedEndpoint]);

  return (
    <BodyContent
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabs={tabs}
      tier={tier}
    >
      <div className={"flex flex-row mainDark gap-1 h-full"}>
        {/* Hosts List Bar */}
        {nestedVisible <= tier && (hostBarOpen || !selectedHost) && (
          <ListSidebar
            inventory={hostInventory}
            selectedHost={selectedHost}
            setSelectedHost={setSelectedHost}
            setSelectedHostData={setSelectedHostData}
            addHost
            addHostSelect={() => {
              setAddHost(true);
            }}
          />
        )}

        {/* Endpoints List Bar */}
        {selectedHost && nestedVisible <= tier && (
          <ContentBar
            hostBarOpen={hostBarOpen}
            setHostBarOpen={setHostBarOpen}
            endpoint={selectedEndpoint}
            inventory={hostInventory}
            host={selectedHost}
            selectedEndpoint={selectedEndpoint}
            setSelectedEndpoint={setSelectedEndpoint}
          />
        )}

        {addHost ? (
          <IssuePrompt setAddHost={setAddHost} />
        ) : selectedHost ? (
          selectedEndpoint ? (
            <InventoryEndpointOverview
              selectedHostData={selectedHostData[0]}
              setSelectedEndpoint={setSelectedEndpoint}
              selectedEndpoint={selectedEndpoint}
              setPeriodSelection={setPeriodSelection}
              periodSelection={periodSelection}
              hostDns={hostDns}
              selectedHost={selectedHost}
              oas={oas}
              endpoint={selectedEndpoint
                .replace("%7B", "{")
                .replace("%7D", "}")}
              setOas={setOas}
            />
          ) : (
            <InventoryHostOverview
              selectedHostData={selectedHostData[0]}
              setSelectedEndpoint={setSelectedEndpoint}
              selectedEndpoint={selectedEndpoint}
              setPeriodSelection={setPeriodSelection}
              periodSelection={periodSelection}
              hostDns={hostDns}
              selectedHost={selectedHost}
              oas={oas}
              endpoint={selectedEndpoint
                .replace("%7B", "{")
                .replace("%7D", "}")}
              setOas={setOas}
            />
          )
        ) : (
          <InventoryDetailsData endpoint="inventory/api.sample.com/pets/__post" />
        )}
      </div>
    </BodyContent>
  );
}

export default InventoryEntry;

const IssuePrompt = ({ setAddHost }) => {
  const hostnameRef = useRef(null); // Add this line
  const fileInputRef = useRef(null);

  const uploadOas = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const createIt2 = async () => {
      const file = event.target.files[0]; // Get the selected file
      if (file) {
        // Use FileReader to read the file content
        const reader = new FileReader();
        reader.onload = async (e) => {
          const content = e.target.result; // This is the file content as a string

          // Assuming the content is JSON and needs to be parsed into an object
          // For YAML, you might need a YAML parser like js-yaml
          let parsedContent;
          if (file.type === "application/json") {
            parsedContent = JSON.parse(content);
          } else if (
            file.name.endsWith(".yaml") ||
            file.name.endsWith(".yml")
          ) {
            // For YAML, you'd typically use a library like js-yaml to parse
            // parsedContent = yaml.load(content);
            console.error("YAML parsing is not implemented");
            return;
          }

          // Send the parsed content (assuming it's an object) to the backend
          const res = await backendEvents().createHost({ oas: parsedContent });

          // Additional logic to handle the response
          console.log(res); // Logging the file name
          window.location.reload();
        };

        // Read the file content
        reader.readAsText(file);
      }
    };
    createIt2();
  };

  const createHost = () => {
    const createIt = async () => {
      const hostname = hostnameRef.current.value;
      if (!isValidHostname(hostname)) alert("incorrect hostname");
      if (!isValidHostname(hostname)) return;

      const res = await backendEvents().createHost({ hostname });
      window.location.reload();
      setAddHost(false);
    };
    createIt();
  };

  const cancel = () => {
    setAddHost(false);
  };

  return (
    <div className="flex w-full h-full items-center justify-center overflow-hidden absolute top-0">
      <div
        className="secondaryDark space-y-2 z-40"
        style={{
          width: 600,
          borderRadius: 3,
          padding: 30,
        }}
      >
        <div className="text-3xl text-white font-bold">Create a New Host</div>
        <div className="space-y-1">
          <span>
            You can create a bare OAS by entering the hostname below, or you can
            upload an OAS (Open API Specification) below.
          </span>
          <div className="flex flex-row items-center h-[56px]">
            <form className="border-b border-slate-200 dark:border-slate-700">
              <div className="relative">
                <input
                  className="w-full text-sm px-1 dark:text-slate-300 secondaryDark border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none"
                  type="search"
                  placeholder="Enter Hostname"
                  ref={hostnameRef} // Use the ref here
                />
              </div>
            </form>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }} // Hide the file input
          accept=".json,.yaml,.yml" // Accept JSON and YAML files
          onChange={handleFileSelect} // Handler when a file is selected
        />

        <div className="flex space-x-2 pt-8">
          <div
            className={`cursor-pointer flex items-center justify-center text-sm`}
            style={{
              backgroundColor: "#2B84EC",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: 3,
            }}
            onClick={() => createHost()}
          >
            Create Host
          </div>
          <div
            className={`cursor-pointer flex items-center justify-center text-sm`}
            style={{
              borderColor: "#2B84EC",
              borderWidth: 1,
              color: "#fff",
              padding: "10px 15px",
              borderRadius: 3,
            }}
            onClick={() => uploadOas()}
          >
            Upload OAS
          </div>
          <div className={"flex flex-grow"}></div>
          <div
            className={`cursor-pointer flex items-center justify-center text-sm`}
            style={{
              borderColor: "#df7c7c",
              borderWidth: 1,
              color: "#fff",
              padding: "10px 15px",
              borderRadius: 3,
            }}
            onClick={() => cancel()}
          >
            Cancel
          </div>
        </div>
      </div>
      <MemoizedStarField
        starCount={3000}
        starColor={[255, 255, 255]}
        speedFactor={0.01}
        backgroundColor="#000"
      />
    </div>
  );
};

const StarField = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <Starfield
        starCount={3000}
        starColor={[255, 255, 255]}
        speedFactor={0.01}
        backgroundColor="#191a21"
      />
    </div>
  );
};
//Stop refreshing!
const MemoizedStarField = React.memo(StarField);

function isValidHostname(hostname) {
  // Check total length of hostname
  if (hostname.length > 253) return false;

  // Split the hostname into labels (parts separated by dots)
  const labels = hostname.split(".");

  if (labels.length < 2) return false;

  // Check each label
  for (let label of labels) {
    // Check if label exceeds 63 characters
    if (label.length > 63) return false;

    // Check if label matches allowed character set
    if (!/^[a-zA-Z0-9-]*$/.test(label)) return false;

    // Check if label starts and ends with alphanumeric characters
    if (!/^[a-zA-Z0-9].*[a-zA-Z0-9]$/.test(label)) return false;

    // Special check for IDNA/punycode encoded labels
    if (/--/.test(label) && label.indexOf("--") !== 2) return false;
  }

  return true;
}
