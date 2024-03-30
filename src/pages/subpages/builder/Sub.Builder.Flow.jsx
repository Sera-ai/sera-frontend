import React, { useState, useRef, useContext, useEffect } from "react";

import Header from "../../../components/custom/Custom.Header.Title";
import { ContentBar } from "../../../components/standard/Standard.ContentBar";
import BuilderMap from "@builder/App";
import { SeraButton } from "../editor/Sub.Editor.Visual";
import {
  BuilderIcon,
  CloseIcon,
  EventsIcon,
  InventoryIcon,
  LeftIcon,
} from "../../../assets/assets.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { backendEvents } from "../../../events/events.backend";
import Starfield from "react-starfield";

function BuilderFlow() {
  const location = useLocation();

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [issue, setIssue] = useState(null);
  const [builderId, setBuilderId] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const path = location.pathname;
    async function fetchData() {
      try {
        const response = await fetch(
          `/manage/endpoint/builder?path=${encodeURIComponent(
            path.replace("/builder", "")
          )}`,
          { headers: { "x-sera-service": "be_builder" } }
        );
        const jsonData = await response.json();
        if (!jsonData.issue) {
          setNodes(jsonData.builder.nodes);
          setEdges(jsonData.builder.edges);
          setBuilderId(jsonData.builderId);

          console.log(jsonData);
          setIssue(null)
          setLoaded(true);
        } else {
          console.log(jsonData.issue);
          setIssue(jsonData.issue);
        }
        return jsonData;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [location]);

  const navigate = useNavigate();

  const goToInventory = () => {
    const newUrl = modifyStringForAPIMethod(
      location.pathname.replace("/builder", "/inventory")
    );
    navigate(newUrl);
  };

  const goToEvents = () => {
    navigate("/events");
  };

  const navigateBuilder = (data) => {
    const newUrl = `/builder/${data
      .replace("__", "")
      .replace("https://", "")
      .replace("http://", "")}`;

    navigate(newUrl);
  };

  const LeftButton = () => (
    <SeraButton
      icon={<InventoryIcon size="18" color="#fff" />}
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
    <Header
      title={"Builder"}
      subtitle={location.pathname.replace("/builder/", "")}
      horizontal={true}
      buttons={
        <div className="flex pr-2 gap-2">
          <LeftButton />
          <RightButton />
        </div>
      }
      tier={2}
    >
      <div className="flex pt-1 w-full h-full">
        {loaded && (
          <BuilderMap
            nodes={nodes}
            edges={edges}
            oas={{}}
            builderId={builderId}
            type={"builder"}
          />
        )}
        {issue && (
          <div className="flex w-full h-full space-x-1">
            <ContentBar
              builder
              showHost
              endpoint="inventory/api.sample.com/pets/__post"
              host={"http://sample.com"}
              selectedEndpoint={"selectedEndpoint"}
              showBlock={false}
              setSelectedEndpoint={navigateBuilder}
            />
            <IssuePrompt
              issue={issue}
              path={location.pathname.replace("/builder/", "")}
            />
          </div>
        )}
      </div>
    </Header>
  );
}

export default BuilderFlow;

function modifyStringForAPIMethod(str, replace = "__") {
  // Extend the set of API methods to check against
  const apiMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

  // Check if the string ends with any of the API methods
  for (const method of apiMethods) {
    if (str.endsWith(method.toLowerCase())) {
      // Insert __ before the API method and return the new string
      return str.slice(0, -method.length) + replace + method.toLowerCase();
    }
  }

  return str; // Return the original string if no match
}

const IssuePrompt = ({ issue, path }) => {
  const getTitle = () => {
    switch (issue.error) {
      case "NoEndpoint":
        return "No Builder found for Endpoint";
    }
  };

  const getBody = () => {
    switch (issue.error) {
      case "NoEndpoint":
        const managedPath = modifyStringForAPIMethod(path, " ").split(" ");
        console.log(managedPath);
        console.log(path);
        return (
          <div className="space-y-1">
            <div>
              <span>Would you like create a builder for:</span>
            </div>
            <div>
              <span>
                <span
                  className={`${managedPath[1].toUpperCase()}-color ${managedPath[1].toUpperCase()}-bg-color text-sm`}
                  style={{
                    borderRadius: "3px 0px 0px 3px",
                    padding: "4px 6px",
                    fontWeight: "500",
                  }}
                >
                  {managedPath[1].toUpperCase()}
                </span>
                <span
                  style={{
                    borderRadius: "0px 3px 3px 0px",
                    backgroundColor: "#00000050",
                    padding: "4px 6px",
                  }}
                >
                  {managedPath[0]}
                </span>
              </span>
            </div>
          </div>
        );
    }
  };

  const navigate = useNavigate();

  const goToInventory = () => {
    navigate("/builder");
  };

  const createBuilder = () => {
    const createIt = async () => {
      const res = await backendEvents().createData(issue);
      if (res == "success") {
        window.location.reload();
      }
    };
    createIt();
  };

  return (
    <div className="flex w-full h-full items-center justify-center overflow-hidden">
      <div
        className="secondaryDark space-y-2"
        style={{
          width: 600,
          borderRadius: 3,
          padding: 30,
        }}
      >
        <div className="text-3xl text-white font-bold">{getTitle()}</div>
        <div>{getBody()}</div>
        <div className="flex space-x-2 pt-8">
          <div
            className={`cursor-pointer flex items-center justify-center text-sm`}
            style={{
              backgroundColor: "#2B84EC",
              color: "#fff",
              padding: "10px 15px",
              borderRadius: 3,
            }}
            onClick={() => createBuilder()}
          >
            Create Builder
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
            onClick={() => goToInventory()}
          >
            Back to Inventory
          </div>
        </div>
      </div>
      <Starfield
        starCount={3000}
        starColor={[255, 255, 255]}
        speedFactor={0.01}
        backgroundColor="#000"
      />
    </div>
  );
};


