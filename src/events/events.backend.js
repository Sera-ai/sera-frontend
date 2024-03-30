// customFunctions.js

export const backendEvents = (builderContext = {}) => {
  const { setOas, setIssue, setNodes, setEdges, builder } = builderContext;
  const fetchData = async (path = window.location.pathname) => {};

  const getNodeStruc = async (event, type) => {
    if (!event || !type) return;
    console.log(type);
    try {
      const response = await fetch(
        `/manage/getNodeStruc?event=${event}&type=${type}`,
        {
          headers: { "x-sera-service": "be_builder" },
        }
      );
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const createData = async (data) => {
    if (data.error == "NoEndpoint") {
      const builder_id = await createBuilder(data);
      if (!builder_id) return "failure";
      const created = await createEndpoint(builder_id);

      if (created) {
        return "success";
      } else {
        alert("Failed to create endpoint");
      }
    }

    if (data.error == "NoBuilder") {
      const builder_id = await createBuilder(data);
      if (!builder_id) return "failure";

      const created = await updateEndpoint(builder_id);
      if (created) {
        return "success";
      } else {
        alert("Failed to create builder");
      }
    }
  };

  function createEndpoint(builder_id) {
    console.log(builder_id);
    const urli = "https:/" + window.location.pathname.replace("builder/", "");
    const parsed = new URL(urli);

    const lastSlashIndex = parsed.pathname.lastIndexOf("/");
    const path = parsed.pathname.substring(0, lastSlashIndex); // "boop/boop"
    const method = parsed.pathname.substring(lastSlashIndex + 1).toUpperCase(); // "boop"

    const data2 = {
      hostname: parsed.host.split(":")[0],
      endpoint: decodeURIComponent(path),
      method: method,
      builder_id,
    };

    const url = `/manage/endpoint`;
    console.log(JSON.stringify(data2));
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sera-service": "be_builder",
      },
      body: JSON.stringify(data2),
    })
      .then((response) => response.json()) // assuming server responds with json
      .then((data) => {
        console.log(data);
        return true;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });
  }

  function updateEndpoint(builderId) {
    const urli = "https:/" + window.location.pathname.replace("builder/", "");
    const parsed = new URL(urli);

    const lastSlashIndex = parsed.pathname.lastIndexOf("/");
    const path = parsed.pathname.substring(0, lastSlashIndex); // "boop/boop"
    const method = parsed.pathname.substring(lastSlashIndex + 1).toUpperCase(); // "boop"

    const data2 = {
      hostname: parsed.host.split(":")[0],
      endpoint: path,
      method: method,
      builder_id: builderId,
    };

    const url = `/manage/endpoint/update`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sera-service": "be_builder",
      },
      body: JSON.stringify(data2),
    })
      .then((response) => response.json()) // assuming server responds with json
      .then((data) => {
        return true;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });
  }

  function createBuilder() {
    const urli = "https:/" + window.location.pathname.replace("builder/", "");
    const parsed = new URL(urli);

    const lastSlashIndex = parsed.pathname.lastIndexOf("/");
    const path = parsed.pathname.substring(0, lastSlashIndex); // "boop/boop"
    const method = parsed.pathname.substring(lastSlashIndex + 1).toUpperCase(); // "boop"

    const data2 = {
      hostname: parsed.host.split(":")[0],
      path: decodeURIComponent(path),
      method: method,
    };

    const url = `/manage/builder/create`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sera-service": "be_builder",
      },
      body: JSON.stringify(data2),
    })
      .then((response) => response.json()) // assuming server responds with json
      .then((data) => {
        return data._id;
      })
      .catch((error) => console.error("Error:", error));
  }

  const createNode = (data) => {
    const url = `/manage/endpoint/node`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sera-service": "be_builder",
        "x-sera-builder": builder,
      },
      body: JSON.stringify(data),
    }).catch((error) => console.error("Error:", error));
  };

  const deleteNode = (data) => {
    const url = `/manage/endpoint/node`;

    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-sera-service": "be_builder",
        "x-sera-builder": builder,
      },
      body: JSON.stringify(data),
    }).catch((error) => console.error("Error:", error));
  };

  const createEdge = (data) => {
    const url = `/manage/endpoint/edge`;

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sera-service": "be_builder",
        "x-sera-builder": builder,
      },
      body: JSON.stringify(data),
    }).catch((error) => console.error("Error:", error));
  };

  const removeEdge = (data) => {
    const url = `/manage/endpoint/edge`;

    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-sera-service": "be_builder",
        "x-sera-builder": builder,
      },
      body: JSON.stringify(data),
    }).catch((error) => console.error("Error:", error));
  };

  const updateEdge = (data) => {
    const url = `/manage/endpoint/edge`;

    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-sera-service": "be_builder",
        "x-sera-builder": builder,
      },
      body: JSON.stringify(data),
    }).catch((error) => console.error("Error:", error));
  };

  return {
    createData,
    deleteNode,
    createNode,
    fetchData,
    createEdge,
    removeEdge,
    updateEdge,
    getNodeStruc,
  };
};
