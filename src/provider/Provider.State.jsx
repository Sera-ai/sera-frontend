import React, { createContext, useState, useEffect } from "react";
import * as DataProvider from "./Provider.Data";

// Create Context
export const AppContext = createContext();

// Provider Component
export const AppStateProvider = ({ children }) => {
  const stateKeysDefaults = {
    eventListChart: {},
    eventInventory: [],
    anamalyListData: [],
    eventActions: [],
    inventoryInventory: [],
    availablePlugins: {},
    monthlyAnalytics: {},
    endpointProxy: {},
    endpointDetails: {},
    dummyOas: {},
    incidentDetails: {},
    console: false,
    apiInventory: [],
    uptimeDetails: {},
    workbookInventory: [],
    builderInventory: [],
    dummyOasMulti: []
  };

  // Use custom hook to initialize all states with persistence
  const states = useMultiplePersistedStates(stateKeysDefaults);

  const [nestedVisible, setNestedVisible] = useState(0);
  const [error, setError] = useState(null);

  // Data fetching and setting dynamically
  useEffect(() => {
    const loadData = async () => {
      try {
        // Iterate over each key in your state definitions
        const fetchPromises = Object.keys(stateKeysDefaults).map(
          async (key) => {
            const functionName = key; // Assumes the function name matches the key
            if (typeof DataProvider[functionName] === "function") {
              const data = await DataProvider[functionName]();
              states[key][1](data); // Dynamically call setState for each
            }
          }
        );

        await Promise.all(fetchPromises);
        console.log(fetchPromises)
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

    loadData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...states,
        error,
        nestedVisible,
        setNestedVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useMultiplePersistedStates(keysDefaults) {
  const states = {};
  Object.entries(keysDefaults).forEach(([key, defaultValue]) => {
    states[key] = usePersistedState(key, defaultValue);
  });
  return states;
}

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const persistedValue = localStorage.getItem(key);
    return (persistedValue && persistedValue != "undefined") ? JSON.parse(persistedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
