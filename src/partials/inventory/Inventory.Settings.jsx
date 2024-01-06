import React, { useState } from "react";
import InventoryHeader from "../../components/page/Components.Page.Inventory.Header";
import ToggleSwitch from "../../components/standard/Standard.Toggle";
import Dropdown from "../../components/standard/Standard.Dropdown";
import ModalSearch from "../../components/Components.ModalSearch";
import { SettingsIcon } from "../../components/standard/Standard.Icons";

function InventoryHostSettings({ endpoint }) {
  const [filter, setFilter] = useState("");

  const GeneralOptions = [
    {
      title: "Secure Connections",
      subtitle: "Force HTTPS usage (Recommended for public endpoints)",
    },
    {
      title: "Strict Proxying",
      subtitle: "Only route requests defined in the OAS",
    },
    {
      title: "Learning Mode",
      subtitle: "Build OAS based on new calls with new data",
    },
  ];

  const DnsOptions = [
    {
      title: "Use DNS for Routing",
      subtitle: "Utilize DNS to reroute traffic",
    },
  ];

  const BuilderOptions = [
    {
      title: "View Other Users",
      subtitle: "View other user cursors and activities",
    },
  ];

  return (
    <div className="flex flex-col space-y-2">
      <InventoryHeader paths={[]} method={"GET"} />
      <div className="dash-card h-full w-full">
        <SearchSettings setFilter={setFilter} filter={filter} />
        <SettingsComponent
          filter={filter}
          options={GeneralOptions}
          icon={<SettingsIcon />}
        />
        <SettingsComponent
          filter={filter}
          options={DnsOptions}
          icon={<SettingsIcon />}
        />
        <SettingsComponent
          filter={filter}
          options={BuilderOptions}
          icon={<SettingsIcon />}
        />
      </div>
    </div>
  );
}

export default InventoryHostSettings;

const SettingsComponent = ({ filter, options, icon }) => {
  const TitleComponent = ({ icon = null, title, subtitle }) => (
    <div className="flex flex-row items-center space-x-4 py-2">
      {icon}
      <div className="flex flex-col">
        <span className="text-sm text-white">{title}</span>
        <span className="text-xs">{subtitle}</span>
      </div>
    </div>
  );

  const MapOptions = () => {
    return options.map((option) => {
      return (
        <div
          className={`flex flex-row justify-between items-center dropdown-selector ${
            !option.title.toLowerCase().includes(filter.toLowerCase()) &&
            !option.subtitle.toLowerCase().includes(filter.toLowerCase()) &&
            "hidden"
          }`}
        >
          <TitleComponent title={option.title} subtitle={option.subtitle} />
          <ToggleSwitch />
        </div>
      );
    });
  };

  const selector = (
    <TitleComponent
      icon={icon}
      title={"General Settings"}
      subtitle={`General Settings for the host: ${"example.com"}`}
    />
  );

  return (
    <Dropdown selector={selector}>
      <MapOptions />
    </Dropdown>
  );
};

const SearchSettings = ({ filter, setFilter }) => {
  return (
    <form className="border-b border-slate-200 dark:border-slate-700 py-2 px-4">
      <div className="relative">
        <input
          className="w-full text-sm px-1 dark:text-slate-300 secondaryDark border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none"
          type="search"
          placeholder="Filter Settings"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
    </form>
  );
};
