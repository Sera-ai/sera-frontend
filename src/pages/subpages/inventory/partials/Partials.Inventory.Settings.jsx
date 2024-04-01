import React, { useEffect, useState } from "react";
import InventoryHeader from "../../../../components/page/Components.Page.Inventory.Header";
import ToggleSwitch from "../../../../components/standard/Standard.Toggle";
import Dropdown from "../../../../components/standard/Standard.Dropdown";
import { SettingsIcon } from "../../../../components/standard/Standard.Icons";
import { backendEvents } from "../../../../events/events.backend";

const InventoryHostSettings = ({ selectedHostData, mainDark = false }) => {
  const [filter, setFilter] = useState("");
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

  // Update generalOptions when the host changes
  useEffect(() => {
    console.log(selectedHostData);
    setGeneralOptions([
      {
        title: "General Settings",
        subtitle: `General Settings for the host: ${selectedHostData?.hostname || "example.com"}`,
      },
      {
        title: "Enforce HTTPS",
        subtitle: "Forces all connections to use HTTPS, enhancing security. Recommended for public-facing services",
        id: "https",
        value: selectedHostData?.sera_config?.https,
      },
      {
        title: "Strict API Routing",
        subtitle: "Routes requests strictly according to the available OpenAPI Specification (OAS)",
        id: "strict",
        value: selectedHostData?.sera_config?.strict,
      },
      {
        title: "Flexible API Matching",
        subtitle: "Permits variations in parameters and headers from the specified OAS, allowing for flexibility in API requests",
        id: "drift",
        value: selectedHostData?.sera_config?.drift,
      },
      {
        title: "Auto-Update OAS",
        subtitle: "Automatically updates the OAS with new endpoints and data from incoming requests, facilitating API evolution",
        id: "learn",
        value: selectedHostData?.sera_config?.learn,
      },
    ]);
  }, [selectedHostData]);

  return (
    <div className={`flex flex-col space-y-1 h-full w-full`}>
      <SearchSettings setFilter={setFilter} filter={filter} />
      <SettingsComponent
        filter={filter}
        options={generalOptions}
        icon={<SettingsIcon />}
        selectedHostData={selectedHostData}
      />
    </div>
  );
};

export default InventoryHostSettings;

const SettingsComponent = ({ filter, options, icon, selectedHostData }) => {
  const TitleComponent = ({ icon = null, title, subtitle }) => (
    <div className="flex flex-row  items-center space-x-4 py-2">
      {icon}
      <div className="flex flex-col">
        <span className="text-sm text-white">{title}</span>
        <span className="text-xs">{subtitle}</span>
      </div>
    </div>
  );

  const MapOptions = () => {
    return options.map((option, int) => {
      const [checked, setChecked] = useState(option.value);
      const updateChecked = (value) => {
        if (value != checked) {
          backendEvents().updateHost({
            host_id: selectedHostData._id,
            field: option.id,
            key: value,
          });

          setChecked(value);
        }
      };
      if (int == 0) return;
      return (
        <div
          className={`flex flex-row justify-between items-center ${int != options.length - 1 ? "dropdown-selector" : ""} ${
            !option.title.toLowerCase().includes(filter.toLowerCase()) &&
            !option.subtitle.toLowerCase().includes(filter.toLowerCase()) &&
            "hidden"
          }`}
        >
          <TitleComponent title={option.title} subtitle={option.subtitle} />
          <ToggleSwitch
            initialValue={checked}
            onToggle={(value) => updateChecked(value)}
          />
        </div>
      );
    });
  };

  const selector = (
    <TitleComponent
      icon={icon}
      title={options[0].title}
      subtitle={options[0].subtitle}
    />
  );

  return (
    <div className="secondaryDark rounded-sm">
      <Dropdown defaultOpen={true} selector={selector}>
        <MapOptions />
      </Dropdown>
    </div>
  );
};

const SearchSettings = ({ filter, setFilter }) => {
  return (
    <form className={`rounded-sm secondaryDark py-2 px-4`}>
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
