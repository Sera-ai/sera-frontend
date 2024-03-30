import React, { useEffect, useState } from "react";
import InventoryHeader from "../../../../components/page/Components.Page.Inventory.Header";
import ToggleSwitch from "../../../../components/standard/Standard.Toggle";
import Dropdown from "../../../../components/standard/Standard.Dropdown";
import { SettingsIcon } from "../../../../components/standard/Standard.Icons";

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
        title: "Secure Connections",
        subtitle: "Force HTTPS usage (Recommended for public endpoints",
        value: selectedHostData?.sera_config?.https,
      },
      {
        title: "Strict Proxying",
        subtitle: "Only route requests defined in the OAS",
        value: selectedHostData?.sera_config?.strict,
      },
      {
        title: "Learning Mode",
        subtitle: "Build OAS based on new calls with new data",
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
      />
    </div>
  );
};

export default InventoryHostSettings;

const SettingsComponent = ({ filter, options, icon }) => {
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
          <ToggleSwitch initialValue={option.value} />
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
