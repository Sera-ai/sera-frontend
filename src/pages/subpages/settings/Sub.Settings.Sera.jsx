import React, { useState, useEffect, useRef, useContext } from "react";

import Header from "../../../components/custom/Custom.Header.Title";
import ToggleSwitch from "../../../components/standard/Standard.Toggle";
import { StandardButton } from "../../../components/standard/Standard.Buttons";

function SeraSettings() {
  const [filter, setFilter] = useState("");

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

  const SettingOption = ({ type, title = "", subtitle = "", value = "" }) => {
    const isVisible =
      title.toLowerCase().includes(filter.toLowerCase()) ||
      subtitle.toLowerCase().includes(filter.toLowerCase());

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
          <InputType type={type} value={value} onEvent={() => {}} />
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

  return (
    <div className={"w-full h-full mainDark flex justify-center items-start py-20"}>
      <div className="dash-card inline-flex flex-grow max-h-full max-w-[1000px] overflow-y-scroll no-scrollbar w-full">
        <Header
          title={"System Settings"}
          subtitle={"Settings that handle how Sera operates"}
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
              Sera Settings
            </h2>
            <div className="w-full flex-row flex px-4">
              <div className="flex flex-col flex-1 p-4 space-y-4">
                <SettingBlock last={true}>
                  <SettingOption
                    type={"toggle"}
                    title="Sera Enabled"
                    subtitle="Enable or Disable Sera"
                    value="Placeholder value"
                  />
                  <SettingOption
                    type={"toggle"}
                    title="Passthrough Mode"
                    subtitle="Enable passthrough (no policy enforcement)"
                    value="Placeholder value"
                  />
                </SettingBlock>
              </div>
              <div className="flex flex-col flex-1 p-4 space-y-4">
                <SettingBlock last>
                  <SettingOption
                    type={"toggle"}
                    title="Sera Maintenance Mode"
                    subtitle="Set Sera In Maintenance Mode for Management"
                    value="Placeholder value"
                  />
                  <SettingOption
                    type={"button"}
                    title="Check For Updates"
                    subtitle="Check for Sera updates online"
                    value="Update Sera"
                  />
                </SettingBlock>
              </div>
            </div>
          </ParentDiv>
          <ParentDiv>
            <h2
              className="text-slate-800 dark:text-slate-100 pb-4 uppercase text-xs px-8"
              style={{ borderBottomWidth: 2, borderColor: "#191A21" }}
            >
              Proxy Settings
            </h2>
            <div className="w-full flex-row flex px-4">
              <div className="flex flex-col flex-1 p-4 space-y-4">
                <SettingBlock>
                  <SettingOption
                    type={"toggle"}
                    title="Log All Requests"
                    subtitle="Keep a log of all requests in the database"
                    value="Placeholder value"
                  />
                  <SettingOption
                    type={"toggle"}
                    title="Passthrough Mode"
                    subtitle="Remove all policy and allow for forwarding of all requests"
                    value="Placeholder value"
                  />
                </SettingBlock>
                <SettingBlock>
                  <SettingOption
                    type={"toggle"}
                    title="Cache Requests"
                    subtitle="Cache proxied requests for faster response time"
                    value="Placeholder value"
                  />
                  <SettingOption
                    type={"textbox"}
                    title="Cache TTL"
                    subtitle="Time to live for proxy cache (In seconds)"
                    value="600"
                  />
                </SettingBlock>
                <SettingBlock last>
                  <SettingOption
                    type={"textbox"}
                    title="Rate Limiting"
                    subtitle="Rate limit per IP (0 is unlimited)"
                    value="0"
                  />
                  <SettingOption
                    type={"textbox"}
                    title="Bandwidth Throttling"
                    subtitle="Limit the data transmission speed in KB/s (0 is unlimited)"
                    value="0"
                  />
                </SettingBlock>
              </div>
              <div className="flex flex-col flex-1 p-4 space-y-4">
                <SettingBlock>
                  <SettingOption
                    type={"button"}
                    title="Custom Headers"
                    subtitle="Set custom headers for requests routed by Sera"
                    value="Set Headers"
                  />
                </SettingBlock>
                <SettingBlock>
                  <SettingOption
                    type={"button"}
                    title="IP Blacklist"
                    subtitle="Blacklisted IPs will be blocked by Sera"
                    value="Manage Blacklist"
                  />
                  <SettingOption
                    type={"button"}
                    title="IP Whitelist"
                    subtitle="Whitelisted IPs will never be blocked by Sera"
                    value="Manage Whitelist"
                  />
                </SettingBlock>
                <SettingBlock last>
                  <SettingOption
                    type={"button"}
                    title="SSL/TLS Settings"
                    subtitle="Set SSL and TLS settings for Sera"
                    value="Manage SSL/TLS"
                  />
                </SettingBlock>
              </div>
            </div>
          </ParentDiv>
          <ParentDiv>
            <h2
              className="text-slate-800 dark:text-slate-100 pb-4 uppercase text-xs px-8"
              style={{ borderBottomWidth: 2, borderColor: "#191A21" }}
            >
              DNS Settings
            </h2>
            <div className="w-full flex-row flex px-4">
              <div className="flex flex-col flex-1 p-4 space-y-4">
                <SettingBlock>
                  <SettingOption
                    type={"toggle"}
                    title="Route All Traffic"
                    subtitle="Route all traffic sent through DNS, if disabled, will only route traffic of defined custom domains"
                    value="Placeholder value"
                  />
                  <SettingOption
                    type={"button"}
                    title="Manage Custom Domains"
                    subtitle="Add or modify Sera associated domains"
                    value="Manage Domains"
                  />
                </SettingBlock>
                <SettingBlock last>
                  <SettingOption
                    type={"toggle"}
                    title="Cache DNS Route"
                    subtitle="Cache routes in DNS"
                    value="Placeholder value"
                  />
                  <SettingOption
                    type={"textbox"}
                    title="Cache TTL"
                    subtitle="Time to live for DNS cache (In seconds)"
                    value="600"
                  />
                </SettingBlock>
              </div>
              <div className="flex flex-col flex-1 p-4 space-y-4">
                <SettingBlock last>
                  <SettingOption
                    type={"button"}
                    title="Manage DNS Servers"
                    subtitle="Set or modify DNS servers for Sera DNS to route through"
                    value="Manage DNS"
                  />
                  <SettingOption
                    type={"toggle"}
                    title="DNS over HTTPS (DoH)"
                    subtitle="Toggle DNS over HTTPS for encrypted DNS queries"
                    value="Manage DNS"
                  />
                  <SettingOption
                    type={"toggle"}
                    title="DNS Logging"
                    subtitle="Toggle logging of DNS queries for monitoring purposes"
                    value="Manage DNS"
                  />
                </SettingBlock>
              </div>
            </div>
          </ParentDiv>
        </Header>
      </div>
    </div>
  );
}

export default SeraSettings;
