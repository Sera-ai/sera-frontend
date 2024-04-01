async function databaseQuery({ query, params }) {
  switch (query) {
    case "exampleOas": {
      const res = await getExmapleOas();
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
    default:
      return {};
  }
}

export default databaseQuery;

async function getExmapleOas() {
  try {
    const response = await fetch(
      `/manage/endpoint/builder?path=%2Freqres.in%2Fitems%2Fpost`,
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
    const response = await fetch(`/manage/host/oas`, {
      headers: { "x-sera-service": "be_builder" },
    });
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}

async function getHosts() {
  try {
    const response = await fetch(`/manage/host`, {
      headers: { "x-sera-service": "be_builder" },
    });
    console.log(response);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}

async function oasFromHost({ params }) {
  try {
    const response = await fetch(`/manage/host/oas?host=${params.hostname}`, {
      headers: { "x-sera-service": "be_builder" },
    });
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
    const response = await fetch(`/manage/host/dns?host=${params.hostname}`, {
      headers: { "x-sera-service": "be_builder" },
    });
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
    const response = await fetch(`/manage/endpoint`, {
      headers: { "x-sera-service": "be_builder" },
    });
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}
