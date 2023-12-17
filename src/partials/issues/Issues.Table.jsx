import React, { useState, useEffect, useRef } from 'react';



const Table = ({ filter, columns, data }) => {
    const [selectedItems, setSelectedItems] = useState({});
    const selectAllRef = useRef(null);
    const linkClasses = ['host', 'endpoint', 'userIp', 'seraHost', 'seraEndpoint', 'builderId', 'issueId']

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
        setSelectedItems(prevSelectedItems => ({
            ...prevSelectedItems,
            [index]: !prevSelectedItems[index]
        }));
    };

    const getHeaders = () => {
        if (!Array.isArray(data) || data.length === 0) {
            return []; // Return an empty array or any other default value
        }
        return Object.keys(data[0]).map((key) => {
            return (<th style={{ display: columns.includes(key) ? "none" : "" }}>{camelCaseToTitle(key)}</th>)
        })
    }

    const isLinkClass = (key) => {
        return linkClasses.includes(key) ? "linkeable" : ""
    }

    const filteredData = filter
        ? data.filter(item =>
            Object.values(item).some(value =>
                value.toString().toLowerCase().includes(filter.toLowerCase())
            )
        )
        : data;

    const highlightMatch = (text) => {
        if (!filter) return text;
        const regex = new RegExp(`(${filter})`, 'gi');
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    };

    const getRows = (item) => {
        return Object.keys(item).map((key) => {
            const cellContent = item[key].toString();
            const highlightedContent = highlightMatch(cellContent);
            return <td className={`${isLinkClass(key)}`} style={{ display: columns.includes(key) ? "none" : "" }} dangerouslySetInnerHTML={{ __html: highlightedContent }}></td>;
        });
    };

    const allItemsSelected = Object.keys(selectedItems).length === data.length;

    return (
        <div className="overflow-auto h-full pt-4">
            <table className={"issuesTable w-full"}>
                <thead>
                    <tr>
                        <th className='pl-8'>
                            <input
                                type="checkbox"
                                ref={selectAllRef}
                                onChange={handleSelectAll}
                                checked={allItemsSelected}
                            />
                        </th>
                        {getHeaders()}
                        {/* ... all other headers */}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td className='pl-8'>
                                <input
                                    type="checkbox"
                                    checked={!!selectedItems[index]}
                                    onChange={() => handleSelectItem(index)}
                                />
                            </td>
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
    const titleCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return titleCase;
}
