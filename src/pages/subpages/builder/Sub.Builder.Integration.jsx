import React, { useState, useRef, useContext, useEffect } from "react";

import Header from "../../../components/custom/Custom.Header.Title";
import Table from "../../../components/standard/Standard.Table";
import { ContentBar } from "../../../components/standard/Standard.ContentBar";
import { useNavigate } from "react-router-dom";
import * as DataProvider from "../../../provider/Provider.Data";
import AddIntegration from "../../../components/Components.AddIntegration";

function BuilderIntegrations() {
  const [filter, setFilter] = useState("");
  const [columns, setColumns] = useState([]);
  const [builderInventory, setBuilderInventory] = useState([]);
  const [addInstanceModalOpen, setAddInstanceModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const selectAllRef = useRef(null);

  useEffect(() => {
    const getBuilderInventory = async () => {
      try {
        const response = await fetch(
          `https://${window.location.hostname}:${__BE_ROUTER_PORT__}/manage/builder/integrations`,
          {
            headers: {
              "x-sera-service": "be_builder",
              "X-Forwarded-For": "backend.sera",
            },
          }
        );

        const builderInventoryData = await response.json();
        const inventoryArray = await Promise.all(
          builderInventoryData.map(async (inv) => {
            // Fetch image if it exists, otherwise use default
            let imageStuff = null;
            if (inv.image) {
              try {
                const imageResponse = await fetch(
                  `https://${window.location.hostname}:${__BE_ROUTER_PORT__}/manage/builder/integration/file/${inv.image}`,
                  {
                    headers: {
                      "x-sera-service": "be_builder",
                      "X-Forwarded-For": "backend.sera",
                    },
                  }
                );

                if (imageResponse.ok) {
                  const blob = await imageResponse.blob();
                  const imageUrl = URL.createObjectURL(blob);
                  console.log(imageUrl);
                  console.log(blob);
                  console.log(imageResponse);
                  imageStuff = (
                    <img
                      src={imageUrl}
                      style={{ height: 20 }}
                      alt="Fetched Image"
                    />
                  );
                } else {
                  throw new Error("Failed to fetch image");
                }
              } catch (error) {
                console.error("Error fetching image:", error);
                imageStuff = (
                  <img
                    src={"/src/assets/logo.png"}
                    style={{ height: 20 }}
                    alt="Default Image"
                  />
                );
              }
            } else {
              imageStuff = (
                <img
                  src={"/src/assets/logo.png"}
                  style={{ height: 20 }}
                  alt="Default Image"
                />
              );
            }

            return {
              image: imageStuff,
              name: inv.name,
              type: inv.type,
              builder: `[${inv.slug}](/builder/ingtegration/${inv.slug})`,
              enabled: inv.enabled,
            };
          })
        );

        setBuilderInventory(inventoryArray);
      } catch (error) {
        console.error("Error fetching builder inventory:", error);
      }
    };

    getBuilderInventory();
  }, []);

  const existingColumns = [];
  const linkClasses = ["builder"];
  const navigate = useNavigate();
  const navigateBuilder = (data) => {
    const newUrl = `/builder/${data
      .replace("__", "")
      .replace("https://", "")
      .replace("http://", "")}`;

    console.log(data);
    navigate(newUrl);
  };

  return (
    <Header
      title={"Integration Inventory"}
      subtitle={"Below is a list of Integrations"}
      filter={filter}
      setFilter={null}
      setColumns={setColumns}
      existingColumns={existingColumns}
      columns={columns}
      buttons={
        <div
          id="add-integration-button"
          onClick={() => {
            setAddInstanceModalOpen(true);
          }}
          className="flex justify-center items-center text-sm h-[36px] w-[140px] rounded-sm cursor-pointer"
          style={{ backgroundColor: "#2B84EC", color: "#fff" }}
        >
          Create Integration
        </div>
      }
      horizontal={true}
      tier={2}
    >
      <div className="flex pt-1 w-full h-full space-x-1">
        <Table
          padded={true}
          raw={true}
          allowSelect={false}
          filter={filter}
          setFilter={setFilter}
          columns={columns}
          data={builderInventory}
          linkClasses={linkClasses}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          selectAllRef={selectAllRef}
        />
        <AddIntegration
          modalOpen={addInstanceModalOpen}
          setModalOpen={setAddInstanceModalOpen}
          buttonId={"add-integration-button"}
        />
      </div>
    </Header>
  );
}

export default BuilderIntegrations;
