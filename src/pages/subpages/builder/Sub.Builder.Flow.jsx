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
import { backendEvents } from "../../../../addons/fe_Builder/src/events/events.backend";
import { AppContext } from "../../../provider/Provider.State";

function BuilderFlow() {
  const { dummyOas } = useContext(AppContext);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [builderId, setBuilderId] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const path = "/builder/api.sample.com/items/post";
    async function fetchData() {
      try {
        const response = await fetch(
          `/manage/endpoint/?path=${encodeURIComponent(
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
    <SeraButton
      icon={<InventoryIcon size="18" color="#fff" />}
      isSelected={true}
      border={true}
      onPress={() => {}}
    />
  );
  const RightButton = () => (
    <SeraButton
      icon={<EventsIcon size="18" secondaryColor="#fff" color="#fff" />}
      isSelected={true}
      border={true}
      onPress={() => {}}
    />
  );

  return (
    <Header
      title={"Builder"}
      subtitle={"inventory/api.sample.com/pets/"}
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
            oas={dummyOas}
            builderId={builderId}
            type={"builder"}
          />
        )}
      </div>
    </Header>
  );
}

export default BuilderFlow;
