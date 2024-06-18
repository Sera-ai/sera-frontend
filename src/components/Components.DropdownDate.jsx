import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";

function DropdownDate({ align, selection = null, onSelect = () => {} }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const itemSelected = (res) => {
    setDropdownOpen(false);
    console.log(res)
    onSelect(res.toLowerCase());
  };

  return (
    <div className="relative inline-flex dropdownDate">
      <button
        ref={trigger}
        className={`z-40 py-2 form-input pl-9 secondaryDark text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 text-xm ${dropdownOpen && "bg-slate-200"}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 fill-current text-slate-500 dark:text-slate-400 ml-3"
            viewBox="0 0 16 16"
          >
            <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
          </svg>
        </div>
        <span className="capitalize">{selection ?? "Select Date"}</span>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-40  mainDark border border-slate-200 dark:border-slate-700 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === "right" ? "right-0" : "left-0"}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-3">
            Select Period
          </div>
          <ul>
            <li
              className="border-b border-slate-200 dark:border-slate-700 last:border-0"
              onClick={() => itemSelected("Monthly")}
            >
              Monthly
            </li>
            <li
              className="border-b border-slate-200 dark:border-slate-700 last:border-0"
              onClick={() => itemSelected("Weekly")}
            >
              Weekly
            </li>
            <li
              className="border-b border-slate-200 dark:border-slate-700 last:border-0"
              onClick={() => itemSelected("Daily")}
            >
              Daily
            </li>
            <li
              className="border-b border-slate-200 dark:border-slate-700 last:border-0"
              onClick={() => itemSelected("Custom")}
            >
              Custom
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownDate;
