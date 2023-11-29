import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';

function OasParser({ oas, filter }) {
  const { host, paths, servers } = oas;
  const displayHost = host ? host : (servers && servers[0] ? servers[0].url : "");
  const parsedHost = new URL(displayHost).host;
  const parsedPaths = parseOasPaths(paths);

  // Initialize selected states for endpoints and methods
  const [selectedEndpointPath, setSelectedEndpointPath] = React.useState(null);
  const [selectedMethod, setSelectedMethod] = React.useState(null);
  const [isChecked, setChecked] = useState(true)

  // Handler for selecting an endpoint, which unselects any selected method
  const handleSelectEndpoint = (path) => {
    setSelectedEndpointPath(path);
    setSelectedMethod(null); // Reset method selection when an endpoint is selected
  };

  // Handler for selecting a method, which unselects any selected endpoint
  const handleSelectMethod = (methodId) => {
    setSelectedMethod(methodId);
    setSelectedEndpointPath(null); // Reset endpoint selection when a method is selected
  };
  const random = Math.random().toString(36).substring(7); // For unique IDs

  const handleSelect = (path) => {
    handleSelectEndpoint(path);  // use the full path to select the endpoint
  }

  const isSelected = parsedHost === selectedEndpointPath;

  return (
    <ul className="no-before no-space apiTree">

      <li className="no-before no-after no-space">
        <input id={`${parsedHost}-${random}`} checked={isChecked} onClick={() => setChecked(!isChecked)} type="checkbox" />
        <label
          htmlFor={`${parsedHost}-${random}`}
          onClick={handleSelect}
          className={`endpoint ${isSelected == null ? 'selected-endpoint' : ''}`}
          style={{ color: "#fff" }}
        >
          <Link to={parsedHost + "/"}>{parsedHost}</Link>
        </label>
        <ul>
          {Object.entries(parsedPaths).map(([pathName, pathData]) => (
            <Endpoint
              key={pathName}
              host={parsedHost}
              path={pathName}
              name={pathName}
              data={pathData}
              filter={filter}
              selectedPath={selectedEndpointPath}
              onSelect={handleSelectEndpoint}
              selectedMethod={selectedMethod}
              onSelectMethod={handleSelectMethod}
            />
          ))}
        </ul>
      </li>
    </ul>
  );
}

function parseOasPaths(paths) {
  const result = {};
  for (const path in paths) {
    const parts = path.split('/').filter(Boolean);
    let currentLevel = result;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!currentLevel[part]) {
        currentLevel[part] = {
          methods: [],
          children: {}
        };
      }
      if (i === parts.length - 1) { // If it's the last part of the path
        for (const method in paths[path]) {
          currentLevel[part].methods.push(method);
        }
      } else {
        currentLevel = currentLevel[part].children;
      }
    }
  }
  return result;
}

function Method({ path, type, host, onSelectMethod, isSelectedMethod, filter }) {
  const colorClass = `${type.toUpperCase()}-color`;
  const methodId = encodeURIComponent(`${host}/${path}/__${type}`).replace(/%2F/g, '/')

  const handleClick = (e) => {
    //e.preventDefault(); // Prevent the default link behavior
    onSelectMethod(`${host}/${path}/__${type}`); // Call the handler passed from the parent component
  };

  // Add a class for the selected method
  const selectedClass = isSelectedMethod ? 'selected-method' : '';

  if (filter && !methodId.includes(filter)) {
    return null;
  }

  return (
    <li>
      <Link to={methodId} onClick={handleClick}>
        <div className={`title ${colorClass} ${selectedClass}`} id={methodId}>
          <div className="fill"></div>
          <span className={"endpoint-title"}>{type.toUpperCase()}</span>
        </div>
      </Link>
    </li>
  );
}

function Endpoint({ path, name, data, host, selectedPath, onSelect, selectedMethod, onSelectMethod, filter }) {
  const random = Math.random().toString(36).substring(7); // For unique IDs

  const isSelected = path === selectedPath;
  const methodId = encodeURIComponent(`${host}/${path}`).replace(/%2F/g, '/');

  const [isChecked, setChecked] = useState(true)

  const handleSelect = () => {
    onSelect(path);  // use the full path to select the endpoint
  }

  const hasVisibleItems = (endpointPath, endpointData) => {
    // Check if the endpoint name matches the filter
    const isEndpointVisible = !filter || endpointPath.includes(filter);

    // Check if any methods match the filter
    const visibleMethods = endpointData.methods && endpointData.methods.some(method => {
      const methodId = `${host}/${endpointPath}/__${method}`;
      return !filter || methodId.includes(filter);
    });

    // Check if any nested endpoints are visible
    const visibleNestedEndpoints = endpointData.children && Object.entries(endpointData.children).some(([childName, childData]) => {
      return hasVisibleItems(`${endpointPath}/${childName}`, childData);
    });

    return isEndpointVisible || visibleMethods || visibleNestedEndpoints;
  };

  // Determine if the current endpoint has any visible items
  const isVisible = hasVisibleItems(path, data);

  // If filter is active and this endpoint has no visible items, do not render it
  if (filter && !isVisible) {
    return null;
  }

  return (
    <li>
      <input checked={isChecked} onClick={() => setChecked(!isChecked)} id={`${name}-${random}`} className={"endpoint-title"} type="checkbox" />
      <label
        htmlFor={`${name}-${random}`}
        onClick={handleSelect}
        className={`endpoint ${isSelected ? 'selected-endpoint' : ''}`}
      >
        <div className="fill"></div>
        <Link to={methodId}><span className={"endpoint-title"}>{name}</span></Link>
      </label>
      <ul>
        {data.methods && data.methods.map(method => {
          const isSelectedMethod = `${host}/${path}/__${method}` === selectedMethod;

          return (
            <Method
              key={method}
              host={host}
              path={path}
              type={method}
              filter={filter}
              onSelectMethod={onSelectMethod} // Pass the onSelectMethod prop
              isSelectedMethod={isSelectedMethod}
            />
          );
        })}
        {Object.entries(data.children).map(([childName, childData]) => (
          <Endpoint
            key={childName}
            host={host}
            path={`${path}/${childName}`}
            name={childName}
            data={childData}
            selectedPath={selectedPath}
            onSelect={onSelect}
            filter={filter}
            selectedMethod={selectedMethod} // Pass selectedMethod state
            onSelectMethod={onSelectMethod} // Pass the onSelectMethod function
          />
        ))}
      </ul>
    </li>
  );
}


export default OasParser
