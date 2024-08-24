import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../provider/Provider.State";
import BodyContent from "../../../components/page/Components.Page.BodyContent";
import BuilderMap from "@builder/App";
import { EventBar } from "../../../components/standard/Standard.EventBar";
import { backendEvents } from "../../../events/events.backend";
import {
  CameraIcon,
  LightningIcon,
  PlayIcon,
  PowerIcon,
} from "../../../assets/assets.svg";
import { useParams } from "react-router-dom";
import Starfield from "react-starfield";

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

const MemoizedStarField = React.memo(StarField);

function Playbook({ tier = 1 }) {
  const { dummyOas, nestedVisible } = useContext(AppContext);
  const [selectedTab, setSelectedTab] = useState(0); // default selected tab
  const [leftbarVisible, setLeftbar] = useState(false); // default selected tab
  const [rightbarVisible, setRightbar] = useState(true); // default selected tab

  const [tabs, setTabs] = useState(["Event Playbooks"]);

  const [builderData, setBuilderData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://${window.location.hostname}:${__BE_ROUTER_PORT__}/manage/endpoint/builder?event=${params.playbookId}`,
          {
            headers: { 
              "x-sera-service": "be_builder",
              "X-Forwarded-For": "backend.sera"
            },
          }
        );
        const jsonData = await response.json();
        if (!jsonData.issue) {
          setBuilderData({
            nodes: jsonData.builder.nodes,
            edges: jsonData.builder.edges,
            builderId: jsonData.builderId,
          });

          setLoaded(true);
        } else {
          console.log(jsonData.issue);
        }
        return jsonData;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const LeftButton = () => (
    <SeraButton icon={<CameraIcon />} isSelected={true} onPress={setLeftbar} />
  );
  const RightButton = () => (
    <SeraButton
      icon={<PowerIcon size={18} toggle={rightbarVisible} />}
      isSelected={rightbarVisible}
      onPress={setRightbar}
    />
  );

  return (
    <BodyContent
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      tabs={tabs}
      tier={tier}
      buttons={
        <div className="flex pr-2 gap-2">
          <LeftButton />
          <RightButton />
        </div>
      }
    >
      <div className={"flex flex-row mainDark gap-1 h-full"}>
        {loaded ? (
          <BuilderMap
            nodes={builderData.nodes}
            edges={builderData.edges}
            builderId={builderData.builderId}
            playbook={params.playbookId}
            oas={dummyOas}
            getNodeStruc={backendEvents().getNodeStruc}
            type={"event"}
          />
        ) : <MemoizedStarField/>}
      </div>
    </BodyContent>
  );
}

export default Playbook;

export const SeraButton = ({ icon, isSelected, onPress }) => {
  return (
    <div
      className={`cursor-pointer sidebarItem flex items-center justify-center sidebarButton${
        !isSelected ? "Select" : ""
      } h-[36px] w-[36px]`}
      onClick={() => {
        onPress(!isSelected);
      }}
    >
      {icon}
    </div>
  );
};

const LeftIcon = ({ flip = false }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    transform={flip ? "scale(-1 1)" : null}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M4.66663 7.99733H14M8.66663 12L4.66663 8L8.66663 4M1.66663 12V4"
      stroke="white"
      strokeWidth="1.33333"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
