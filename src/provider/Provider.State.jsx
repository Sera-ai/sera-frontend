// Provider.State.js
import React, { createContext, useState, useEffect } from "react";
import * as DataProvider from "./Provider.Data";

// Create Context
export const AppContext = createContext();

// Provider Component
export const AppStateProvider = ({ children }) => {
  //General

  //Issues
  const [issueListChart, setIssueListChart] = usePersistedState(
    "issueListChart",
    {}
  );
  const [issueInventory, setIssueInventory] = usePersistedState(
    "issueInventory",
    []
  );
  const [anamalyListData, setAnamalyListData] = usePersistedState(
    "anamalyListData",
    []
  );
  const [issueActions, setIssueActions] = usePersistedState("issueActions", []);
  const [inventoryInventory, setInventoryInventory] = usePersistedState(
    "inventoryInventory",
    []
  );
  const [availablePlugins, setAvailablePlugins] = usePersistedState(
    "availablePlugins",
    {}
  );
  const [monthlyAnalytics, setMonthlyAnalytics] = usePersistedState(
    "monthlyAnalytics",
    {}
  );
  const [endpointProxy, setEndpointProxy] = usePersistedState(
    "endpointProxy",
    {}
  );
  const [endpointDetails, setEndpointDetails] = usePersistedState(
    "endpointDetails",
    {}
  );
  const [dummyOas, setDummyOas] = usePersistedState("dummyOas", {});
  const [incidentDetails, setIncidentDetails] = usePersistedState(
    "incidentDetails",
    {}
  );
  const [console, setConsole] = usePersistedState("console", false);
  const [apiInventory, setApiInventory] = usePersistedState("apiInventory", []);
  const [nestedVisible, setNestedVisible] = useState(0);

  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedIssueListChart = await DataProvider.issueListChart();
        setIssueListChart(fetchedIssueListChart);

        const fetchedIssueInventory = await DataProvider.issueInventory();
        setIssueInventory(fetchedIssueInventory);

        const fetchedAnamlyListData = await DataProvider.anamalyListData();
        setAnamalyListData(fetchedAnamlyListData);

        const fetchedIssueActions = await DataProvider.issueActions();
        setIssueActions(fetchedIssueActions);

        const fetchedInventoryInventory =
          await DataProvider.inventoryInventory();
        setInventoryInventory(fetchedInventoryInventory);

        const fetchedAvailablePlugins = await DataProvider.availablePlugins();
        setAvailablePlugins(fetchedAvailablePlugins);

        const fetchedMonthlyAnalytics = await DataProvider.monthlyAnalytics();
        setMonthlyAnalytics(fetchedMonthlyAnalytics);

        const fetchedEndpointProxy = await DataProvider.endpointProxy();
        setEndpointProxy(fetchedEndpointProxy);

        const fetchedEndpointDetails = await DataProvider.endpointDetails();
        setEndpointDetails(fetchedEndpointDetails);

        const fetchedDummyOas = await DataProvider.dummyOas();
        setDummyOas(fetchedDummyOas);

        const fetchedIncidentDetails = await DataProvider.incidentDetails();
        setIncidentDetails(fetchedIncidentDetails);

        const fetchedApiInventory = await DataProvider.apiInventory();
        setApiInventory(fetchedApiInventory);

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
        inventoryInventory,
        issueListChart,
        issueInventory,
        anamalyListData,
        issueActions,
        availablePlugins,
        monthlyAnalytics,
        endpointProxy,
        endpointDetails,
        incidentDetails,
        apiInventory,
        dummyOas,
        error,
        console,
        setConsole,
        nestedVisible,
        setNestedVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const persistedValue = localStorage.getItem(key);
    return persistedValue !== null ? JSON.parse(persistedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
