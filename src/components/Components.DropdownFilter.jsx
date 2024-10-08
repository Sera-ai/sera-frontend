import React, { useState, useRef, useEffect } from "react";
import Transition from "../utils/Transition";
import { NewFilterIcon } from "./standard/Standard.Icons";

function DropdownFilter({
  align = false,
  setColumns,
  columns,
  existingColumns = [],
}) {
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

  const handleChange = (column) => {
    if (columns.includes(column)) {
      const newColumns = columns.filter((col) => col !== column);
      setColumns(newColumns);
    } else {
      const newColumns = [...columns, column]; // Create a new array with the new column
      setColumns(newColumns);
    }
  };

  function camelCaseToTitle(camelCase) {
    // Split the camelCase string at each uppercase letter
    const words = camelCase.match(/[A-Z][a-z]+|[a-z]+/g);

    // Capitalize the first letter of each word and join them with a space
    const titleCase = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return titleCase;
  }

  const getColumns = () => {
    return existingColumns.map((column) => {
      return (
        <li className="py-1 px-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={!columns.includes(column)}
              onChange={() => {
                handleChange(column);
              }}
            />
            <span className="text-sm font-medium ml-2">
              {camelCaseToTitle(column)}
            </span>
          </label>
        </li>
      );
    });
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className={` cursor-pointer sidebarItem flex items-center justify-center sidebarButtonSelect h-[36px] w-[36px]`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Filter</span>
        <wbr />
        <NewFilterIcon />
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`origin-top-right z-10 absolute top-full left-0 right-auto min-w-56  mainDark border border-slate-200 dark:border-slate-700 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === true ? "md:left-auto md:right-0" : "md:left-0 md:right-auto"
        }`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-3">
            Filters
          </div>
          <ul className="mb-4">{getColumns()}</ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownFilter;
