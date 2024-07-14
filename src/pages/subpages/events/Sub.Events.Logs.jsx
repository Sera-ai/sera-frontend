import React, { useState, useRef, useContext, useEffect } from "react";

import { AppContext } from "../../../provider/Provider.State";
import Header from "../../../components/custom/Custom.Header.Title";
import { ListSideBarLogs } from "../../../components/custom/Custom.ListSidebarLogs";
import { NewBarChart } from "../../../components/charts/Charts.BarChartEvents";
import Datepicker from "../../../components/Components.Datepicker";
import DropdownDate from "../../../components/Components.DropdownDate";
import { getEventLogs } from "../../../provider/Provider.Data";

function Logs() {
  const [periodSelection, setPeriodSelection] = useState("monthly");
  const [logTypes, setLogTypes] = useState([]);
  const [eventLogs, setEventLogs] = useState([]);
  const [logType, setLogType] = useState(null);
  const [filter, setFilter] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(null);

  selectedColumn

  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState('');
  const menuRef = useRef(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    const selection = window.getSelection().toString() || "";
    setSelectedText(selection);
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setShowMenu(true);
  };

  const handleClick = () => {
    setShowMenu(false);
  };

  const handleMouseDown = (event) => {
    if (event.target.closest('.logMenu')) {
      event.stopPropagation();
    }
  };

  const onSelectColumn = (selectedColumn) => {
    setSelectedColumn(selectedColumn)
  }

  useEffect(() => {
    const grabLogs = async () => {
      try {
        const eventLogsRes = await getEventLogs({
          period: periodSelection,
          type: logType,
        });
        setEventLogs(eventLogsRes.logs);
        setLogTypes(eventLogsRes.types);
      } catch (e) {
        console.warn(e);
      }
    };
    grabLogs();
  }, [logType, periodSelection]);

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

const GetRows = () => {
  return eventLogs.map((log, index) => (
    <tr
      key={index}
      style={{
        display: log.type.includes(filter) || log.ts.toString().includes(filter) || log.message.includes(filter) ? "table-row" : "none",
        width: "100%",
        wordBreak: "break-word",
      }}
    >
      <td style={{ wordBreak: "keep-all" }}>{log.type}</td>
      <td style={{ wordBreak: "keep-all" }}>{log.ts}</td>
      <td style={{ width: "100%", wordBreak: "break-word" }}>{log.message}</td>
    </tr>
  ));
};

  return (
    <Header
      title={"Log Explorer"}
      subtitle={"Below is a list of all logs from the Sera system."}
      setFilter={setFilter}
      filter={filter}
      filterPlaceholder="Search Log Entries"
      tier={2}
    >
      <div className="h-full w-full flex flex-row pt-1 gap-1">
        <ListSideBarLogs logSources={logTypes} setLogType={setLogType} />
        <div className="h-full flex-grow flex flex-col">
          <div className="flex flex-row w-full p-2 pr-4 items-center dash-card z-20">
            <h2 className="pl-2 uppercase text-xs text-slate-800 dark:text-slate-100 ">
              Log Explorer ({periodSelection})
            </h2>
            <div className="flex flex-grow" />
            <div className="gap-2 flex justify-center">
              <DropdownDate
                selection={periodSelection}
                onSelect={setPeriodSelection}
              />
              {periodSelection === "custom" && <Datepicker />}
            </div>
          </div>
          <div className="w-full flex">
            <NewBarChart height={200} onSelectColumn={onSelectColumn} selectedColumn={selectedColumn}/>
          </div>
          <div onClick={handleClick} onContextMenu={handleContextMenu} className="h-full w-full  overflow-y-scroll flex flex-col">
            <table className="w-full logTable">
              <thead className="w-full sticky">
                <th>Log Name</th>
                <th>Timestamp</th>
                <th className="w-full">Message</th>
              </thead>
              <tbody>
                <GetRows />
              </tbody>
            </table>
            {showMenu && (
              <ul
                ref={menuRef}
                className="logMenu absolute text-xs"
                style={{ top: menuPosition.y - 70, left: menuPosition.x - 50, backgroundColor: "#000000d0", borderRadius: 3, borderWidth: 1, borderColor: "#ffffff90"}}
              >
                <li onClick={() => alert('Action 1')}>Create Event for "{selectedText}"</li>
                <li onClick={() => setFilter(selectedText)}>Search Logs for "{selectedText}"</li>
                <li onClick={() => setShowMenu(false)}>Close</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </Header>
  );
}

export default Logs;

