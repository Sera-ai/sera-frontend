async function databaseQuery(query) {
  switch (query) {
    case "exampleOas": {
      const res = await getExmapleOas();
      return res;
    }
    default:
      return {};
  }
}

async function getExmapleOas() {
  try {
    const response = await fetch(
      `/manage/endpoint/get?path=%2Fapi.sample.com%2Fitems%2Fpost`,
      { headers: { "x-sera-service": "be_builder" } }
    );
    const jsonData = await response.json();
    return jsonData.oas;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}
export default databaseQuery;
