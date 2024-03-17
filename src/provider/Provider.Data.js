import databaseQuery from './Provider.Database'
import getDataTemplate from './Provider.Demodata'

export async function eventActions() {
    const eventActions = await getDataTemplate('eventActions')
    return eventActions
}

export async function eventListChart() {
    const eventListChart = await getDataTemplate('eventListChart')
    return eventListChart
}

export async function anamalyListData() {
    const anamalyListData = await getDataTemplate('anamalyListData')
    return anamalyListData
}

export async function eventInventory() {
    const eventInventory = await getDataTemplate('eventInventory')
    return eventInventory
}

export async function inventoryInventory() {
    const inventoryInventory = await getDataTemplate('inventoryInventory')
    return inventoryInventory
}

export async function availablePlugins() {
    const availablePlugins = await getDataTemplate('availablePlugins')
    return availablePlugins
}

export async function monthlyAnalytics() {
    const monthlyAnalytics = await getDataTemplate('monthlyAnalytics')
    return monthlyAnalytics
}

export async function endpointProxy() {
    const endpointProxy = await getDataTemplate('endpointProxy')
    return endpointProxy
}

export async function endpointDetails() {
    const endpointDetails = await getDataTemplate('endpointDetails')
    return endpointDetails
}

export async function dummyOas() {
    const dummyOas = await databaseQuery('exampleOas')
    console.log(dummyOas)
    return dummyOas
}

export async function incidentDetails() {
    const incidentDetails = await getDataTemplate('incidentDetails')
    return incidentDetails
}

export async function apiInventory() {
    const apiInventory = await getDataTemplate('apiInventory')
    return apiInventory
}

export async function uptimeDetails() {
    const uptimeDemoData = await getDataTemplate('uptimeDemoData')
    return uptimeDemoData
}