import React, { useState, useEffect, useRef, useContext } from "react";

import { backendEvents } from "../../../../events/events.backend";
import { AppContext } from "../../../../provider/Provider.State";
import Header from "../../../../components/custom/Custom.Header.Title";
import ToggleSwitch from "../../../../components/standard/Standard.Toggle";
import { StandardButton } from "../../../../components/standard/Standard.Buttons";

const InventoryHostSettings = ({ selectedHostData, mainDark = false }) => {
  const [filter, setFilter] = useState("");
  const { eventInventory } = useContext(AppContext);
  const [generalOptions, setGeneralOptions] = useState([
    {
      title: "General Settings",
      subtitle: ``,
    },
    // Initial dummy values, these will be replaced by useEffect
    { title: "Secure Connections", subtitle: "", value: false },
    { title: "Strict Proxying", subtitle: "", value: false },
    { title: "Learning Mode", subtitle: "", value: false },
  ]);

  const InputType = ({ type, value, onEvent }) => {
    switch (type) {
      case "textbox":
        return (
          <input placeholder={value} className="w-full" onChange={onEvent} />
        );
      case "toggle":
        return <ToggleSwitch initialValue={value} onToggle={onEvent} />;
      case "button":
        return <StandardButton text={value} />;
    }
  };

  const SettingOption = ({
    type,
    id = "",
    title = "",
    subtitle = "",
    value = "",
  }) => {
    const isVisible =
      title.toLowerCase().includes(filter.toLowerCase()) ||
      subtitle.toLowerCase().includes(filter.toLowerCase());

    const updateChecked = (v) => {
      if (v != checked) {
        backendEvents().updateHost({
          host_id: selectedHostData?._id,
          field: id,
          key: v,
        });
      }
    };

    return (
      <div
        style={{ display: isVisible ? "" : "none" }}
        className={`w-full flex flex-row`}
      >
        <div className="flex flex-col flex-grow pr-4">
          <text className="text-sm text-white">{title}</text>
          <text className="text-xs">{subtitle}</text>
        </div>
        <div className="flex w-[200px] min-w-[200px] items-start pl-4">
          <InputType
            type={type}
            value={value}
            onEvent={() => {
              (v) => updateChecked(v);
            }}
          />
        </div>
      </div>
    );
  };

  const SettingBlock = ({ children, last = false }) => {
    const blockRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      if (blockRef.current) {
        const visibleChildren = Array.from(blockRef.current.childNodes).filter(
          (child) => getComputedStyle(child).display !== "none"
        );
        setIsVisible(visibleChildren.length > 0);
      }
    }, [children]);

    return isVisible ? (
      <div
        className={`w-full space-y-4 ${!last && "pb-4"}`}
        style={{
          borderBottomWidth: !last ? 1 : 0,
          borderBottomColor: !last ? "#ffffff30" : null,
        }}
        ref={blockRef}
      >
        {children}
      </div>
    ) : null;
  };

  const ParentDiv = ({ children }) => {
    return (
      <div
        className="w-full flex-col flex pt-4"
        style={{ borderTopWidth: 16, borderColor: "#191A21" }}
      >
        {children}
      </div>
    );
  };

  console.log("selectedHostData", selectedHostData);

  return (
    <div
      className={"w-full h-full mainDark flex justify-center items-start py-20"}
    >
      <div className="dash-card inline-flex flex-grow max-h-full max-w-[1000px] overflow-y-scroll no-scrollbar w-full">
        <Header
          title={`${selectedHostData?.hostname} Settings`}
          subtitle={"Host specific settings"}
          filterPlaceholder="Filter Settings"
          setFilter={setFilter}
          subBar
          overflow
          tier={2}
        >
          <ParentDiv>
            <h2
              className="text-slate-800 dark:text-slate-100 pb-4 uppercase text-xs px-8"
              style={{ borderBottomWidth: 2, borderColor: "#191A21" }}
            >
              {selectedHostData?.hostname} Host Settings
            </h2>
            <div className="w-full flex-row flex px-4">
              <div className="flex flex-col flex-1 p-4 space-y-4">
                <SettingBlock last={true}>
                  <SettingOption
                    type={"toggle"}
                    title="Enforce HTTPS"
                    subtitle="Forces all connections to use HTTPS, enhancing security. Recommended for public-facing services"
                    id="https"
                    value={selectedHostData?.sera_config?.https}
                  />
                  <SettingOption
                    type={"toggle"}
                    title="Strict API Routing"
                    subtitle="Routes requests strictly according to the available OpenAPI Specification (OAS)"
                    id="strict"
                    value={selectedHostData?.sera_config?.strict}
                  />
                </SettingBlock>
              </div>
              <div className="flex flex-col flex-1 p-4 space-y-4">
                <SettingBlock last>
                  <SettingOption
                    type={"toggle"}
                    title="Flexible API Matching"
                    subtitle="Permits variations in parameters and headers from the specified OAS, allowing for flexibility in API requests"
                    id="drift"
                    value={selectedHostData?.sera_config?.drift}
                  />
                  <SettingOption
                    type={"toggle"}
                    title="Auto-Update OAS"
                    subtitle="Automatically updates the OAS with new endpoints and data from incoming requests, facilitating API evolution"
                    id="learn"
                    value={selectedHostData?.sera_config?.learn}
                  />
                </SettingBlock>
              </div>
            </div>
          </ParentDiv>
        </Header>
      </div>
    </div>
  );
};

export default InventoryHostSettings;
