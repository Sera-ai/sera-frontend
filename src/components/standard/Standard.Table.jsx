import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "./Standard.Toggle";

const Table = ({
  filter,
  columns,
  data,
  raw = false,
  linkClasses,
  selectedItems,
  setSelectedItems,
  selectAllRef,
  allowSelect = true,
  padded = false,
}) => {
  const navigate = useNavigate();
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    if (selectAllRef.current) {
      const allIds = data.map((_, index) => index);
      const selectedIds = Object.keys(selectedItems).map(Number);

      selectAllRef.current.indeterminate =
        selectedIds.length > 0 && selectedIds.length < allIds.length;
    }
  }, [selectedItems, columns]);

  // Method to handle expanding/collapsing groups
  const toggleGroup = (groupName) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  // Function to dynamically determine the key to group by
  const getGroupingKey = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return "";
    }
    // Assume the first key of the first object is the key we want to group by
    const firstObjKeys = Object.keys(data[0]);
    return firstObjKeys.length > 0 ? firstObjKeys[0] : "";
  };

  // Modified to dynamically group data based on the first key of the object
  const getGroupedData = () => {
    const groupingKey = getGroupingKey(data);
    if (!groupingKey) {
      return null; // or some fallback UI/behavior
    }

    const grouped = data.reduce((acc, item) => {
      const groupName = item[groupingKey];
      (acc[groupName] = acc[groupName] || []).push(item);
      return acc;
    }, {});

    return Object.entries(grouped).map(
      ([groupName, groupItems], groupIndex) => {
        // Check if the group has more than one item to decide whether to enable toggle functionality
        const isGroupToggleEnabled = groupItems.length > 1;

        return (
          <React.Fragment key={groupName}>
            {isGroupToggleEnabled && (
              <tr
                onClick={() => isGroupToggleEnabled && toggleGroup(groupName)}
                style={{ cursor: isGroupToggleEnabled ? "pointer" : "default" }}
              >
                <td
                  colSpan={columns.length + (allowSelect ? 1 : 0)}
                  className="group-header pl-4"
                >
                  {groupName} ({groupItems.length})
                </td>
              </tr>
            )}
            {expandedGroups[groupName] || !isGroupToggleEnabled
              ? groupItems.map((item, index) => (
                  <tr key={`${groupName}-${index}`}>
                    {/* Your existing row rendering logic here, using getRows(item) */}
                    {allowSelect && (
                      <td className="pl-8">
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={!!selectedItems[index]}
                          onChange={() => handleSelectItem(index)}
                        />
                      </td>
                    )}
                    {getRows(item)}
                  </tr>
                ))
              : null}
          </React.Fragment>
        );
      }
    );
  };

  const handleSelectAll = (event) => {
    const newSelectedItems = event.target.checked
      ? data.reduce((obj, _, index) => ({ ...obj, [index]: true }), {})
      : {};
    setSelectedItems(newSelectedItems);
  };

  const handleSelectItem = (index) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [index]: !prevSelectedItems[index],
    }));
  };

  const getHeaders = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return []; // Return an empty array or any other default value
    }
    return Object.keys(data[0]).map((key, int) => {
      return (
        <th
          style={{ display: columns.includes(key) ? "none" : "" }}
          className={`pl-${int == 0 && !allowSelect ? "4" : "0"}`}
        >
          {camelCaseToTitle(key)}
        </th>
      );
    });
  };

  const isLinkClass = (key) => {
    return linkClasses.includes(key) ? "linkeable" : "";
  };

  const filteredData = filter
    ? data.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(filter.toLowerCase())
        )
      )
    : data;

  const highlightMatch = (text) => {
    if (!filter) return text;
    const regex = new RegExp(`(${filter})`, "gi");
    return text.replace(
      regex,
      (match) => `<span class="highlight">${match}</span>`
    );
  };

  const getRows = (item) => {
    return Object.keys(item).map((key, int) => {
      const cellContent = parseType(item[key]);
      const directCell =
        typeof item[key] == "boolean" ||
        typeof item[key] == "object" ||
        typeof cellContent != "string";
      const highlightedContent = highlightMatch(directCell ? "" : cellContent);
      return (
        <td
          className={`${isLinkClass(key)} pl-${int === 0 && !allowSelect ? "4" : "0"}`}
          style={{ display: columns.includes(key) ? "none" : "" }}
        >
          {directCell ? (
            // Render the content directly as text when directCell is true.
            <span>{cellContent}</span>
          ) : (
            // Use dangerouslySetInnerHTML when directCell is false, but ensure it is used wisely.
            <span
              dangerouslySetInnerHTML={{ __html: highlightedContent || "" }}
            ></span>
          )}
        </td>
      );
    });
  };

  const allItemsSelected = Object.keys(selectedItems).length === data.length;

  return (
    <div
      className={`overflow-auto w-full h-full ${!padded ? `mt-4` : raw ? "" : "mt-1"}`}
    >
      <table
        className={`eventsTable ${padded ? "largerPad" : "regularPad"} w-full`}
      >
        <thead className="secondaryDark" style={{ position: "sticky", top: 0 }}>
          <tr>
            {allowSelect && (
              <th className="pl-8">
                <input
                  type="checkbox"
                  className="checkbox"
                  ref={selectAllRef}
                  onChange={handleSelectAll}
                  checked={allItemsSelected}
                />
              </th>
            )}
            {getHeaders()}
            {/* ... all other headers */}
          </tr>
        </thead>
        <tbody>{getGroupedData()}</tbody>
      </table>
    </div>
  );
};

export default Table;

function camelCaseToTitle(camelCase) {
  // Split the camelCase string at each uppercase letter
  const words = camelCase.match(/[A-Z][a-z]+|[a-z]+/g);

  // Capitalize the first letter of each word and join them with a space
  const titleCase = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return titleCase;
}

function parseType(data) {
  switch (typeof data) {
    case "string":
      const regex = /\[([^\]]+)\]\(([^)]+)\)/;

      if (regex.test(data)) {
        const matches = data.match(regex);
        return <a href={matches[2]}>{matches[1]}</a>;
      } else {
        return data;
      }
    case "number":
      return data.toLocaleString();
    case "boolean":
      return <ToggleSwitch initialValue={data} full={false} />;
    case "object":
      return Array.isArray(data) ? "array" : "object";
  }
}
