import getDataTemplate from './Provider.Demodata'

export async function issueActions() {
    const issueActions = await getDataTemplate('issueActions')
    return issueActions
}

export async function issueListChart() {
    const issueListChart = await getDataTemplate('issueListChart')
    return issueListChart
}

export async function anamalyListData() {
    const anamalyListData = await getDataTemplate('anamalyListData')
    return anamalyListData
}

export async function issueInventory() {
    const issueInventory = await getDataTemplate('issueInventory')
    return issueInventory
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
    const dummyOas = await getDataTemplate('dummyOas')
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