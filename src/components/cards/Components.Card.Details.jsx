import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import { hexToRGB, tailwindConfig } from "../../utils/Utils";
import DropdownHelp from "../Components.DropdownHelp";
import BarChart02 from "../../charts/Charts.BarChart02";
import { AppContext } from "../../provider/Provider.State";

const CardDetails = ({ endpoint = "inventory/api.sample.com/pets/__post" }) => {
  const { endpointDetails } = useContext(AppContext);

  if (!endpointDetails[endpoint]) {
    return;
  }

  return (
    <div className="lg:col-span-1 md:col-span-1 sm:col-span-1 xs:col-span-1 dash-card p-4 flex flex-col">
      <h2 className="text-sm text-slate-800 dark:text-slate-100">
        Endpoint Statistics
      </h2>

      <table className="table-fixed w-full dark:text-slate-300">
        {/* Table header */}
        <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 rounded-sm sticky top-0">
          <tr>
            <th className="p-2 w-1/3">
              {" "}
              {/* Adjust the width as needed */}
              <div className="font-semibold text-center"></div>
            </th>
            <th className="p-2 w-2/3">
              {" "}
              {/* The rest of the table space */}
              <div className="font-semibold text-center"></div>
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
          {Object.keys(endpointDetails[endpoint]["statistics"]).map(
            (obj, index) => (
              <tr key={index} className=" rowItem noborder">
                <td className="">
                  <div className="flex flex-col">
                    <div
                      style={{ color: "#ffffff99" }}
                      className="text-slate-800 text-xs dark:text-slate-100"
                    >
                      {obj}
                    </div>
                  </div>
                </td>
                <td className="p-1">
                  <div className="flex flex-wrap gap-2">
                    <div className="text-slate-800 text-xs dark:text-slate-100 flex flex-wrap">
                      {endpointDetails[endpoint]["statistics"][obj]}
                    </div>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CardDetails;
