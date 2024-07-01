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

  const GetRows = () => {
    return eventLogs.map((log) => {
      return (
        <tr>
          <td>{log.type}</td>
          <td>{log.ts}</td>
          <td>{log.message}</td>
        </tr>
      );
    });
  };

  return (
    <Header
      title={"Log Explorer"}
      subtitle={"Below is a list of all logs from the Sera system."}
      tier={2}
    >
      <div className="h-full w-full flex flex-row pt-1 gap-1">
        <ListSideBarLogs logSources={logTypes} setLogType={setLogType} />
        <div className="h-full w-full flex flex-col">
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
            <NewBarChart height={200} />
          </div>
          <div className="h-full w-full  overflow-y-scroll flex flex-col">
            <table className="w-full logTable">
              <thead className="w-full">
                <th>Log Name</th>
                <th>Timestamp</th>
                <th className="w-full">Message</th>
              </thead>
              <tbody>
                <GetRows />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default Logs;

const Table = ({
  padded,
  allowSelect,
  filter,
  setFilter,
  columns,
  data,
  linkClasses,
  selectedItems,
  setSelectedItems,
  selectAllRef,
}) => {
  return <div>hi</div>;
};
