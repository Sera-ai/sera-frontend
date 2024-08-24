import { useState } from "react";

export function ListSidebar({
  inventory = [],
  selectedHost,
  setSelectedHost,
  addHost = false,
  addHostSelect,
}) {
  let eps = {};

  const [filter, setFilter] = useState("");

  console.log(inventory);

  inventory.forEach((item) => {
    if (item.hostname) {
      const host = item.hostname;
      if (eps[host]) {
        eps[host] += 1;
      } else {
        eps[host] = 1;
      }
    }
  });

  const highlightMatch = (text, part) => {
    if (!part) {
      return text;
    }
    const parts = text.split(new RegExp(`(${part})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === filter.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const GetList = () => {
    const filteredHosts = Object.keys(eps).filter((endpoint) =>
      endpoint.toLowerCase().includes(filter.toLowerCase())
    );

    return filteredHosts.map((endpoint) => (
      <div
        className={`flex flex-row justify-between items-center py-1.5 px-4 listItemLink ${
          selectedHost === endpoint && "mainDark"
        }`}
        onClick={() => setSelectedHost(encodeURIComponent(endpoint))}
        key={endpoint}
      >
        <span
          className={` ${selectedHost === endpoint && "blue-color"}`}
        >
          {highlightMatch(endpoint, filter)}
        </span>
        <span className={`text-xs`}>{eps[endpoint]}</span>
      </div>
    ));
  };

  return (
    <div className="dash-card w-[250px] min-w-[250px] text-xs text-white">
      <div className="px-4 flex flex-row items-center h-[56px]">
        <form className="border-b border-slate-200 dark:border-slate-700">
          <div className="relative">
            <input
              className="w-full text-sm px-1 dark:text-slate-300 secondaryDark border-0 focus:ring-transparent placeholder-slate-400 dark:placeholder-slate-500 appearance-none"
              type="search"
              placeholder="Filter Hosts"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </form>
      </div>
      <hr className="w-full h-1 bg-slate-200 mainDark border-none " />
      <div className="text-xs text-white py-4">
        <div className="flex flex-row justify-between pb-2 px-4">
          <span className="text-xs uppercase">Hosts</span>
          <span className="text-xs uppercase">EP</span>
        </div>
        <GetList />
        {addHost && (
          <div
            style={{ color: "#4799ff", cursor: "pointer", paddingLeft: 16, marginTop: 6 }}
            onClick={addHostSelect}
          >
            + Add Host
          </div>
        )}
      </div>
    </div>
  );
}
