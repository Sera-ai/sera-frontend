import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Table = ({
  filter,
  columns,
  data,
  linkClasses,
  selectedItems,
  setSelectedItems,
  selectAllRef,
  allowSelect = true,
  padded = false,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (selectAllRef.current) {
      const allIds = data.map((_, index) => index);
      const selectedIds = Object.keys(selectedItems).map(Number);

      selectAllRef.current.indeterminate =
        selectedIds.length > 0 && selectedIds.length < allIds.length;
    }
  }, [selectedItems, columns]);

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
        typeof item[key] == "boolean" || typeof item[key] == "object";
      const highlightedContent = highlightMatch(directCell ? "" : cellContent);
      return (
        <td
          className={`${isLinkClass(key)} pl-${int === 0 && !allowSelect ? "4" : "0"}`}
          style={{ display: columns.includes(key) ? "none" : "" }}
        >
          {directCell ? (
            // Render the content directly as text when directCell is true.
            <span className="hi">{cellContent}</span>
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
    <div className={`overflow-auto h-full ${!padded ? `mt-4` : "mt-1"}`}>
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
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
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
          ))}
        </tbody>
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
      return data;
    case "number":
      return data.toString();
    case "boolean":
      return (
        <input
          className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] 
          after:absolute after:z-[2] after:-mt-[0.275rem] after:-ml-[0.275rem] after:h-5 after:w-5 after:rounded-full 
          after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] 
          after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] 
          checked:after:-mt-[0.275rem] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none 
          checked:after:bg-primary checked:bg-primary dark:checked:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] 
          checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] 
          focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] 
          checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] 
          checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-primary dark:after:bg-neutral-400 dark:checked:bg-primary 
          dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
      );
    case "object":
      return isArray(data) ? "array" : "object";
  }
}
