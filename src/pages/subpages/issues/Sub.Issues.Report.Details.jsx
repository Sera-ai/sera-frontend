import React, { useState, useContext } from "react";
import VerticalTimeline from "../../../components/Components.VerticalTimeline";

const ReportDetails = ({ incidentId = "test" }) => {
  return (
    <div className="flex flex-col flex-grow overflow-x-auto">
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
    </div>
  );
};

export default ReportDetails;

const EventItem = () => {
  const [open, setOpen] = useState(true);
  const method = "POST";
  return (
    <div className="w-full">
      <div
        className="w-full text-xs p-2 pl-8"
        style={{
          backgroundColor: "#131416",
          borderBottomWidth: 1,
          borderBottomColor: "#ffffff10",
        }}
        onClick={() => setOpen(!open)}
      >
        <div class="flex items-center space-x-2">
          <svg
            style={{ transform: `rotate(${open ? "0deg" : "-90deg"})` }}
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
          >
            <path
              d="M0.583497 0.249918C0.736275 0.0971401 0.930718 0.0207516 1.16683 0.0207516C1.40294 0.0207516 1.59739 0.0971402 1.75016 0.249918L5.00016 3.49992L8.25016 0.249918C8.40294 0.0971405 8.59739 0.0207519 8.8335 0.0207519C9.06961 0.0207519 9.26405 0.0971405 9.41683 0.249918C9.56961 0.402696 9.646 0.59714 9.646 0.833251C9.646 1.06936 9.56961 1.26381 9.41683 1.41659L5.5835 5.24992C5.50016 5.33325 5.40989 5.39242 5.31266 5.42742C5.21544 5.46242 5.11127 5.47964 5.00016 5.47909C4.88905 5.47909 4.78489 5.46158 4.68766 5.42658C4.59044 5.39158 4.50016 5.3327 4.41683 5.24992L0.583497 1.41659C0.430719 1.26381 0.354329 1.06936 0.354329 0.833251C0.354329 0.59714 0.430719 0.402696 0.583497 0.249918Z"
              fill="#fff"
              fill-opacity="0.7"
            />
          </svg>
          <span>
            ISU014 -{" "}
            <span
              className={`inline-flex items-center px-1.5 py-0.5 text-xs text-white rounded ${method}-color ${method}-bg-color`}
            >
              {method}
            </span>{" "}
            apisameple.com/pets
          </span>
        </div>
      </div>
      {open && (
        <div className="pl-8">
          <VerticalTimeline />
        </div>
      )}
    </div>
  );
};
