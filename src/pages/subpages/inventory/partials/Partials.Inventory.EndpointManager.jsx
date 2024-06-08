import React, { useState, useRef, useEffect, useContext } from "react";
import { backendEvents } from "../../../../events/events.backend";
import { AppContext } from "../../../../provider/Provider.State";
import Header from "../../../../components/custom/Custom.Header.Title";
import ToggleSwitch from "../../../../components/standard/Standard.Toggle";
import { StandardButton } from "../../../../components/standard/Standard.Buttons";

import {
  CancelGlobeIcon,
  GlobeIcon,
  TrashIcon,
  PostmanIcon,
} from "../../../../assets/assets.svg";
import { SeraButton } from "../../events/Sub.Events.Playbook.Builder";

const EndpointManager = ({ endpoint, hostDns, selectedHostData }) => {
  return (
    <EndpointSettings
      endpoint={endpoint}
      hostDns={hostDns}
      selectedHostData={selectedHostData}
    />
  );
};

export default EndpointManager;

const EndpointSettings = ({ hostDns, selectedHostData }) => {
  const ParentDiv = ({ children }) => {
    return (
      <div className="w-full flex-col flex p-4 mainDark rounded-md">
        {children}
      </div>
    );
  };

  const RouteItems = ({ route }) => (
    <div className="flex flex-row flex-1 space-x-6">
      <div className="flex flex-grow flex-col space-y-1 text-sm">
        <label>Route Type</label>
        <input type="text" value={route.type} disabled />
      </div>
      <div className="flex flex-shrink flex-row items-end space-x-2">
        <div className="flex flex-grow flex-col space-y-1 text-sm">
          <label>subdomain</label>
          <input type="text" value={route.subdomain} disabled />
        </div>
        <text>.</text>
        <div className="flex flex-grow flex-col space-y-1 text-sm">
          <label>domain</label>
          <input type="text" value={route.domain} disabled />
        </div>
      </div>
      <div className="flex items-end" style={{ width: 30 }}>
        {!route?.disabled && <SeraButton icon={<TrashIcon />} />}
      </div>
    </div>
  );

  const GetRouteItems = () => {
    const mapItems = [
      { type: "Default", subdomain: "reqres", domain: "sera" },
      { type: "Obfuscated", subdomain: "gnn34t3d", domain: "nc44" },
      { type: "Custom", subdomain: "reqres", domain: "local" },
    ];

    return mapItems.map((route) => <RouteItems route={route} />);
  };

  return (
    <div
      className={"w-full h-full mainDark flex justify-center items-start py-20"}
    >
      <div className="dash-card settings inline-flex flex-grow max-h-full max-w-[1000px] overflow-y-scroll no-scrollbar w-full">
        <Header
          title={`${selectedHostData?.hostname} Routing Settings`}
          subtitle={"Host specific settings"}
          subBar
          overflow
          tier={3}
        >
          <div
            className="w-full flex-col flex p-4 space-y-4"
            style={{ borderTopWidth: 16, borderColor: "#191A21" }}
          >
            <h2 className="text-slate-800 dark:text-slate-100 uppercase text-xs">
              {selectedHostData?.hostname} Host Routing Settings
            </h2>
            <ParentDiv>
              <div className="w-full flex-col flex space-y-6">
                <GetRouteItems />
              </div>
            </ParentDiv>
            <div className="flex flex-shrink">
              <StandardButton text={"Create Route"} />
            </div>
          </div>
        </Header>
      </div>
    </div>
  );
};