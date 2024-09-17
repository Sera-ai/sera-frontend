import React, { useRef, useState, useEffect } from "react";
import Transition from "../utils/Transition";
import { useLocation, useNavigate } from "react-router-dom";

function AddIntegration({
  id = "sera-add-integration",
  modalOpen,
  setModalOpen,
  buttonId = "no-button",
}) {
  const modalContent = useRef(null);
  const [integrationName, setIntegrationName] = useState(
    "Backend Service Connector"
  );
  const [integrationHostname, setIntegrationHostname] = useState("");
  const navigate = useNavigate();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (target.id == buttonId) return;
      if (!modalOpen || modalContent.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleImageClick = () => {
    const confirmRemove = window.confirm(
      "Do you want to remove the selected file?"
    );
    if (confirmRemove) {
      setSelectedFile(null);
    }
  };
  const createIntegration = async () => {
    try {
      // Create a new FormData object to hold the form fields and the file
      const formData = new FormData();
      formData.append("name", integrationName); // Append text fields
      formData.append("hostname", integrationHostname);

      if (selectedFile) {
        formData.append("image", selectedFile); // Append the image file with key "image"
      }

      const response = await fetch(
        `https://${window.location.hostname}:${__BE_ROUTER_PORT__}/manage/builder/integration`,
        {
          method: "POST",
          headers: {
            "x-sera-service": "be_builder", // Keep any necessary headers
            "X-Forwarded-For": "backend.sera",
          },
          body: formData, // Use FormData as the request body
        }
      );

      const jsonData = await response.json();
      if (jsonData.slug) {
        navigate(`/builder/integration/${jsonData.slug}`);
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 mainDark bg-opacity-80 z-30 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-80"
        leave="transition ease-out duration-100"
        leaveStart="opacity-80"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="mainDark border border-transparent dark:border-slate-700 overflow-auto max-w-2xl w-full max-h-full rounded shadow-lg"
        >
          <div className="p-4 w-full">
            {/* Recent searches */}
            <div className="mb-3 last:mb-0 w-full space-y-5">
              <div className="text-sm">Create a Sera Integration</div>

              <div className="space-y-2">
                <div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">
                    Upload Integration Icon
                  </div>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    style={{ display: "none" }} // Hides the default input
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="imageUpload"
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#007bff",
                      color: "white",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Upload Image
                  </label>

                  {selectedFile && (
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mt-2">
                      <p>Selected File: {selectedFile.name}</p>
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Preview"
                        style={{
                          width: "100px",
                          marginTop: "10px",
                          cursor: "pointer",
                        }}
                        onClick={handleImageClick}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">
                    Integration Name
                  </div>
                  <input
                    id="searchBar"
                    className={`relative py-1 text-xs  w-full flex items-center space-x-3 bg-slate-100 hover:bg-slate-200 secondaryDark dark:hover:bg-slate-600/80 rounded-md`}
                    placeholder="Backend Service Connector"
                    aria-controls="search-modal"
                    onChange={(e) => {
                      setIntegrationName(e.target.value);
                    }}
                  ></input>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">
                    Integration Type
                  </div>
                  <input
                    id="searchBar"
                    className={`relative py-1 text-xs  w-full flex items-center space-x-3 bg-slate-100 hover:bg-slate-200 secondaryDark dark:hover:bg-slate-600/80 rounded-md`}
                    aria-controls="search-modal"
                    value={"API Endpoint"}
                    disabled
                  ></input>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase">
                    Hostname
                  </div>
                  <input
                    id="searchBar"
                    className={`relative py-1 text-xs  w-full flex items-center space-x-3 bg-slate-100 hover:bg-slate-200 secondaryDark dark:hover:bg-slate-600/80 rounded-md`}
                    aria-controls="search-modal"
                    placeholder={"http://192.168.1.1:3000"}
                    onChange={(e) => {
                      setIntegrationHostname(e.target.value);
                    }}
                  ></input>
                </div>
              </div>

              <div
                className={`cursor-pointer flex items-center justify-center text-sm`}
                style={{
                  backgroundColor: "#2B84EC",
                  color: "#fff",
                  padding: "10px 15px",
                  borderRadius: 3,
                }}
                onClick={() => createIntegration()}
              >
                Create Integration
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default AddIntegration;
