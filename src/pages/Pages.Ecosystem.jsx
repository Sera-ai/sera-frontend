import React, { useState, useEffect, useRef, useContext, memo } from "react";
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";

import Sidebar from "./global/Global.Sidebar";
import Header from "./global/Global.Header";
import Starfield from "react-starfield";

import FilterButton from "../components/Components.DropdownFilter";
import { AppContext } from "../provider/Provider.State";

const StarfieldWrapper = memo(function StarfieldWrapper(props) {
  return <Starfield {...props} />;
});

function Ecosystem() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [edgess, setEdges] = useState(edges);
  const [nodess, setNodes] = useState(nodes);
  const [isPopup, setIsPopup] = useState(false);
  const networkRef = useRef(null);
  const [network, setNetwork] = useState(null);
  const [filter, setFilter] = useState("");
  const [endpoint, setEndpoint] = useState(
    "inventory/api.sample.com/pets/__post"
  );
  const [ecoFilter, setEcoFilter] = useState("");

  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [selectedInt, setSelectedInt] = useState(0);

  const starfieldRef = useRef();

  useEffect(() => {
    setIsPopup(window.opener != null);
    // Handle other side effects here
    if (network) {
      const filterAndUpdateNodes = () => {
        if (network) {
          // Filter nodes based on the filter string
          const filteredNodeIds = nodess
            .filter(
              (node) =>
                node.label.toLowerCase().includes(filter.toLowerCase()) ||
                node.group.toLowerCase().includes(filter.toLowerCase())
            )
            .map((node) => node.id);

          // Update visibility of nodes
          nodess.forEach((node) => {
            network.body.data.nodes.update({
              id: node.id,
              hidden: !filteredNodeIds.includes(node.id),
            });
          });
        }
      };

      // Call the filtering function when filter changes
      filterAndUpdateNodes();

      network.on("zoom", function (params) {
        // Get the scale (zoom level)
        const scale = network.getScale();

        // Calculate new font size based on scale
        // You can adjust the formula according to your needs
        const newFontSize = Math.max(5 * scale, 5);

        // Update node font sizes
        nodes.forEach((node) => {
          network.body.data.nodes.update({
            id: node.id,
            font: { size: newFontSize },
          });
        });
      });
    }
    if (!starfieldRef.current) {
      starfieldRef.current = (
        <Starfield
          starCount={3000}
          starColor={[255, 255, 255]}
          speedFactor={0.01}
          backgroundColor="#23232E"
        />
      );
    }
  }, [network, filter]); // Empty dependency array if no dependencies

  const graphOptions = {
    nodes: {
      shape: "dot",
      size: 10,
      color: {
        border: "#2B7CE9", // Color of the node border
        background: "#97C2FC", // Background color of the node
        highlight: {
          // Color when the node is highlighted (selected or hovered)
          border: "#2B7CE9",
          background: "#D2E5FF",
        },
        hover: {
          // Color when the node is hovered
          border: "#2B7CE9",
          background: "#D2E5FF",
        },
      },
      font: {
        color: "#ffffff",
      },
    },
    edges: {
      color: {
        color: "#ffffff30", // Red color for the arrow
        highlight: "#ffffff60", // Red color when the arrow is highlighted
        hover: "#ffffff", // Red color when the arrow is hovered over
        // Add other color properties as needed
      },
      arrows: {
        to: {
          enabled: true,
          scaleFactor: 0.1, // Increase the size of the arrowhead
          // You can add additional properties to style the arrowhead
        },
        // Include settings for `from` or `middle` arrows if needed
      },
      // Add other edge properties as needed
    },

    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -50,
        centralGravity: 0.01,
        springLength: 100,
        springConstant: 0.08,
        avoidOverlap: 1,
      },
      maxVelocity: 10, // Lower the max velocity for smoother movement
      solver: "forceAtlas2Based",
      timestep: 0.35,
      stabilization: {
        iterations: 200,
        updateInterval: 10, // Adjust update intervals for smoother animation
        onlyDynamicEdges: false,
        fit: true,
      },
    },
  };

  const tableData = (data, index, total) => {
    let returnData;
    switch (typeof data) {
      case "object":
        returnData = data.map((tag) => tag).join(", ");
        break;
      case "string":
        returnData = data;
        break;
      default:
        returnData = data;
        break;
    }

    if (index == 0) {
      return (
        <span
          className={`inline-flex items-center px-1 py-0.5 text-xs text-white rounded`}
          style={
            data.toLowerCase() === "active"
              ? { backgroundColor: "#23A85830", color: "#23A858" }
              : { backgroundColor: "#EC2B2B30", color: "#EC2B2B" }
          }
        >
          {returnData}
        </span>
      );
    } else if (index == total - 1) {
      return data.map((tag, index) => (
        <React.Fragment key={index}>
          <h2
            style={{ color: "#2B84EC" }}
            className="text-xs text-slate-800 dark:text-slate-100 underline cursor-pointer"
          >
            {tag}
          </h2>
          {index !== data.length - 1 && (
            <span className="px-1 cursor-default"> , </span>
          )}
        </React.Fragment>
      ));
    } else {
      return returnData;
    }
  };

  const { endpointDetails } = useContext(AppContext);

  if (!endpointDetails[0][endpoint]) {
    return;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div style={{ zIndex: 2 }} className="h-full">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          transparent
        />
      </div>
      <div className="relative flex flex-col flex-1 w-full items-center">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          title={"Ecosystem"}
          transparent={true}
        />
        <main
          className="flex flex-col items-center w-full"
          style={{ height: "-webkit-fill-available" }}
        >
          <div
            className="flex justify-end gap-2 z-10 "
            style={{ width: "1220px" }}
          >
            {/* Filter button */}

            <FilterButton />
            {/* Datepicker built with flatpickr */}
            <form
              style={{ borderColor: "#334155" }}
              className="mainDark text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 font-medium w-[15.5rem] rounded-sm border py-0"
            >
              <div className="relative">
                <label className="sr-only">Search</label>
                <input
                  className="w-full mainDark dark:text-slate-300 text-sm border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none "
                  type="search"
                  placeholder="Search Ecosystem"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
                <div className="absolute top-2.5 right-0" aria-label="Search">
                  <svg
                    className="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-4 mr-2"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                    <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                  </svg>
                </div>
              </div>
            </form>
          </div>
          <div className="flex-grow overflow-visible">
            <div
              style={{
                position: "absolute",
                top: -300,
                right: 0,
                bottom: 0,
                left: -100,
                zIndex: 1,
              }}
            >
              <Graph
                graph={{
                  nodes: nodess,
                  edges: edgess,
                }}
                options={graphOptions}
                getNetwork={(net) => {
                  setNetwork(net); // Store the network instance
                  networkRef.current = net;
                }}
              />
            </div>
          </div>

          <div className="w-full z-10">
            <HeaderTabs
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <div
              style={{ height: 400, borderRadius: 5, padding: 10 }}
              className="w-full mainDark"
            >
              <div style={{ borderRadius: 8 }} className="h-full secondaryDark">
                <div className="flex  space-x-10 w-full h-full ">
                  <div
                    style={{
                      borderRightWidth: 1,
                      borderColor: "#ffffff30",
                      borderTopLeftRadius: 5,
                    }}
                    className="text-sm py-3 h-full flex flex-col secondaryDark"
                  >
                    <form className="text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 font-medium w-[15.5rem]  px-5">
                      <div className="relative">
                        <label className="sr-only">Search</label>
                        <input
                          className="w-full px-0 secondaryDark dark:text-slate-300 text-sm border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none "
                          type="search"
                          placeholder="Search Endpoints"
                          value={ecoFilter}
                          onChange={(e) => setEcoFilter(e.target.value)}
                        />
                        <div
                          className="absolute top-2.5 right-0"
                          aria-label="Search"
                        >
                          <svg
                            className="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-4 mr-2"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                            <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </form>
                    <ul id="list" className="flex-grow overflow-y-scroll">
                      {nodess
                        .filter(
                          (node) =>
                            node.label
                              .toLowerCase()
                              .includes(filter.toLowerCase()) ||
                            node.group
                              .toLowerCase()
                              .includes(filter.toLowerCase())
                        )
                        .filter((node) => node.group == "sera")
                        .map((node, int) => (
                          <li
                            className={` px-5 py-1 ${
                              int == selectedInt && "selectedEco"
                            }`}
                            style={{
                              display:
                                node.label
                                  .toLowerCase()
                                  .includes(ecoFilter.toLowerCase()) ||
                                node.group
                                  .toLowerCase()
                                  .includes(ecoFilter.toLowerCase())
                                  ? ""
                                  : "none",
                            }}
                          >
                            <div
                              className={`flex flex-row justify-between items-center cursor-pointer`}
                              style={{
                                color:
                                  int === selectedInt ? "#fff" : "#ffffff70",
                              }}
                              onClick={() => setSelectedInt(int)}
                            >
                              {node.label}
                              <div className="cursor-pointer">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <g>
                                    <path
                                      d="M8.00008 5.33341C8.73341 5.33341 9.33341 4.73341 9.33341 4.00008C9.33341 3.26675 8.73341 2.66675 8.00008 2.66675C7.26675 2.66675 6.66675 3.26675 6.66675 4.00008C6.66675 4.73341 7.26675 5.33341 8.00008 5.33341ZM8.00008 6.66675C7.26675 6.66675 6.66675 7.26675 6.66675 8.00008C6.66675 8.73341 7.26675 9.33341 8.00008 9.33341C8.73341 9.33341 9.33341 8.73341 9.33341 8.00008C9.33341 7.26675 8.73341 6.66675 8.00008 6.66675ZM8.00008 10.6667C7.26675 10.6667 6.66675 11.2667 6.66675 12.0001C6.66675 12.7334 7.26675 13.3334 8.00008 13.3334C8.73341 13.3334 9.33341 12.7334 9.33341 12.0001C9.33341 11.2667 8.73341 10.6667 8.00008 10.6667Z"
                                      fill="white"
                                    />
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="flex  space-x-10 w-full h-full py-14 px-5">
                    <div className=" w-full">
                      <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                        Endpoint Details
                      </h2>
                      <h2
                        style={{ color: "#ffffff99" }}
                        className="text-xs text-slate-800 dark:text-slate-100"
                      >
                        Endpoint specific details
                      </h2>

                      <table className="table-auto w-full dark:text-slate-300">
                        {/* Table header */}
                        <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 secondaryDark dark:bg-opacity-50 rounded-sm sticky top-0">
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
                          {Object.keys(
                            endpointDetails[0][endpoint]["details"]
                          ).map((obj, index) => (
                            <React.Fragment key={index}>
                              {/* Rows related to each endpoint under the host */}
                              <tr className="secondaryDark rowItem noborder">
                                <td className="pr-3">
                                  <div className="flex flex-col">
                                    <div
                                      style={{ color: "#ffffff99" }}
                                      className="text-slate-800 text-xs dark:text-slate-100"
                                    >
                                      {obj}
                                    </div>
                                  </div>
                                </td>

                                <td className="p-1">
                                  <div className="flex flex-wrap gap-2">
                                    <div className="text-slate-800 text-xs dark:text-slate-100 flex flex-wrap">
                                      {tableData(
                                        endpointDetails[0][endpoint]["details"][
                                          obj
                                        ],
                                        index,
                                        Object.keys(
                                          endpointDetails[0][endpoint][
                                            "details"
                                          ]
                                        ).length
                                      )}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className=" w-full">
                      <h2 className="font-semibold text-sm text-slate-800 dark:text-slate-100">
                        Endpoint Statistics
                      </h2>
                      <h2
                        style={{ color: "#ffffff99" }}
                        className="text-xs text-slate-800 dark:text-slate-100"
                      >
                        Statistics available for this endpoint
                      </h2>

                      <table className="table-fixed w-full dark:text-slate-300">
                        {/* Table header */}
                        <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 secondaryDark dark:bg-opacity-50 rounded-sm sticky top-0">
                          <tr>
                            <th className="p-2 w-1/3">
                              {" "}
                              {/* Adjust the width as needed */}
                              <div className="font-semibold text-center"></div>
                            </th>
                            <th className="p-2 w-2/3">
                              {" "}
                              {/* The rest of the table space */}
                              <div className="font-semibold text-center"></div>
                            </th>
                          </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                          {Object.keys(
                            endpointDetails[0][endpoint]["statistics"]
                          ).map((obj, index) => (
                            <tr
                              key={index}
                              className="secondaryDark rowItem noborder"
                            >
                              <td className="pr-3">
                                <div className="flex flex-col">
                                  <div
                                    style={{ color: "#ffffff99" }}
                                    className="text-slate-800 text-xs dark:text-slate-100"
                                  >
                                    {obj}
                                  </div>
                                </div>
                              </td>
                              <td className="p-1">
                                <div className="flex flex-wrap gap-2">
                                  <div className="text-slate-800 text-xs dark:text-slate-100 flex flex-wrap">
                                    {
                                      endpointDetails[0][endpoint][
                                        "statistics"
                                      ][obj]
                                    }
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* Content of the 300px div */}
            </div>
          </div>
        </main>
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
          {starfieldRef.current}
        </div>
      </div>
    </div>
  );
}

export default Ecosystem;

const HeaderTabs = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="text-white flex full-w ml-3 text-sm">
      {/* Tab: All Coins */}
      <div
        className={`cursor-pointer py-1 ${
          selectedTab === 0
            ? "border-b-2 border-blue-300 dark:text-slate-100"
            : "dark:text-slate-500"
        }`}
        style={{ borderColor: "#2b84ec" }}
        onClick={() => setSelectedTab(0)}
      >
        <span>Ecosystem Endpoints</span>
      </div>

      {/* Tab: Portfolio */}
      <div
        className={`cursor-pointer py-1 ml-6 ${
          selectedTab === 1
            ? "border-b-2 border-blue-300 dark:text-slate-100"
            : "dark:text-slate-500"
        }`}
        style={{ borderColor: "#2b84ec" }}
        onClick={() => setSelectedTab(1)}
      >
        <span>Live Timeline</span>
      </div>
    </div>
  );
};

const nodes = [
  { id: "api1", label: "env1.sera.ai/path/user", group: "sera" },
  { id: "api2", label: "env1.sera.ai/path/org", group: "sera" },
  { id: "api3", label: "env1.sera.ai/manage/org", group: "sera" },
  { id: "api4", label: "env1.sera.ai/manage/user", group: "sera" },
  { id: "api5", label: "env2.sera.ai/settings", group: "sera" },
  { id: "api6", label: "env2.sera.ai/org/edit", group: "sera" },
  { id: "api7", label: "env2.sera.ai/info", group: "sera" },
  { id: "api8", label: "env3.sera.ai/{userId}/edit", group: "sera" },
  { id: "api9", label: "env3.sera.ai/{userId}/info", group: "sera" },
  { id: "api10", label: "env3.sera.ai/{userId}/view/post", group: "sera" },
  { id: "domain1", label: "example.com", group: "external" },
  { id: "domain2", label: "service.org", group: "external" },
  { id: "domain3", label: "website.net", group: "external" },
  { id: "domain4", label: "portal.io", group: "external" },
  { id: "domain5", label: "store.co.uk", group: "external" },
  { id: "ip1", label: "Noname Security", group: "plugin" },
  { id: "ip2", label: "Snowflake", group: "plugin" },
  { id: "ip3", label: "Databrick", group: "plugin" },
  { id: "ip4", label: "Norvis", group: "plugin" },
  { id: "ip5", label: "Kong", group: "plugin" },
];

const edges = [
  { from: "api1", to: "domain1" },
  { from: "api1", to: "domain2" },
  { from: "api1", to: "domain3" },
  { from: "api2", to: "domain4" },
  { from: "api2", to: "domain5" },
  { from: "api2", to: "ip1" },
  { from: "api2", to: "ip2" },
  { from: "api1", to: "ip3" },
  { from: "api1", to: "ip4" },
  { from: "api1", to: "ip5" },
  { from: "api3", to: "domain1" },
  { from: "api3", to: "domain2" },
  { from: "api3", to: "domain3" },
  { from: "api4", to: "domain4" },
  { from: "api4", to: "domain5" },
  { from: "api4", to: "ip1" },
  { from: "api4", to: "ip2" },
  { from: "api4", to: "ip3" },
  { from: "api4", to: "ip4" },
  { from: "api3", to: "ip5" },
  { from: "api5", to: "domain1" },
  { from: "api5", to: "domain2" },
  { from: "api6", to: "domain3" },
  { from: "api6", to: "domain4" },
  { from: "api6", to: "domain5" },
  { from: "api6", to: "ip1" },
  { from: "api5", to: "ip2" },
  { from: "api5", to: "ip3" },
  { from: "api5", to: "ip4" },
  { from: "api5", to: "ip5" },
  { from: "api7", to: "domain1" },
  { from: "api8", to: "domain2" },
  { from: "api9", to: "domain3" },
  { from: "api10", to: "domain4" },
  { from: "api7", to: "domain5" },
  { from: "api8", to: "ip1" },
  { from: "api9", to: "ip2" },
  { from: "api10", to: "ip3" },
  { from: "api7", to: "ip4" },
  { from: "api8", to: "ip5" },
];
