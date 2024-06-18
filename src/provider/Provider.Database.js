async function databaseQuery({ query, params }) {
  switch (query) {
    case "exampleOas": {
      const res = await getExampleOas();
      return res;
    }
    case "getOas": {
      const res = await getOas();
      return res;
    }
    case "hosts": {
      const res = await getHosts();
      return res;
    }
    case "oasFromHost": {
      const res = await oasFromHost({ params });
      return res;
    }
    case "dnsFromHost": {
      const res = await dnsFromHost({ params });
      return res;
    }
    case "allBuilders": {
      const res = await allBuilders();
      return res;
    }
    case "getPlaybooks": {
      const res = await getPlaybooks();
      return res;
    }
    case "globalSearch": {
      const res = await globalSearch(params);
      return res;
    }
    case "usageAnalytics": {
      const res = await getAnalytics(params);
      return res;
    }
    default:
      return {};
  }
}

export default databaseQuery;

async function getExampleOas() {
  try {
    const response = await fetch(
      `https://${__DEBUG__ ? `${window.location.hostname}:${__BE_ROUTER_PORT__}` : `backend.sera`}/manage/endpoint/builder?path=%2Freqres.in%2Fitems%2Fpost`,
      { headers: { "x-sera-service": "be_builder" } }
    );
    const jsonData = await response.json();
    return jsonData.oas;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}

async function getOas() {
  try {
    const response = await fetch(
      `https://${__DEBUG__ ? `${window.location.hostname}:${__BE_ROUTER_PORT__}` : `backend.sera`}/manage/host/oas`,
      {
        headers: { "x-sera-service": "be_builder" },
      }
    );
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}

async function getHosts() {
  try {
    const response = await fetch(
      `https://${__DEBUG__ ? `${window.location.hostname}:${__BE_ROUTER_PORT__}` : `backend.sera`}/manage/host`,
      {
        headers: { "x-sera-service": "be_builder" },
      }
    );
    console.log(await response)

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}

async function oasFromHost({ params }) {
  try {
    const response = await fetch(
      `https://${__DEBUG__ ? `${window.location.hostname}:${__BE_ROUTER_PORT__}` : `backend.sera`}/manage/host/oas?host=${params.hostname}`,
      {
        headers: { "x-sera-service": "be_builder" },
      }
    );
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}

async function dnsFromHost({ params }) {
  try {
    const response = await fetch(
      `https://${__DEBUG__ ? `${window.location.hostname}:${__BE_ROUTER_PORT__}` : `backend.sera`}/manage/host/dns?host=${params.hostname}`,
      {
        headers: { "x-sera-service": "be_builder" },
      }
    );
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}

async function allBuilders() {
  try {
    const response = await fetch(
      `https://${__DEBUG__ ? `${window.location.hostname}:${__BE_ROUTER_PORT__}` : `backend.sera`}/manage/endpoint`,
      {
        headers: { "x-sera-service": "be_builder" },
      }
    );
    console.log(response)

    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch (error) {

    console.error("Error fetching data:", error);
    return {};
  }
}

async function getPlaybooks() {
  try {
    const response = await fetch(
      `https://${__DEBUG__ ? `${window.location.hostname}:${__BE_ROUTER_PORT__}` : `backend.sera`}/manage/playbook`,
      {
        headers: { "x-sera-service": "be_builder" },
      }
    );
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}


async function globalSearch(params) {
  try {
    const response = await fetch(
      `https://${__DEBUG__ ? `${window.location.hostname}:${__BE_ROUTER_PORT__}` : `backend.sera`}/manage/search`,
      {
        method: 'POST',
        headers: {
          "x-sera-service": "be_builder",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    );
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}


async function getAnalytics(params) {
  try {
    const response = await fetch(
      `https://${__DEBUG__ ? `${window.location.hostname}:${__BE_ROUTER_PORT__}` : `backend.sera`}/manage/analytics?period=${params.period}${params.host ? `&host=${params.host}${params.endpoint ? `&endpoint=${params.endpoint}` : ""}` : ""}`,
      {
        method: 'GET',
        headers: {
          "x-sera-service": "be_builder",
          'Content-Type': 'application/json'
        },
      }
    );
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}