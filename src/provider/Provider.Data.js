import databaseQuery from "./Provider.Database";
import getDataTemplate from "./Provider.Demodata";

export async function eventActions() {
  const eventActions = await getDataTemplate("eventActions");
  return eventActions;
}

export async function eventListChart() {
  const eventListChart = await getDataTemplate("eventListChart");
  return eventListChart;
}

export async function anamalyListData() {
  const anamalyListData = await getDataTemplate("anamalyListData");
  return anamalyListData;
}

export async function eventInventory() {
  const eventInventory = await getDataTemplate("eventInventory");
  return eventInventory;
}

export async function inventoryInventory() {
  const hostInventory = await databaseQuery({ query: "hosts" });
  return hostInventory;
}

export async function availablePlugins() {
  const availablePlugins = await getDataTemplate("availablePlugins");
  return availablePlugins;
}

export async function monthlyAnalytics() {
  const monthlyAnalytics = await getDataTemplate("monthlyAnalytics");
  return monthlyAnalytics;
}

export async function endpointProxy() {
  const endpointProxy = await getDataTemplate("endpointProxy");
  return endpointProxy;
}

export async function endpointDetails() {
  const endpointDetails = await getDataTemplate("endpointDetails");
  return endpointDetails;
}

export async function dummyOas() {
  const dummyOas = await databaseQuery({ query: "exampleOas" });
  console.log(dummyOas);
  return dummyOas;
}

export async function getOasFromHost(params) {
  console.log(params);
  const oas = await databaseQuery({ query: "oasFromHost", params });
  return oas;
}

export async function getDnsFromHost(params) {
  console.log(params);
  const dns = await databaseQuery({ query: "dnsFromHost", params });
  return dns;
}

export async function getBuilderInventory(params) {
  console.log(params);
  const dns = await databaseQuery({ query: "allBuilders", params });
  return dns;
}

export async function dummyOasMulti() {
  const dummyOasMulti = await databaseQuery({ query: "exampleOas" });
  let boop = JSON.parse(JSON.stringify(dummyOasMulti));
  boop.servers[0].url = "https://api.example.com";
  return [dummyOasMulti, boop];
}

export async function incidentDetails() {
  const incidentDetails = await getDataTemplate("incidentDetails");
  return incidentDetails;
}

export async function apiInventory() {
  const apiInventory = await getDataTemplate("apiInventory");
  return apiInventory;
}

export async function uptimeDetails() {
  const uptimeDemoData = await getDataTemplate("uptimeDemoData");
  return uptimeDemoData;
}

export async function workbookInventory() {
  const workbookInventory = await getDataTemplate("workbookInventory");
  return workbookInventory;
}

export async function builderInventory() {
  const builderInventory = await getDataTemplate("builderInventory");
  return builderInventory;
}
