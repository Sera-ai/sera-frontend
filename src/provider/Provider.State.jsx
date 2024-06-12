import React, { createContext, useState, useEffect } from "react";
import * as DataProvider from "./Provider.Data";

// Create Context
export const AppContext = createContext();

// Define initial state defaults
const initialStateDefaults = {
  hostInventory: [],
  apiInventory: [],
  playbookInventory: [],
  builderInventory: [],
  eventListChart: {},
  eventInventory: [],
  anamalyListData: [],
  eventActions: [],
  availablePlugins: {},
  monthlyAnalytics: {},
  endpointProxy: {},
  endpointDetails: {},
  dummyOas: {},
  incidentDetails: {},
  uptimeDetails: {},
  dummyOasMulti: [],
  getOasFromHost: {},
  getDnsFromHost: {},
  getBuilderInventory: [],
};

// Initialize state hooks
function useInitialState() {
  const [state, setState] = useState(initialStateDefaults);
  const [nestedVisible, setNestedVisible] = useState(0);
  const [error, setError] = useState(null);

  // Load data from DataProvider functions
  const loadData = async () => {
    try {
      // Retrieve data for each key in initial state defaults
      const fetchPromises = Object.keys(initialStateDefaults).map(async (key) => {
        const fetchFunction = DataProvider[key];
        if (typeof fetchFunction === "function") {
          const data = await fetchFunction();
          setState((prevState) => ({
            ...prevState,
            [key]: data,
          }));
        }
      });

      // Await all data fetching promises
      await Promise.all(fetchPromises);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    loadData();
  }, []);

  return { state, setState, nestedVisible, setNestedVisible, error, loadData };
}

// Provider Component
export const AppStateProvider = ({ children }) => {
  const { state, setState, nestedVisible, setNestedVisible, error, loadData } = useInitialState();
  const [console, setConsole] = useState(false);

  return (
    <AppContext.Provider
      value={{
        ...state,
        setState,
        nestedVisible,
        setNestedVisible,
        error,
        loadData,
        console,
        setConsole
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
